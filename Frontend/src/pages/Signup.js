import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaGoogle,
  FaEnvelope,
} from "react-icons/fa";
import "./Signup.css";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const togglePassword = () => setShowPassword(!showPassword);
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

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + testimonialsPerPage >= testimonial.length
        ? 0
        : prev + testimonialsPerPage
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isEmpty = (field) => !formData[field] && touched[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newTouched = {
      FullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    };
    setTouched(newTouched);

    const formErrors = {};
    if (!formData.FullName) formErrors.FullName = "Full Name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.password) formErrors.password = "Password is required.";
    if (!formData.confirmPassword)
      formErrors.confirmPassword = "Confirm Password is required.";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      formErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FullName: formData.FullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError(data.message || "Account created successfully!");
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Signup failed. Please try again later.");
    }
  };

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
                    Signup
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
      <div className="login-container">
        <div className="signup-page">
          <div className="signup-container">
            <h1 className="signup-title">Create an account</h1>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="FullName" className="form-label">
                  Full name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="FullName"
                  name="FullName"
                  placeholder="Your name"
                  value={formData.FullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email*
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password*
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password*
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="signup-btn">
                Create account
              </button>

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

              <div className="login-link">
                Already have an account? <a href="#login">login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
