"use client";
import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";

const GET_NOTE = gql`
  query GetNote($id: uuid!) {
    Notes(where: { id: { _eq: $id } }) {
      id
      title
      content
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: uuid!, $title: String!, $content: String!) {
    update_Notes_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, content: $content }
    ) {
      id
      title
      content
    }
  }
`;

export default function EditNotePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id },
    skip: !id,
  });

  const [updateNote] = useMutation(UPDATE_NOTE);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.Notes[0].title);
      setContent(data.Notes[0].content);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateNote({
      variables: { id, title, content },
    });
    setSuccessMessage(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setSuccessMessage(false);
      router.push("/");
    }, 3000);
  };

  if (loading) return <p className="text-center">Loading your fun note...</p>;
  if (error)
    return (
      <p className="text-center text-red-600">
        Oops! Something went wrong: {error.message}
      </p>
    );

  return (
    <>
      <TopBar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-200 to-yellow-200 p-6">
        <h1 className="text-4xl font-bold mb-6 text-purple-600">
          ✏️ Edit Your Note
        </h1>
        <div className="flex justify-center items-center w-full max-w-lg bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                🎈 Title
              </label>
              <input
                type="text"
                placeholder="Your fun title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                📝 Content
              </label>
              <textarea
                placeholder="Your fun content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 h-40"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Saving Your Note..." : "✨ Save Changes!"}
            </button>
          </form>
        </div>

        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md shadow-md">
            🎉 Note edited successfully!
          </div>
        )}

        <p className="mt-4">
          <a href="/notes" className="text-blue-500 hover:underline">
            🔙 Back to My Notes
          </a>
        </p>
      </div>
    </>
  );
}
