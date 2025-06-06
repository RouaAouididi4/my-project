import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Activate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [countdown, setCountdown] = useState(3); // 3-second countdown

  console.log("Token in React Activate:", token);

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }

    const decodedToken = decodeURIComponent(token);
    console.log("🔍 Decoded token in React:", decodedToken);

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    fetch(`http://localhost:3001/api/auth/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: decodedToken }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              "Activation failed with no error message"
          );
        }

        console.log("Success:", data);
        localStorage.setItem("isActivated", "true");

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.error("Activation error:", err);

        // Redirect after 3 seconds on error
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });

    return () => clearInterval(timer);
  }, [token, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h2>Activation...</h2>
      <p>
        Please wait, you will be redirected in {countdown} second
        {countdown !== 1 ? "s" : ""}.
      </p>
    </div>
  );
};

export default Activate;
