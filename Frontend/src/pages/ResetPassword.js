import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const getStrength = () => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return "Excellent";
    } else if (password.length > 6) {
      return "Good";
    } else {
      return "Weak";
    }
  };

  const strengthColor = {
    Excellent: "#4caf50",
    Good: "#ff9800",
    Weak: "#f44336",
  };

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirm) {
      alert("Veuillez remplir les deux champs.");
    } else if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas.");
    } else {
      // Ajouter ici la logique d'appel à l'API si nécessaire
      alert("Mot de passe réinitialisé avec succès !");
      navigate("/login");
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
                    Reset password
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

      <div className="forgot-container">
        <div
          className="forgot-box"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            color: "white",
            width: "100%",
            maxWidth: "500px",
            padding: "40px",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
            alt="Reset"
            className="forgot-image"
          />
          <h2 className="forgot-title">Reset password</h2>
          <p className="forgot-subtitle">
            Please kindly set your new password.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New password"
              className="forgot-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="strength-bar">
              <div
                className="bar"
                style={{
                  width: password.length * 10 + "%",
                  backgroundColor: strengthColor[getStrength()],
                }}
              ></div>
            </div>
            <p
              style={{ color: strengthColor[getStrength()], fontSize: "12px" }}
            >
              Password strength: <strong>{getStrength()}</strong>
            </p>

            <input
              type="password"
              placeholder="Re-enter password"
              className="forgot-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button type="submit" className="forgot-btn">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
