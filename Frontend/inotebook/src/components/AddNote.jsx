import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NoteContext from "../context/notes/NoteContext";

const AddNote = ({ showAlert }) => {
  const { addNote } = useContext(NoteContext);

  const noteSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    tag: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: zodResolver(noteSchema),
    mode: "onTouched", 
  });

  const onSubmit = async (data) => {
    const result = await addNote(data.title, data.description, data.tag);
    if (result.success) {
      showAlert("Note added successfully", "success");
      reset();
    } else {
      showAlert(`Failed to add note: ${result.error}`, "danger");
    }
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.title ? "is-invalid" : touchedFields.title ? "is-valid" : ""
            }`}
            id="title"
            {...register("title")}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.description
                ? "is-invalid"
                : touchedFields.description
                ? "is-valid"
                : ""
            }`}
            id="description"
            {...register("description")}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.tag ? "is-invalid" : touchedFields.tag ? "is-valid" : ""
            }`}
            id="tag"
            {...register("tag")}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
