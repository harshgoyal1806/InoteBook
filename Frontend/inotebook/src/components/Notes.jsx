import React, { useContext, useEffect, useState, useRef } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/NoteContext";
import AuthContext from "../context/auth/AuthContext";

const Notes = ({ showAlert }) => {
  const { notes, getAllNotes, editNote, clearNotes } = useContext(NoteContext);
  const { authenticated } = useContext(AuthContext);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    if (authenticated) {
      getAllNotes();
    } else {
      clearNotes();
    }
  }, [authenticated]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Note Updated", "success");
    setNote({ id: "", etitle: "", edescription: "", etag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      <div className="row my-3">
        <h1>Your notes</h1>
        {notes.length === 0 && <p>No notes to display</p>}
        {notes.map((note) => (
          <NoteItem note={note} key={note._id} updateNote={updateNote} />
        ))}
      </div>
    </>
  );
};

export default Notes;
