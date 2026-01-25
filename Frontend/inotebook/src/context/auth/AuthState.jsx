import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthState = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("isauth") === "true"
  );

  // Keep localStorage in sync
  useEffect(() => {
    if (authenticated) {
      localStorage.setItem("isauth", "true");
    } else {
      localStorage.removeItem("isauth");
    }
  }, [authenticated]);

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
