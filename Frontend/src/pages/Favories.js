// FavoritesSection.jsx
import React, { useEffect, useState } from "react";

function FavoritesSection() {
 const favorites = [
    {
      _id: "1",
      title: "Appartement S+2 à La Marsa",
      location: "La Marsa, Tunis",
      price: 1200,
    },
    {
      _id: "2",
      title: "Villa avec piscine à Hammamet",
      location: "Hammamet, Nabeul",
      price: 3500,
    },
    {
      _id: "3",
      title: "Studio moderne à Sousse",
      location: "Sousse Ville",
      price: 800,
    },
  ];

  return (
    <div className="favorites-section p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">❤️ Mes Favoris</h2>
      {favorites.length === 0 ? (
        <p>Vous n'avez pas encore de favoris.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <li
              key={item._id}
              className="bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-600">{item.location}</p>
              <p className="text-green-600 font-medium mt-1">
                {item.price} DT/mois
              </p>
              <button className="mt-3 inline-block text-red-500 hover:underline">
                Retirer ❤️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesSection;
