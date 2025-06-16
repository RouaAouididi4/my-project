import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPhone,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailCheckMessage, setShowEmailCheckMessage] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [touched, setTouched] = useState({
    FullName: false,
    email: false,
    phone: false,
    location: false,
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    confirmPassword: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const togglePassword = () => setShowPassword(!showPassword);
  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = "";
    if (!touched[name] && !isSubmitting) return true;

    switch (name) {
      case "FullName":
        if (!value.trim()) error = "Full Name is required";
        else if (value.length < 3) error = "Name too short";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "phone":
        if (!value) error = "Phone number is required";

        break;
      case "location":
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== formData.password) error = "Passwords don't match";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!touched[field] && !formData[field]) {
        return;
      }
      const fieldValid = validateField(field, formData[field]);
      if (!fieldValid) {
        newErrors[field] = errors[field];
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔄 Form submission started");

    setIsSubmitting(true);
    setIsSuccess(false);
    setErrors({});

    // Vérification des champs du formulaire
    if (!validateForm()) {
      console.log("❌ Form validation failed", formData);
      setIsSubmitting(false);
      return;
    }

    let role = "client";
    const email = formData.email;
    if (email.endsWith("@admin.com")) {
      role = "admin";
    } else if (email.endsWith("@agent.com")) {
      role = "agent";
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: formData.FullName,
          email,
          phone: formData.phone,
          location: formData.location,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role,
        }),
      });
      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const data = await response.json();

      console.log("📬 Server response:", data);

      if (!response.ok) {
        // Gestion des erreurs du serveur
        throw new Error(data.message || "Registration failed");
      }

      // Enregistrement réussi
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update state
      setIsSuccess(true);
      setShowEmailCheckMessage(true);
      setEmail(data.user.email);

      // Show success message
      alert("✅ Account created successfully!");

      // Redirect based on email
      if (data.user.email.endsWith("@admin.com")) {
        navigate("/agent/admin-dashboard");
      } else if (data.user.email.endsWith("@agent.com")) {
        navigate("/agent/agent-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setErrors({
        server: err.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      console.log("🛑 Form submission ended");
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

            {errors.server && (
              <div className="alert alert-danger">{errors.server}</div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="FullName" className="form-label">
                  Full name*
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.FullName ? "is-invalid" : ""}`}
                  id="FullName"
                  name="FullName"
                  placeholder="Your name"
                  value={formData.FullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.FullName && (
                  <div className="invalid-feedback">{errors.FullName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email*
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number*
                </label>
                <div className="input-group">
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    id="phone"
                    name="phone"
                    placeholder="+216 12 345 678"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
              </div>

              {/* Nouveau champ Location */}
              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Location*
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control ${errors.location ? "is-invalid" : ""}`}
                    id="location"
                    name="location"
                    placeholder="Your city or address"
                    value={formData.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password*
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    placeholder="Your password (min 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password*
                </label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="signup-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
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
              {isSuccess && (
                <div className="alert alert-success mt-3">
                  Inscription réussie ! Redirection en cours...
                </div>
              )}
              <div className="login-link">
                Already have an account? <a href="/login">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
