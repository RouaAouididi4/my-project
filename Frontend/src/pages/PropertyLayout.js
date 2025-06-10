import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyByLocation.css";
import image1 from "./images/Listing1.jpg";
import image2 from "./images/Listing2.jpg";

function PropertyLayout() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Logique de recherche ou redirection
    console.log("Searching for:", search);
  };

  return (
    <div className="property-page">
      {/* === Formulaire de recherche === */}
      <section className="search-section">
        <h2 className="search-title">Rechercher une propriété</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Titre ou adresse..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select className="search-select">
            <option value="">Toutes les villes</option>
            <option value="Sousse">Sousse</option>
            <option value="Monastir">Monastir</option>
            <option value="Djerba">Djerba</option>
          </select>
          <button type="submit" className="search-button">
            Rechercher
          </button>
        </form>
      </section>

      {/* === Liste des propriétés === */}
      <section className="properties-section">
        <h2 className="section-header">Propriétés disponibles</h2>
        <div className="properties-grid">
          {/* Carte 1 */}
          <div className="property-card">
            <div
              className="property-image"
              style={{ backgroundImage: `url(${image1})` }}
            >
              <span className="property-badge">À vendre</span>
            </div>
            <div className="property-info">
              <h3>Villa à Hergla</h3>
              <p>2 chambres, 2 salles de bain</p>
              <p>Prix: 1.500.000 DT</p>
              <button onClick={() => navigate("/details/1")}>
                Voir Détails
              </button>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="property-card">
            <div
              className="property-image"
              style={{ backgroundImage: `url(${image2})` }}
            >
              <span className="property-badge">À vendre</span>
            </div>
            <div className="property-info">
              <h3>Appartement à Kantaoui</h3>
              <p>3 chambres, 2 salles de bain</p>
              <p>Prix: 2.500.000 DT</p>
              <button onClick={() => navigate("/details/2")}>
                Voir Détails
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PropertyLayout;
