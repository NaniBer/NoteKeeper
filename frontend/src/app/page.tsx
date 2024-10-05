"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TopBar from "@/components/TopBar";
import { useState } from "react";

const GET_NOTES = gql`
  query GetNotes($userId: uuid!) {
    Notes(where: { userId: { _eq: $userId } }) {
      id
      title
      content
    }
  }
`;

const DELETE_NOTE = gql`
  mutation DeleteNote($id: uuid!) {
    delete_Notes_by_pk(id: $id) {
      id
    }
  }
`;

export default function HomePage() {
  const userId = localStorage.getItem("userId");
  const { loading, error, data, refetch } = useQuery(GET_NOTES, {
    variables: { userId },
    skip: !userId,
  });

  const [deleteNote] = useMutation(DELETE_NOTE, {
    onCompleted: () => {
      refetch(); // Refetch notes after deletion
    },
    onError: (error) => {
      console.error(`Error deleting note: ${error.message}`);
    },
  });

  const [open, setOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState("");

  const handleDeleteClick = (id: any) => {
    setNoteToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNoteToDelete("");
  };

  const handleConfirmDelete = async () => {
    await deleteNote({
      variables: { id: noteToDelete },
    });
    handleClose();
  };

  if (loading) return <p>Loading your awesome notes...</p>;
  if (error) return <p>Oops! Something went wonky: {error.message}</p>;

  return (
    <>
      <TopBar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-pink-100 p-6 pt-20">
        <h1 className="text-4xl font-bold mb-4 text-purple-600">
          Your Fun Notes!
        </h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          href="/AddNotes"
          className="mb-7"
          style={{ backgroundColor: "#FF69B4", color: "white" }}
        >
          Make a Fun Note!
        </Button>
        <ul className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mt-10">
          {data.Notes?.length > 0 ? (
            data.Notes.map((note: any) => (
              <li
                key={note.id}
                className="flex justify-between items-center p-2 border-b last:border-b-0 bg-yellow-100"
                style={{ borderRadius: "12px", marginBottom: "10px" }}
              >
                <a
                  href={`/viewNotes/?id=${note.id}`}
                  className="text-blue-600 hover:underline text-xl"
                >
                  {note.title}
                </a>
                <div>
                  <IconButton
                    href={`/EditNotes/?id=${note.id}`}
                    color="primary"
                    aria-label="edit note"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(note.id)}
                    color="secondary"
                    aria-label="delete note"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No fun notes here, time to make one!
            </p>
          )}
        </ul>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose} className="rounded-lg">
        <DialogTitle className="text-lg font-semibold text-purple-600">
          Are you sure you want to delete this note? 🗑️
        </DialogTitle>
        <div className="p-4 bg-pink-100 rounded-lg">
          <p className="text-gray-700">
            This action cannot be undone! Are you ready to let go? 😢
          </p>
        </div>
        <DialogActions className="flex justify-center p-4">
          <Button
            onClick={handleClose}
            className="bg-blue-500 hover:text-white hover:bg-blue-600 rounded-full px-4 py-2 transition"
          >
            Nope, Keep It! 🙅‍♂️
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="bg-red-500 hover:text-white hover:bg-red-600 rounded-full px-4 py-2 transition"
          >
            Yes, Delete It! 🥳
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
