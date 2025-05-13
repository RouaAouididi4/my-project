import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import password from "./images/password.jpg";

const CodeVerif = () => {
  const [code, setCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  // Format the countdown timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle code verification
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/reset-password", {
          state: { email },
          message: "Code verified successfully",
        });
      } else {
        setError(data.message || "Invalid code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while verifying the code. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Request a new verification code
  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset the countdown timer
        setCountdown(600);
        alert("A new verification code has been sent to your email.");
      } else {
        setError(
          data.message || "Failed to send a new code. Please try again."
        );
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error resending code:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Slideshow controls
  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Check if email exists in state
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  return (
    <div>
      {/* Section fond animé */}
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
                    Verify Code
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

            <style jsx>{`
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

      {/* Formulaire vérification code */}
      <div className="forgot-container">
        <div
          className="forgot-box"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            color: "white",
            width: "100%",
            maxWidth: "600px",
            padding: "50px",
          }}
        >
          <img src={password} alt="password" className="forgot-image" />
          <h2 className="forgot-title">Enter your 6-digit code</h2>
          <p className="forgot-subtitle">
            We've sent a verification code to your email: <b>{email}</b>
          </p>
          <p className="timer">
            Code expires in: <b>{formatTime(countdown)}</b>
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Enter the 6-digit code"
              className="forgot-input"
              maxLength={6}
              required
            />
            <button
              type="submit"
              className="forgot-btn"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <div className="resend-code">
            Didn't receive the code?{" "}
            <button
              onClick={handleResendCode}
              disabled={isLoading || countdown > 540} // Allow resend after 1 minute
              className="resend-btn"
            >
              Resend Code
            </button>
          </div>

          <div className="forgot-footer" onClick={() => navigate("/login")}>
            <span className="back-arrow">←</span> Back to Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerif;
