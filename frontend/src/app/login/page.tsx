"use client";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // Initialize the router

  const LOGIN_MUTATION = gql`
    mutation login($input: LoginInput!) {
      login(input: $input) {
        user
      }
    }
  `;

  // Use useLazyQuery to trigger the query manually
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous errors

    try {
      await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    } catch (err) {
      console.error("Mutation error:", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Display error message if login fails */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
