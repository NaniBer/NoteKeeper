// app/page.tsx
"use client"; // This line makes this component a Client Component, if this line isnt present it will cause a usecontext error

import { gql, useQuery } from "@apollo/client";

const GET_NOTES = gql`
  query GetNotes {
    Notes {
      id
      title
      content
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Notes</h1>
      {data.Notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        data.notes.map((note: any) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
