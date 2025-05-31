import React, { useEffect, useState } from "react";
import "./PropertyDetails.css";

function PropertyDetails({ property, agent }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(property.id)) {
      const updated = favorites.filter((favId) => favId !== property.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(property.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="property-details-container">
      {/* Left Column */}
      <div className="property-main">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2 className="price">{property.price.toLocaleString()} DT</h2>
            <h1 className="hometype">{property.hometype}</h1>
            <p className="address">{property.address}</p>
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            style={{
              background: "none",
              border: "none",
              fontSize: "28px",
              cursor: "pointer",
              color: isFavorite ? "red" : "gray",
            }}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <p className="description">{property.description}</p>

        <div className="icons-row">
          <span>🛁 2</span>
          <span>🛏 2</span>
          <span>📐 120 sq ft</span>
        </div>

        <ul className="features-list">
          {[...new Set([...property.features, ...property.features])].map(
            (feature, index) => (
              <li key={index}>{feature}</li>
            )
          )}
        </ul>

        <div className="action-buttons">
          <button className="btn-outline">SEE FLOOR PLANS</button>
          <button className="btn-dark">CALCULATE MORTGAGE</button>
        </div>
      </div>

      {/* Right Column */}
      <div className="agent-card">
        <img src={agent.photo} alt={agent.name} className="agent-photo" />
        <h3>{agent.name}</h3>
        <p className="agent-role">{agent.role}</p>
        <p>📞 {agent.phone}</p>
        <p>📧 {agent.email}</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Your Number" />
          <input type="email" placeholder="Your Email" />
          <textarea rows="4" placeholder="Your Message"></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
}

export default PropertyDetails;
