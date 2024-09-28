import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const GET_NOTE = gql`
  query GetNoteById($id: ID!) {
    note(id: $id) {
      id
      title
      content
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $title: String!, $content: String!) {
    updateNote(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export default function EditNotePage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id },
  });

  const [updateNote] = useMutation(UPDATE_NOTE);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.note.title);
      setContent(data.note.content);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateNote({
      variables: { id, title, content },
    });
    // Redirect to notes page after successful update
    router.push("/notes");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Save Changes</button>
      </form>
      <p>
        <a href="/notes">Back to Notes</a>
      </p>
    </div>
  );
}
