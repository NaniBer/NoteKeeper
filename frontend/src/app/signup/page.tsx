"use client";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const router = useRouter(); // Initialize the router

  const CREATE_USER = gql`
    mutation CreateUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String
    ) {
      insert_Users(
        objects: [
          {
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
          }
        ]
      ) {
        affected_rows
        returning {
          firstName
          id
          lastName
          email
        }
      }
    }
  `;

  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(""); // Reset success message before submission
    setErrorMessage(""); // Reset error message before submission
    try {
      console.log("Creating a new user");
      const response = await createUser({
        variables: { firstName, lastName, email, password },
      });
      console.log("User created:", response.data.insert_Users.returning);
      setSuccessMessage(
        "User registered successfully! Please wait while you are being redirected to the homepage..."
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      console.error("Error creating user:", err);
      setErrorMessage("Error creating user: " + err.message); // Set error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Signup</h1>

        {/* Display success message if exists */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}

        {/* Display error message if exists */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading} // Disable button while loading
          >
            Signup
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
