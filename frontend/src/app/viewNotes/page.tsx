"use client";
import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
const GET_NOTE_DEATILS = gql`
  query GetNote($id: uuid!) {
    Notes(where: { id: { _eq: $id } }) {
      id
      title
      content
    }
  }
`;

export default function GetNotesById() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteid = searchParams.get("id");
  console.log(noteid);
  const { loading, error, data } = useQuery(GET_NOTE_DEATILS, {
    variables: { id: noteid },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const note = data.Notes[0];

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold mb-4">{note.title}</h1>
        <p>{note.content}</p>
        <button
          onClick={() => router.push("/")} // Navigate back to notes list
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Back to Notes
        </button>
      </div>
    </>
  );
}
