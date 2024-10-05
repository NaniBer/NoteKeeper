"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";

// Define the GraphQL mutation to add a note
const ADD_NOTE = gql`
  mutation AddNote($title: String!, $content: String!, $userId: uuid!) {
    insert_Notes(
      objects: { title: $title, content: $content, userId: $userId }
    ) {
      returning {
        id
        title
        content
      }
    }
  }
`;

export default function AddNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // Initialize the router

  // Use the mutation
  const [addNote, { loading }] = useMutation(ADD_NOTE, {
    onCompleted: () => {
      setSuccessMessage("🎉 Note added successfully!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error) => {
      setErrorMessage(`😱 Error adding note: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // Get user ID from local storage

    // Call the mutation to add the note
    await addNote({
      variables: { title, content, userId },
    });

    // Clear input fields
    setTitle("");
    setContent("");
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-yellow-200 p-6">
        <div className="">
          <h1 className="text-4xl font-semibold mb-4 text-purple-600 text-center">
            Let's Create a Note! ✏️
          </h1>
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
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

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <input
                type="text"
                placeholder="🎈 Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold"
              />
              <textarea
                placeholder="📝 Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Saving..." : "✨ Save My Note!"}
              </button>
            </form>
            <p className="mt-4 text-center">
              <a href="/" className="text-blue-500 hover:underline">
                🔙 Back to My Notes
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
