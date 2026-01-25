const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const notesRouter = express.Router();
const {fetchAllNotes,addNote,updateNote,deleteNote} = require("../controllers/notesControllers");
const {addNoteValidation,updateNoteValidation} = require("../utils/notesValidations")
notesRouter.get("/fetchallnotes",fetchUser,fetchAllNotes);
notesRouter.post("/addnote",fetchUser,addNoteValidation,addNote);
notesRouter.put("/updatenote/:id",fetchUser,updateNoteValidation,updateNote);
notesRouter.delete("/deletenote/:id",fetchUser,deleteNote);

module.exports = notesRouter;