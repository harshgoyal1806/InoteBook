import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import AuthState from "./context/auth/AuthState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <>
      <AuthState>
        <NoteState>
          <BrowserRouter>
            <Navbar showAlert={showAlert} />
            {alert && <Alert alert={alert} />}
            <div className="container">
              <Routes>
                <Route path="/" element={<Home showAlert={showAlert} />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/login"
                  element={<Login showAlert={showAlert} />}
                />
                <Route
                  path="/signup"
                  element={<Signup showAlert={showAlert} />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
      </AuthState>
    </>
  );
}

export default App;
