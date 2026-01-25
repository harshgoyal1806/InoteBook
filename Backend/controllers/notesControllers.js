const Notes= require("../models/Notes")
const fetchAllNotes =async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    res.json({ success: true, notes });
  } catch (error) {
    console.error("Fetch notes error:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const addNote =async (req, res) => {
  try {
    const data = { ...req.body, user: req.user };
    const note = await Notes.create(data);
    res.status(201).json({ success: true, message: "Note added", note });
  } catch (error) {
    console.error("Add note error:", error.message);
     res.status(400).json({ success: false, error: error.message || "Please provide a valid note" });
  }
};
const updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    if (note.user.toString() !== req.user) {
      return res.status(401).json({ success: false, error: "Unauthorized access" });
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json({ success: true, message: "Note updated", note });
  } catch (error) {
    console.error("Update note error:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    if (note.user.toString() !== req.user) {
      return res.status(401).json({ success: false, error: "Unauthorized access" });
    }

    await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
module.exports = {fetchAllNotes,addNote,updateNote,deleteNote};