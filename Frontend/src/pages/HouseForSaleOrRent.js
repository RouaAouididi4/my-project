import React, { useState, useEffect } from "react";
import "./HouseForSaleOrRent.css";
import image1 from "./images/Listing1.jpg";
import image2 from "./images/Listing2.jpg";
import image3 from "./images/Listing3.jpg";
import image4 from "./images/Listing4.jpg";
import image5 from "./images/Listing5.jpg";
import image6 from "./images/Listing6.jpg";
import { Link, useNavigate } from "react-router-dom";

function PropertyHouse() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

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
        "Cette villa d'exception, située à seulement 150 m de la plage dans le quartier prisé de Cité Nozha à Hergla.",
    },
    {
      id: 2,
      image: image2,
      price: "2.500.000DT",
      title: "Appartement Luxueux",
      address: "Kantaoui, Sousse",
      description:
        "Un appartement haut standing avec vue sur la marina, situé au cœur du prestigieux quartier touristique de Kantaoui.",
    },
    {
      id: 3,
      image: image3,
      price: "800.000DT",
      title: "Studio Moderne",
      address: "Rue Orange, Monastir",
      description:
        "Ce studio moderne offre un espace compact mais élégant à quelques pas de la mer, idéal pour célibataires ou étudiants.",
    },
    {
      id: 4,
      image: image4,
      price: "1.200.000DT",
      title: "Appartement YOSRA",
      address: "Nabeul",
      description:
        "Un appartement lumineux avec balcon spacieux, parfait pour une petite famille ou un couple.",
    },
    {
      id: 5,
      image: image5,
      price: "800.000DT",
      title: "Studio Moderne",
      address: "Rue Orange, Monastir",
      description:
        "Ce studio moderne offre un espace compact mais élégant à quelques pas de la mer, idéal pour célibataires ou étudiants.",
    },
    {
      id: 6,
      image: image6,
      price: "800.000DT",
      title: "Studio Moderne",
      address: "Rue Orange, Monastir",
      description:
        "Ce studio moderne offre un espace compact mais élégant à quelques pas de la mer, idéal pour célibataires ou étudiants.",
    },
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

  return (
    <div className="property-listing-container">
      {/* Hero Section */}
      <section className="hero-section">
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
              padding: "0 20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
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
                <h2 style={{
                  fontSize: "clamp(32px, 6vw, 62px)",
                  fontWeight: "200",
                  letterSpacing: "3px",
                  lineHeight: "1.2",
                }}>
                  House For Sale Or Rent
                </h2>
                <h2 className="search-home-title">Properties made for you.</h2>
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
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-properties">
        <div className="section-header">
          <h2 className="animated-title">FEATURED PROPERTIES</h2>
          <p className="animated-paragraph">
            Découvrez nos propriétés sélectionnées avec soin, prêtes à devenir votre nouveau chez-vous.
          </p>
        </div>

        <div className="properties-grid">
          {featuredProperties.map((property) => (
            <div key={property.id} className="property-card" style={{ height: "500px" }}>
              <div className="image-wrapper">
                <div
                  className="property-image"
                  style={{
                    backgroundImage: `url(${property.image})`,
                  }}
                >
                  <span className="property-badge">FOR SALE</span>
                </div>
                <div className="property-price">{property.price}</div>
              </div>

              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-address">{property.address}</p>
                <hr className="property-divider" />
                <p className="property-description">{property.description}</p>
                <div className="button-container">
                  <button onClick={() => navigate(`/details/${property.id}`)} className="search-button">
                    Voir Détails
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
