import { gql, useQuery } from "@apollo/client";

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
      content
    }
  }
`;

export default function ViewNotesPage() {
  const { loading, error, data } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Your Notes</h1>
      <button>
        <a href="/add-note">Add Note</a>
      </button>
      <ul>
        {data.notes.map((note: any) => (
          <li key={note.id}>
            <a href={`/note/${note.id}`}>{note.title}</a>
            <a href={`/edit-note/${note.id}`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
