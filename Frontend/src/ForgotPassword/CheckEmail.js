import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const CheckEmail = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // <-- Add this line
  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/check-email');
  };

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
  }, [images.length]);
  return (
    <div className="container-fluid about-container py-5">
               <section className="hero">
        <div className="hero-slides owl-carousel">
          <div
            className="single-hero-slide"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              marginLeft: "-30px",
              // Right: "20px",

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
                    marginTop: "200px",

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
                      margin: "200px 0 10px 0",
                      animation: "fadeIn 1.5s ease-out both",
                    }}
                  >
                    Forgot Password
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
                    marginTop: "200px",
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
      <div className="check-email-container">
      <div className="check-email-card">
        <div className="check-email-header">
          <img src="/logo.png" alt="Logo" className="logo" />
          <span className="register-link">
            Don’t have an account? <a href="/register">Register Now</a>
          </span>
        </div>

        <div className="check-email-body">
          <div className="icon">
            <span role="img" aria-label="email">📧✔️</span>
          </div>
          <h2>Check your email!</h2>
          <p>
            Thanks! An email was sent that will ask you to click on a link to verify
            that you own this account. If you don’t get the email, please contact
            support@kinety.com.
          </p>

          <button className="open-inbox-button">Open email inbox</button>
          <a href="/resend" className="resend-link">Resend email</a>
        </div>

        <div className="check-email-footer">
          <p>Copyright © 2025 | <a href="/privacy">Privacy Policy</a></p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CheckEmail;