import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyByLocation.css";
import { getAllProperties } from "../services/propertyService";

function PropertyByLocation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getAllProperties();
        setProperties(response?.data.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
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
                    transition: "all 0.3s",
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
                    transition: "all 0.3s",
                    userSelect: "none",
                    color: "#947054",
                  }}
                >
                  ›
                </span>
              </div>
            </div>

            <style jsx global>{`
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
              Home Type
            </label>
            <select className="filter-select">
              <option>Select a HomeType</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Studio</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Street Address</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Enter a StreetAdress..."
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">All Cities</label>
            <select className="filter-select">
              <option>Select city</option>
              <option>Djerba</option>
              <option>Grand Tunis</option>
              <option>Monastir</option>
              <option>Nabeul</option>
              <option>Sousse</option>
            </select>
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
            Découvrez nos propriétés sélectionnées avec soin, prêtes à devenir
            votre nouveau chez-vous.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            paddingTop: "12px",
          }}
        >
          {properties?.map((property) => (
            <div
              className="property-card"
              style={{ height: "500px", minWidth: "400px" }}
            >
              <div className="image-wrapper">
                <div
                  className="property-image"
                  style={{
                    backgroundImage: `url(${"http://localhost:3001" + property?.photos[0]?.url})`,
                  }}
                >
                  {/* Badge NEW */}
                  <span className="property-badge">FOR Sale</span>

                  {/* Caractéristiques avec icônes */}
                  <div className="property-features">
                    <span className="feature">
                      <i className="fas fa-bed"></i> {property?.beds || 0}
                    </span>
                    <span className="feature">
                      <i className="fas fa-bath"></i>{" "}
                      {property?.baths?.fullBaths +
                        property?.baths?.halfBaths || 0}
                    </span>
                    <span className="feature">
                      <i className="fas fa-ruler-combined"></i> -- sq ft
                    </span>
                  </div>
                </div>

                {/* Type et prix */}

                <div className="property-price">{property?.price}DT</div>
              </div>

              <div className="property-info">
                <h3 className="property-title">{property?.title}</h3>
                <p className="property-address">{property?.streetAddress}</p>
                <hr className="property-divider" />
                <p className="property-description">{property?.description}</p>
                <div className="button-container">
                  <button
                    onClick={() => navigate(`/details/${property?._id}`)}
                    className="search-button"
                  >
                    {" "}
                    Voir Détails
                  </button>
                  {/* <button
                    onClick={() => toggleFavorite(property)}
                    className="favorite-button"
                  >
                    {favorites.some((fav) => fav.id === property.id)
                      ? "Remove ❤️"
                      : "Add ❤️"}
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PropertyByLocation;
