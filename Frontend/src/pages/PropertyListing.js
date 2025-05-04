import React, { useState, useEffect } from "react";
import "./PropertyListing.css";
import image1 from "./images/Listing1.jpg";
import image2 from "./images/Listing2.jpg";
import image3 from "./images/Listing3.jpg";
import image4 from "./images/Listing4.jpg";
import image5 from "./images/Listing5.jpg";
import image6 from "./images/Listing6.jpg";


function PropertyByLocation() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
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
              transition: "background-image 0.5s ease-in-out", // Ajoutez cette ligne

              // position: "relative",
            }}
          >
            {/* Overlay sombre */}
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
                {/* Flèche gauche */}
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
                  {/* Titre principal */}
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
                    Discover our listings
                  </h2>

                  <div className="search-home-container">
                    <h2 className="search-home-title">
                      Properties made for you.
                    </h2>
                  </div>
                </div>

                {/* Flèche droite */}
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

            {/* Animation minimaliste */}
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
            <label className="filter-label">Title</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Enter a title..."
            />
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
        {/* Bouton MORE FILTERS */}
        <div className="filters-footer">
          <button className="search-button">SEARCH</button>
        </div>
      </div>

      {/* Featured Properties Section */}
      <section className="featured-properties">
        <div className="section-header">
          <h2 className="animated-title">FEATURED PROPERTIES</h2>
          <p className="animated-paragraph">
            Découvrez nos propriétés sélectionnées avec soin, prêtes à devenir
            votre nouveau chez-vous.
          </p>
        </div>

        <div className="properties-grid">
          {/* Property Card 1 */}
          <div className="property-card"style={{ height: "500px" }}>
            <div className="image-wrapper">
              <div
                className="property-image"
                style={{
                  backgroundImage: `url(${image1})`,
                }}
              >
                {/* Badge NEW */}
                <span className="property-badge">FOR sALE</span>

                {/* Caractéristiques avec icônes */}
                <div className="property-features">
                  <span className="feature">
                    <i className="fas fa-bed"></i> 2
                  </span>
                  <span className="feature">
                    <i className="fas fa-bath"></i> 2
                  </span>
                  <span className="feature">
                    <i className="fas fa-ruler-combined"></i> 120 sq ft
                  </span>
                </div>
              </div>

              {/* Type et prix */}

              <div className="property-price">1.500.000DT</div>
            </div>

            <div className="property-info">
              <h3 className="property-title">Individual Villa</h3>
              <p className="property-address">Hergla, Cité Nozha</p>
              <hr className="property-divider" />
              <p className="property-description">
                Ctte villa d'exception, située à seulement 150 m de la plage
                dans le quartier prisé de Cité Nozha à Hergla.
              </p>
              <div className="button-container">
                <button onClick={() => navigate(`/details/${property.id}`)} className="search-button"> Voir Détails</button>
              </div>
            </div> 
          </div>
          {/* Property Card 2 */}
          <div className="property-card">
            <div className="image-wrapper">
              <div
                className="property-image"
                style={{
                  backgroundImage: `url(${image2})`,
                }}
              >
                <span className="property-badge">FOR SALE</span>
                <div className="property-features">
                  <span className="feature">
                    <i className="fas fa-bed"></i> 3
                  </span>
                  <span className="feature">
                    <i className="fas fa-bath"></i> 2
                  </span>
                  <span className="feature">
                    <i className="fas fa-ruler-combined"></i> 150 sq ft
                  </span>
                </div>
              </div>
              <div className="property-price">2.500.000DT</div>
            </div>
            <div className="property-info">
              <h3 className="property-title">Appartement Luxueux</h3>
              <p className="property-address">Kantaoui, Sousse</p>
              <hr className="property-divider" />
              <p className="property-description">
                Un appartement haut standing avec vue sur la marina, situé au
                cœur du prestigieux quartier touristique de Kantaoui.
              </p>
              <div className="button-container">
                <button onClick={() => navigate(`/details/${property.id}`)} className="search-button"> Voir Détails</button>
              </div>
            </div>
          </div>
          {/* Property Card 3 */}
          <div className="property-card">
            <div className="image-wrapper">
              <div
                className="property-image"
                style={{
                  backgroundImage: `url(${image3})`,
                }}
              >
                <span className="property-badge">FOR SALE</span>
                <div className="property-features">
                  <span className="feature">
                    <i className="fas fa-bed"></i> 1
                  </span>
                  <span className="feature">
                    <i className="fas fa-bath"></i> 1
                  </span>
                  <span className="feature">
                    <i className="fas fa-ruler-combined"></i> 75 sq ft
                  </span>
                </div>
              </div>
              <div className="property-price">800.000DT</div>
            </div>
            <div className="property-info">
              <h3 className="property-title">Studio Moderne</h3>
              <p className="property-address">Rue Orange, Monastir</p>
              <hr className="property-divider" />
              <p className="property-description">
                Ce studio moderne offre un espace compact mais élégant à
                quelques pas de la mer, idéal pour célibataires ou étudiants.
              </p>
              <div className="button-container">
                <button onClick={() => navigate(`/details/${property.id}`)} className="search-button"> Voir Détails</button>
              </div>
            </div>
          </div>
        </div>
        <div className="properties-grid">
          {/* Property Card 4 */}
          <div className="property-card"style={{ height: "500px" }}>
            <div className="image-wrapper">
              <div
                className="property-image"
                style={{
                  backgroundImage: `url(${image4})`,
                }}
              >
                <span className="property-badge">FOR SALE</span>
                <div className="property-features">
                  <span className="feature">
                    <i className="fas fa-bed"></i> 2
                  </span>
                  <span className="feature">
                    <i className="fas fa-bath"></i> 1
                  </span>
                  <span className="feature">
                    <i className="fas fa-ruler-combined"></i> 95 sq ft
                  </span>
                </div>
              </div>
              <div className="property-price">1.200.000DT</div>
            </div>
            <div className="property-info">
              <h3 className="property-title">Appartement YOSRA</h3>
              <p className="property-address">Nabeul</p>
              <hr className="property-divider" />
              <p className="property-description">
                Un appartement lumineux avec balcon spacieux, parfait pour une
                petite famille ou un couple.
              </p>
              <div className="button-container">
                <button onClick={() => navigate(`/details/${property.id}`)} className="search-button"> Voir Détails</button>
              </div>
            </div>
          </div>

          {/* Property Card 5 */}
          <div className="property-card">
            <div className="image-wrapper">
              <div
                className="property-image"
                style={{
                  backgroundImage: `url(${image5})`,
                }}
              >
                <span className="property-badge">FOR SALE</span>
                <div className="property-features">
                  <span className="feature">
                    <i className="fas fa-bed"></i> 1
                  </span>
                  <span className="feature">
                    <i className="fas fa-bath"></i> 1
                  </span>
                  <span className="feature">
                    <i className="fas fa-ruler-combined"></i> 75 sq ft
                  </span>
                </div>
              </div>
              <div className="property-price">800.000DT</div>
            </div>
            <div className="property-info">
              <h3 className="property-title">Studio Moderne</h3>
              <p className="property-address">Rue Orange, Monastir</p>
              <hr className="property-divider" />
              <p className="property-description">
                Ce studio moderne offre un espace compact mais élégant à
                quelques pas de la mer, idéal pour célibataires ou étudiants.
              </p>
              <div className="button-container">
                <button onClick={() => navigate(`/details/${property.id}`)} className="search-button"> Voir Détails</button>
              </div>
            </div>
          </div>
          {/* Property Card 6 */}
          <div className="property-card">
            <div className="image-wrapper">
              <div
                className="property-image"
                style={{
                  backgroundImage: `url(${image6})`,
                }}
              >
                <span className="property-badge">FOR SALE</span>
                <div className="property-features">
                  <span className="feature">
                    <i className="fas fa-bed"></i> 1
                  </span>
                  <span className="feature">
                    <i className="fas fa-bath"></i> 1
                  </span>
                  <span className="feature">
                    <i className="fas fa-ruler-combined"></i> 75 sq ft
                  </span>
                </div>
              </div>
              <div className="property-price">800.000DT</div>
            </div>
            <div className="property-info">
              <h3 className="property-title">Studio Moderne</h3>
              <p className="property-address">Rue Orange, Monastir</p>
              <hr className="property-divider" />
              <p className="property-description">
                Ce studio moderne offre un espace compact mais élégant à
                quelques pas de la mer, idéal pour célibataires ou étudiants.
              </p>
              <div className="button-container">
                <button onClick={() => navigate(`/details/${property.id}`)} className="search-button"> Voir Détails</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PropertyByLocation;
