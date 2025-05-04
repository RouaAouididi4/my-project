// context/auth.js
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CréatioFullName du contexte
const AuthContext = createContext();

// Provider d'authentification
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialisation avec ce qu’il y a dans localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Vérification du token auprès du backend
  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) throw new Error("Invalid token");

          const data = await response.json();
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // mettre à jour l'utilisateur stocké
        } catch (err) {
          logout();
        }
      }
    };

    verifyAuth();
  }, [token]);

  // Connexion
  const login = async (credentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/"); // Redirection après connexion réussie
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);
