import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Vérification de validité minimale
    if (token && user && user._id && user.role) {
      setAuthState({
        token,
        user,
        isAuthenticated: true,
      });
    } else {
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = (userData, token) => {
    if (!token || !userData?._id) {
      console.error("Invalid login data");
      return;
    }

    if (!userData.role) {
      userData.role = "client"; // Par défaut
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthState({
      token,
      user: userData,
      isAuthenticated: true,
    });
    setAuthState({
      user: userData,
      token,
      isLoading: false,
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
