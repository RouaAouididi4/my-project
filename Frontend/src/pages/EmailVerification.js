import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import "./EmailVerification.css";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/users/verify/${token}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMessage("✅ Your account has been successfully verified!");
          setSuccess(true);

          // 🔁 Redirect after a short delay
          setTimeout(() => {
            navigate("/login"); // Redirects to the login page
          }, 3000); // 3 seconds
        } else {
          setMessage(data.message || "❌ Verification failed.");
        }
      } catch (error) {
        console.error("❌ Network error:", error);
        setMessage("❌ Network error. Please try again later.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        {success && <MdCheckCircle className="verify-icon" />}
        <h2 className="verify-message">{message}</h2>
      </div>
    </div>
  );
};

export default EmailVerification;
