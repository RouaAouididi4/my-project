import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Activate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [countdown, setCountdown] = useState(3); // Compte à rebours de 3 secondes

  console.log("Token dans React Activate:", token);

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }

    const decodedToken = decodeURIComponent(token);
    console.log("🔍 Token décodé dans React:", decodedToken);

    // Démarrer le compte à rebours
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
              "Échec de l'activation sans message d'erreur"
          );
        }

        console.log("Succès:", data);
        localStorage.setItem("isActivated", "true");

        // Redirection après 3 secondes
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.error("Erreur d'activation:", err);

        // Redirection après 3 secondes en cas d'erreur
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      });

    return () => clearInterval(timer);
  }, [token, navigate]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Activation en cours...</h2>
      <p>
        Merci de patienter, vous serez redirigé dans {countdown} seconde
        {countdown !== 1 ? "s" : ""}.
      </p>
    </div>
  );
};

export default Activate;
