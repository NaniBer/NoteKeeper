"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous errors
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post(
        "https://note-keeper-brown.vercel.app/login",
        {
          email,
          password,
        }
      );

      // Assuming the API returns a token or a success message
      if (response.data.response.message === "Login successful") {
        const token = response.data.response.token;
        const userId = response.data.response.userId;
        console.log("Login successful, token:", token);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set the authorization

        // Redirect to the homepage
        router.push("/");
      } else {
        // Handle errors from the API (like invalid credentials)
        setErrorMessage(response.data.response.message);
      }
    } catch (error: any) {
      // Handle any other errors (like network errors)
      setErrorMessage(
        error.response?.data.response.message || "An error occurred."
      );
    } finally {
      setLoading(false); // Set loading state to false after the request is done
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        {/* Display error message if login fails */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
