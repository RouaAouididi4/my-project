import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Preloader.css"; // Ajoute ton fichier CSS

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // ✅ On détecte le changement de page

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Cache après 1s
    return () => clearTimeout(timer);
  }, [location]);

  return (
    loading && (
      <div className="preloader">
        <img alt="Loading..." src="images/8.png" className="logo" />;
      </div>
    )
  );
};

export default Preloader;
