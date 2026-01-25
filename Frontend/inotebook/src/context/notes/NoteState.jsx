import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const clearNotes = () => {
    setNotes([]);
  };

  // Fetch all notes from backend API
  const getAllNotes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notes/fetchallnotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // important to send cookies with request
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch notes");
      }

      const json = await response.json();
      setNotes(json.notes);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  const addNote = async (title, description, tag = "general") => {
    if (!tag || tag.trim() === "") {
      tag = "general";
    }
    try {
      const res = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, tag }),
      });

      console.log("Response status:", res.status, "res.ok:", res.ok);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to add notes");
      }
      setNotes((prevNotes) => [...prevNotes, json.note]);
      return { success: true };
    } catch (error) {
      console.error("Error Adding notes:", error.message);
      return { success: false, error: error.message };
    }
  };

  const deleteNote = async (id) => {
    console.log("delete note with id " + id);
    try {
      const res = await fetch(
        `http://localhost:5000/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to Delete notes");
      }
      let newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id, title, description, tag }),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to add notes");
      }
    } catch (err) {
      console.log(err);
    }
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
        clearNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
