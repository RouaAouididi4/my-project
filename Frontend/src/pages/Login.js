import React, { useState, useEffect } from "react";
import "./Login.css";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaPhone } from "react-icons/fa";
import log from "./images/log.png";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };
  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isEmpty = (field) => !formData[field] && touched[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim(), // Sending plain password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.token) {
        throw new Error("No authentication token received");
      }

      // Verify user data structure
      if (!data.user || !data.user._id || !data.user.email) {
        throw new Error("Incomplete user data received");
      }

      login(
        {
          id: data.user._id,
          FullName: data.user.FullName || "",
          email: data.user.email,
          phone: data.user.phone || "",
        },
        data.token
      );

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
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
          </div>
        </div>
      </section>
      <div className="login-container">
        <div className="login-box">
          {/* Left: Form */}
          <div className="login-form">
            <h2>Welcome Back!!</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {isSuccess && (
              <div className="alert alert-success">
                Login successful! Redirecting...
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@gmail.com"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ borderColor: isEmpty("email") ? "red" : "" }}
              />
              <label>Password</label>
              <div className="password-input">
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ borderColor: isEmpty("password") ? "red" : "" }}
                  placeholder="Enter your password"
                  required
                />{" "}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <span onClick={togglePassword}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>{" "}
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
