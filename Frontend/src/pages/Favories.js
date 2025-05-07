// FavoritesSection.jsx
import React, { useEffect, useState } from "react";

function FavoritesSection() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/users/favorites");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des favoris");
        }
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Erreur:", error.message);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-section">
      <h2>Mes Favoris</h2>
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore de favoris.</p>
      ) : (
        <ul>
          {favorites.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesSection;
