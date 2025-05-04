import React, { useEffect } from "react";
import "./Services.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import des images avec des noms différents
import ServicesImg1 from "./images/Services1.jpg";
import ServicesImg4 from "./images/Services4.jpg";
import ServicesImg3 from "./images/Services3.jpg";




const Services = () => {
   const [currentIndex, setCurrentIndex] = React.useState(0);
    const [formData, setFormData] = React.useState({
      streetAddress: "",
      city: "",
    });
    const images = [
      "img/bg-img/hero1.jpg",
      "img/bg-img/hero2.jpg",
      "img/bg-img/hero3.jpg",
    ];
  
    const sectionRef = React.useRef(null);
    const streetRef = React.useRef(null);
    const unitRef = React.useRef(null);
    const cityRef = React.useRef(null);
    const zipRef = React.useRef(null);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleContinue = () => {
      console.log("Form submitted", formData);
    };
  
    const goToPrevSlide = () => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
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
    <div>
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
              transition: "background-image 0.5s ease-in-out",
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
                    Our Services
                  </h2>
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
          </div>
        </div>
      </section>
    <div className="services-wrapper">

      <div className="services-box white-box">
        At Real Estate Agency, we provide professional and reliable real estate services to help you buy, sell, rent, or manage properties with ease.
      </div>

      <div className="services-images">
        <img
          src={ServicesImg1}
          alt="Service 1"
          className="image-large"
        />
        <div className="image-side-container">
          <img
            src={ServicesImg3}
            alt="Service 3"
            className="image-small"
          />
          <p className="side-caption">We'll make it easy for you — Tap 'Login'</p>
        </div>
      </div>

      <div className="services-box white-box">
        It's well known that readers can be distracted by a page's layout rather than its content. Lorem Ipsum is commonly used because it mimics natural text distribution, making it look like readable English. Today, many desktop publishing tools and web editors use Lorem Ipsum as a default placeholder, and a quick search will reveal its widespread presence across websites.
      </div>

      <h3 className="services-subtitle">Why Choose Us</h3>
      <div className="intro-section">
      <div className="intro-banner">
        
        <img
          src={ServicesImg4}
          alt="Services4" 
          className="intro-image img-fluid zoom-hover rounded"
        />
      </div>

      <div className="service-grid">
        <div className="service-box">
          <h4>Property Sales & Rentals</h4>
          <p>
            We offer a wide range of properties for sale and rent, ensuring you
            find the perfect home or investment opportunity.
          </p>
        </div>
        <div className="service-box">
          <h4>Property Management</h4>
          <p>
            From tenant management to maintenance, we handle everything to keep
            your property in top condition.
          </p>
        </div>
        <div className="service-box">
          <h4>Market Analysis & Valuation</h4>
          <p>
            We assess property values and market trends to ensure you get the
            best deal.
          </p>
        </div>
        <div className="service-box">
          <h4>Real Estate Consulting</h4>
          <p>
            Our experts provide valuable insights to help you make informed
            real estate decisions.
          </p>
        </div>
      </div>
    </div>
    
    </div>
    </div>
  );
};

export default Services;
