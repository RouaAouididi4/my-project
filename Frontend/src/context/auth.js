import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        setAuthState({
          token,
          user,
          isAuthenticated: true,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    if (!token || !userData?._id) {
      // Changé de id à _id
      console.error("Invalid login data");
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthState({
      token,
      user: userData,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
