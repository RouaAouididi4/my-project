import React, { useState, useEffect } from "react";
import "./PropertyListing.css";
import image1 from "./images/Listing1.jpg";
import image2 from "./images/Listing2.jpg";
import image3 from "./images/Listing3.jpg";
import image4 from "./images/Listing4.jpg";
import image5 from "./images/Listing5.jpg";
import image6 from "./images/Listing6.jpg";
import { getAllProperties } from "../services/propertyService";

function PropertyByLocation() {
  const [favorites, setFavorites] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState([]);

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];
  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
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

  useEffect(() => {
    console.log("properties", properties);
  }, [properties]);

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
        Start your home search today! We offer a variety of houses, apartments,
        and more to match your needs and budget. Use the search below to find a
        place that feels just right for you. It’s quick, easy, and made to help
        you find your perfect home.
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
              key={property._id}
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
