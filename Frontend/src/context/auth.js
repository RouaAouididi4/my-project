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
    if (!token || !userData?.id) {
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
  const [user, setUser] = useState(null); // Utilisez 'user' au lieu de 'User'

  useEffect(() => {
    // Charger l'utilisateur au montage
    const loadUser = async () => {
      try {
        const response = await api.get("/me");
        setUser(response.data); // Stocker les données utilisateur
      } catch (err) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  // In your auth service or where logout is handled
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include", // Important for session cookies
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear client-side user state
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
