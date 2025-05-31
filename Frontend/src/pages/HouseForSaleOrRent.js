import React, { useState, useEffect } from "react";
import "./HouseForSaleOrRent.css";
import image1 from "./images/Listing1.jpg";
import image2 from "./images/Listing2.jpg";
import image3 from "./images/Listing3.jpg";
import image4 from "./images/Listing4.jpg";
import image5 from "./images/Listing5.jpg";
import image6 from "./images/Listing6.jpg";
import { useNavigate } from "react-router-dom";

function PropertyHouse() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  const featuredProperties = [
    {
      id: 1,
      image: image1,
      price: "1.500.000DT",
      title: "Individual Villa",
      address: "Hergla, Cité Nozha",
      description:
        "A stylish and peaceful villa in Hergla's Cité Nozha, perfect for families.Features a modern design, garden, and bright interior near the beach.",
      type: "sale",
    },
    {
      id: 2,
      image: image2,
      price: "2.500.000DT",
      title: "Appartement Luxueux",
      address: "Kantaoui, Sousse",
      description:
        "Modern 2-bedroom, 2-bathroom apartment in Kantaoui by the marina, with an open kitchen, bright living room, balcony, parking, fast internet, and close to the beach, shops, and cafés.",
      type: "rent",
    },
    {
      id: 3,
      image: image3,
      price: "800.000DT",
      title: "Studio Moderne",
      address: "Rue Orange, Monastir",
      description:
        "This modern studio offers a compact yet stylish space just steps from the sea, ideal for singles or students.",
      type: "sale",
    },
    {
      id: 4,
      image: image4,
      price: "1.200.000DT",
      title: "Appartement YOSRA",
      address: "Nabeul",
      description:
        "A bright apartment with a spacious balcony, perfect for a small family or a couple.",
      type: "rent",
    },
    {
      id: 5,
      image: image5,
      price: "800.000DT",
      title: "Studio Moderne",
      address: "Rue Orange, Monastir",
      description:
        "Ce studio moderne offre un espace compact mais élégant à quelques pas de la mer, idéal pour célibataires ou étudiants.",
      type: "sale",
    },
    {
      id: 6,
      image: image6,
      price: "800.000DT",
      title: "Studio Moderne",
      address: "Rue Orange, Monastir",
      description:
        "Ce studio moderne offre un espace compact mais élégant à quelques pas de la mer, idéal pour célibataires ou étudiants.",
      type: "rent",
    },
  ];

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const toggleFavorite = (property) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === property.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== property.id);
      } else {
        return [...prevFavorites, property];
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="property-listing-container">
      <section className="hero-section">
        <div className="hero-slides owl-carousel">
          <div
            className="single-hero-slide"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              marginLeft: "10px",
              width: "100%",
              transition: "background-image 0.5s ease-in-out",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(48, 38, 2, 0.21)",
                zIndex: 0,
              }}
            ></div>

            <div
              className="hero-content"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                width: "100%",
                textAlign: "center",
                color: "white",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)",
                padding: "0 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "30px",
                }}
              >
                <span
                  onClick={goToPrevSlide}
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    opacity: 0.8,
                    userSelect: "none",
                    color: "#947054",
                  }}
                >
                  ‹
                </span>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2
                    style={{
                      fontSize: "clamp(32px, 6vw, 62px)",
                      fontWeight: "200",
                      letterSpacing: "3px",
                      lineHeight: "1.2",
                      margin: "0 0 10px 0",
                      animation: "fadeIn 1.5s ease-out both",
                    }}
                  >
                    Discover our Location
                  </h2>

                  <div className="search-home-container">
                    <h2 className="search-home-title">
                      Properties made for you.
                    </h2>
                  </div>
                </div>

                <span
                  onClick={goToNextSlide}
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    opacity: 0.8,
                    userSelect: "none",
                    color: "#947054",
                  }}
                >
                  ›
                </span>
              </div>
            </div>

            <style jsx="true" global="true">{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label" All>
              Type
            </label>
            <select className="filter-select">
              <option>Select a type</option>
              <option>For rent</option>
              <option>For sale</option>
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Bedrooms</label>
            <select className="filter-select">
              <option>Any</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Bathrooms</label>
            <select className="filter-select">
              <option>Any</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Surface area</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number"
                className="filter-input"
                placeholder="Min"
                style={{ flex: 1 }}
              />
              <span style={{ lineHeight: "35px" }}>-</span>
              <input
                type="number"
                className="filter-input"
                placeholder="Max"
                style={{ flex: 1 }}
              />
              <span style={{ lineHeight: "35px", marginLeft: "5px" }}>
                sq. ft
              </span>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price range</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number"
                className="filter-input"
                placeholder="Min"
                style={{ flex: 1 }}
              />
              <span style={{ lineHeight: "35px" }}>-</span>
              <input
                type="number"
                className="filter-input"
                placeholder="Max"
                style={{ flex: 1 }}
              />
              <span style={{ lineHeight: "35px", marginLeft: "5px" }}>DT</span>
            </div>
          </div>
        </div>
        <div className="filters-footer">
          <button className="search-button">SEARCH</button>
        </div>
      </div>

      <section className="featured-properties">
        <div className="section-header">
          <h2 className="animated-title">FEATURED PROPERTIES</h2>
          <p className="animated-paragraph">
            Discover our carefully selected properties, ready to become your new home.
          </p>
        </div>

        <div className="properties-grid">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="property-card"
              style={{ height: "500px" }}
            >
              <div className="image-wrapper">
                <div
                  className="property-image"
                  style={{ backgroundImage: `url(${property.image})` }}
                >
                  <span
                    className={`property-badge ${
                      property.type === "rent" ? "badge-rent" : "badge-sale"
                    }`}
                  >
                    {property.type === "rent" ? "FOR RENT" : "FOR SALE"}
                  </span>
                </div>
                <div className="property-price">{property.price}</div>
              </div>
              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-address">{property.address}</p>
                <hr className="property-divider" />
                <p className="property-description">{property.description}</p>
                <div className="button-container">
                  <button
                    onClick={() => navigate(`/details/${property.id}`)}
                    className="search-button"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => toggleFavorite(property)}
                    className="favorite-button"
                  >
                    {favorites.some((fav) => fav.id === property.id)
                      ? "Remove ❤️"
                      : "Add ❤️"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

          
    </div>
  );
}

export default PropertyHouse; 