"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";

const ChangePassword = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual password change logic
    if (currentPassword && newPassword) {
      // Simulate a password change success
      setSuccessMessage(true);
      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage(false); // Hide success message after 3 seconds
        router.push("/"); // Redirect to home after successful change
      }, 3000);
    } else {
      setErrorMessage("Oops! Please fill in all fields!");
    }
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-yellow-200 p-6">
        <h1 className="text-3xl font-semibold mb-6 text-purple-600">
          Time to Update Your Secret!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md border-2 border-pink-300"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            Change My Secret Code!
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md shadow-md">
            🎉 Hooray! Your secret code has been updated!
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md shadow-md">
            😱 {errorMessage}
          </div>
        )}

        <p className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            🏠 Back to Fun Land
          </a>
        </p>
      </div>
    </>
  );
};

export default ChangePassword;
