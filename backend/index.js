const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

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

// Signup Route
// app.post("/signup", async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;

//   // Check if user exists
//   const existingUser = users.find((user) => user.email === email);
//   if (existingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   // Hash password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create new user and save to "database"
//   const newUser = { email, password: hashedPassword, firstName, lastName };
//   users.push(newUser);

//   // Create JWT token
//   const token = jwt.sign({ email, firstName, lastName }, JWT_SECRET, {
//     expiresIn: "1h", // Token expires in 1 hour
//   });

//   // Send token back to client
//   res.json({ token });
// });

// Login Route
app.post("/login", async (req, res) => {
  //   const { email, password } = req.body;

  //   // Find user by email
  //   const user = users.find((user) => user.email === email);
  //   if (!user) {
  //     return res.status(400).json({ message: "Invalid email or password" });
  //   }

  //   // Compare password
  //   const validPassword = await bcrypt.compare(password, user.password);
  //   if (!validPassword) {
  //     return res.status(400).json({ message: "Invalid email or password" });
  //   }

  //   // Create JWT token
  //   const token = jwt.sign(
  //     { email: user.email, firstName: user.firstName },
  //     JWT_SECRET,
  //     {
  //       expiresIn: "1h",
  //     }
  //   );

  //   // Send token back to client
  //   res.json({ token });
  console.log("hello from login");
  res.send("login");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
