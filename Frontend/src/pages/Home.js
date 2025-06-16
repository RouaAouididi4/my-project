import React, { useState, useEffect, useRef, use } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import image1 from "./images/Listing1.jpg";
import image2 from "./images/Listing2.jpg";
import image3 from "./images/Listing3.jpg";
import image4 from "./images/Listing4.jpg";
import image5 from "./images/Listing5.jpg";
import imagevideo from "./images/imagevideo.png";
import image6 from "./images/Listing6.jpg";
import client1 from "./images/client1.jpg";
import jeremyScottImage from "./images/scott.png";
import client2 from "./images/client2.jpg";
import client3 from "./images/client3.jpg";
import client4 from "./images/client4.jpg";
import client5 from "./images/client5.jpg";
import client6 from "./images/client6.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    streetAddress: "",
    city: "",
    type: "",
    homeType: "",
    beds: "",
    baths: "",
    price: "",
  });

  const testimonial = [
    {
      id: 1,
      name: "Iline Haddad",
      role: "CEO, Company Inc.",
      content:
        "This product completely transformed our workflow. The team is more productive and we've seen incredible results.",
      photo: client1,
    },
    {
      id: 2,
      name: "Alma Mejri",
      role: "Marketing Director",
      content:
        "I was skeptical at first, but after using it for just one week I can't imagine working without it anymore.",
      photo: client2,
    },
    {
      id: 3,
      name: "Amine Jarray",
      role: "Product Manager",
      content:
        "The customer support is exceptional. They went above and beyond to help us implement the solution.",
      photo: client3,
    },
    {
      id: 4,
      name: "Walid Tobbi",
      role: "UX Designer",
      content:
        "An intuitive and powerful tool that helped streamline our design process. I highly recommend it.",
      photo: client4,
    },
    {
      id: 5,
      name: "Houssem Chmangui",
      role: "CTO, Tech Corp",
      content:
        "Robust, reliable, and extremely helpful. One of the best investments we've made in tech.",
      photo: client5,
    },
    {
      id: 6,
      name: "Lina Bobtan",
      role: "Freelancer",
      content:
        "I love how simple it is to use. It has improved the way I work with my clients.",
      photo: client6,
    },
  ];
  const [startIndex, setStartIndex] = useState(0);
  const testimonialsPerPage = 3;

  const visibleTestimonials = testimonial.slice(
    startIndex,
    startIndex + testimonialsPerPage
  );

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0
        ? testimonial.length - testimonialsPerPage
        : prev - testimonialsPerPage
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + testimonialsPerPage >= testimonial.length
        ? 0
        : prev + testimonialsPerPage
    );
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 } // Déclenche quand 10% de l'élément est visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSearch = async () => {
    try {
      const response = await searchProperties(filters); // tu dois créer cette méthode dans ton service API
      setProperties(response.data.data);
      onSearch(filters);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-4 collapse navbar-collapse justify-content-end">
        <a className="navbar-brand" href="/">
          CasaTech
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/about-us">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/properties">
              Properties
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/listings">
              Listings
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-slides owl-carousel">
          <div
            className="single-hero-slide"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              width: "100%",
              transition: "background-image 0.5s ease-in-out", // Ajoutez cette ligne

              position: "relative",
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
                    FIND YOUR DREAM HOUSE
                  </h2>

                  <div className="search-home-container">
                    <h2 className="search-home-title">SEARCH FOR YOUR HOME</h2>
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
        {/* Row 1 */}
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Street Address</label>
            <input
              type="text"
              className="filter-input"
              name="streetAddress"
              value={filters.streetAddress}
              placeholder="Enter a Street Address..."
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">City</label>
            <select
              className="filter-select"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
            >
              <option value="">Select city</option>
              <option value="Djerba">Djerba</option>
              <option value="Grand Tunis">Grand Tunis</option>
              <option value="Monastir">Monastir</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Sousse">Sousse</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Type</label>
            <select
              className="filter-select"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Select a type</option>
              <option value="rent">For rent</option>
              <option value="sale">For sale</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Bedrooms</label>
            <select
              className="filter-select"
              name="beds"
              value={filters.beds}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Bathrooms</label>
            <select
              className="filter-select"
              name="baths"
              value={filters.baths}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Max Price</label>
            <input
              type="number"
              className="filter-input"
              name="price"
              value={filters.price}
              placeholder="Enter max price"
              onChange={handleFilterChange}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Home Type</label>
            <select
              className="filter-select"
              name="homeType"
              value={filters.homeType}
              onChange={handleFilterChange}
            >
              <option value="">Select a type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="filters-footer">
          <button className="search-btn" onClick={handleSearch}>
            SEARCH
          </button>
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
              key={property._id}
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
      <div className="hero-section" ref={sectionRef}>
        <div
          className="hero-image"
          style={{
            backgroundImage: `url(${imagevideo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <p className="typewriter-text">
                ARE YOU LOOKING FOR A PLACE TO RENT?
              </p>
              <p>Explore top rental properties in your preferred location.</p>
              <div className="hero-divider">
                <button className="search-button">SEARCH</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="testimonials">
        {" "}
        <h2 className="testimonials-title">CLIENT TESTIMONIALS</h2>{" "}
        <p className="testimonials-subtitle"> Happy homeowners speak </p>{" "}
        <div className="testimonials-container">
          {visibleTestimonials.map((testimonial) => (
            <div className="testimonial" key={testimonial.id}>
              <h3 className="testimonial-heading">{testimonial.name}</h3>
              <p className="testimonial-text">{testimonial.content}</p>
              <div className="testimonial-footer">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <p className="testimonial-name">
                  {testimonial.name}, <span>{testimonial.role}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonial-nav">
          <button className="testimonial-btn" onClick={handlePrev}>
            ❮
          </button>
          <button className="testimonial-btn" onClick={handleNext}>
            ❯
          </button>
        </div>
      </section>

      <div className="agent-profile-container">
        <div className="text-content">
          <h1>Akrem Maatouk</h1>
          <h2>Real Estate Consultant</h2>

          <p className="description">
            With over a decade of experience in Tunisia's dynamic property
            market, Akrem Maatouk provides expert guidance for buying, selling,
            or renting homes, apartments, and commercial spaces.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <span className="icon">📞</span>
              <span>+216 12 345 678</span>
            </div>
            <div className="contact-item">
              <span className="icon">✉️</span>
              <span>contact@scott-realestate.tn</span>
            </div>
          </div>
        </div>

        <div className="image-container">
          <img
            src={jeremyScottImage}
            alt="Jeremy Scott"
            className="profile-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
