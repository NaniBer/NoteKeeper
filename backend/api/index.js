const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// JWT secret key (must match the one in Hasura's config)
const JWT_SECRET = "your-secret-key";

app.use(bodyParser.json());
app.use(cors());
// const pool = new Pool({
//   user: "your-username", // PostgreSQL username
//   host: "localhost", // Database host
//   database: "your-database", // Database name
//   password: "your-password", // PostgreSQL password
//   port: 5432, // Default PostgreSQL port
// });

// Sample user storage (replace this with a database in production)
const users = [];

//signup
app.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.body);

  // Check if user already exists
  const existingUserQuery = {
    query: `
      query {
        users(where: { email: { _eq: "${email}" } }) {
          id
        }
      }
    `,
  };

  try {
    const existingUserResponse = await axios.post(
      process.env.HASURA_GRAPHQL_ENDPOINT,
      existingUserQuery,
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
        },
      }
    );
    console.log(existingUserResponse);

    if (existingUserResponse.data.data.users.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into Hasura
    const insertUserMutation = {
      query: `
        mutation {
          insert_users(objects: { email: "${email}", password: "${hashedPassword}", firstName: "${firstName}" , lastName:"${lastName}" }) {
            returning {
              id
            }
          }
        }
      `,
    };

    const insertUserResponse = await axios.post(
      process.env.HASURA_GRAPHQL_ENDPOINT,
      insertUserMutation,
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
        },
      }
    );

    console.log(insertUserResponse);
    console.log(insertUserResponse.data);

    // Create JWT token
    const token = jwt.sign({ email, firstName }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send token back to client
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during signup process" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" }); // Ensure this returns an object with a message
  }

  // Compare password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" }); // Ensure this returns an object with a message
  }

  // Create JWT token
  const token = jwt.sign(
    { email: user.email, firstName: user.firstName },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Send token back to client
  return res.status(200).json({ message: "Login successful", token }); // Include a message key here
});

app.get("/", async (req, res) => {
  console.log("Note keepers backend production server");
  res.send("index");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
