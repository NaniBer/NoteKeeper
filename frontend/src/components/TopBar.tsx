"use client";

import React from "react";
import { useRouter } from "next/navigation";

const TopBar: React.FC = () => {
  const router = useRouter();
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    router.push("/login");
  };

  const handleChangePassword = () => {
    router.push("/ChangePassword");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white z-10 flex">
      <h1 className="text-xl font-bold flex-1">noteKeepers</h1>
      <div className="flex items-center mr-10">
        <span className="mr-4">🌟 Hi, {username}!</span>
        <button
          onClick={handleChangePassword}
          className="text-white hover:underline mr-4"
        >
          Change Password
        </button>
        <button onClick={handleLogout} className="text-white hover:underline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
