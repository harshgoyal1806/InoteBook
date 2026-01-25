import React, { useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AuthContext from "../context/auth/AuthContext";

const Navbar = ({ showAlert }) => {
  const navigate = useNavigate();

  const { clearNotes } = useContext(NoteContext);
  const { authenticated, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      // ✅ Central auth logout
      logout();
      clearNotes();

      showAlert("Logout Successfully", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      showAlert(error.message, "danger");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          iNotebook
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>

          {!authenticated && (
            <div className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup">
                Signup
              </Link>
            </div>
          )}

          {authenticated && (
            <div className="d-flex">
              <button
                className="btn btn-primary mx-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
