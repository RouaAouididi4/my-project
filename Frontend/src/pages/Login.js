import React, { useState, useEffect} from "react";
import './Login.css';
import {
  FaPhone,
  FaGoogle,
} from "react-icons/fa"

import log from './images/log.png';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];
  
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
             Log in to Discover Your Dream Home
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
<div className="login-container">


      <div className="login-box">
  
        {/* Left: Form */}
        <div className="login-form">
          <h2>Welcome Back!!</h2>

          <form>
            <label>Email</label>
            <input type="email" placeholder="email@gmail.com" required />

            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
              />
              <span onClick={togglePassword}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="separator">or</div>

                    <div className="auth-buttons">
                      <button type="button" className="btn google-btn">
                        <FaGoogle className="google-icon" />
                        Sign in with Google
                      </button>
                      <button type="button" className="btn phone-btn">
                        <FaPhone className="phone-icon" />
                        Sign in with Phone
                      </button>
                    </div>
          
          <p>
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </div>

        {/* Right: Image */}
        <div className="login-image">
        <img src={log} alt="Person using laptop" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
