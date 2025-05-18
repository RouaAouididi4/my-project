import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";
import password from "./images/password.jpg";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("resetEmail", email);

        console.log("Redirection vers /CodeVerif");
        navigate("/CodeVerif", { state: { email } });
      } else {
        alert(data.message || "Email not found");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again.");
    }
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
    <div>
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
                    marginTop: "200px",
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
                      margin: "200px 0 10px 0",
                      animation: "fadeIn 1.5s ease-out both",
                    }}
                  >
                    Forget Password
                  </h2>
                </div>

                <span
                  onClick={goToNextSlide}
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    opacity: 0.8,
                    userSelect: "none",
                    marginTop: "200px",
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

      <div className="forgot-container">
        <div
          className="forgot-box"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            color: "white",
            width: "100%",
            maxWidth: "600px" /* Increased max-width */,
            padding: "50px",
          }}
        >
          <img src={password} alt="password" className="forgot-image" />
          <h2 className="forgot-title">Forgot your password?</h2>
          <p className="forgot-subtitle">
            Enter your email so that we can send you a password reset link
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. username@kenoty.com"
              className="forgot-input"
              required
            />
            <button type="submit" className="forgot-btn">
              Send Email
            </button>
          </form>

          <div className="forgot-footer" onClick={() => navigate("/login")}>
            <span className="back-arrow">←</span> Back to Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
