import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContext from "../context/auth/AuthContext";

const Signup = ({ showAlert }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const signupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields},
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data), 
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      login(); 
      showAlert("Account created successfully!", "success");
      navigate("/");
    } catch (err) {
      showAlert(err.message, "danger");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-3">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : touchedFields.name ? "is-valid" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : touchedFields.email ? "is-valid" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : touchedFields.password ? "is-valid" : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
