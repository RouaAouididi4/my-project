import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../pages/images/81.png"; // chemin relatif depuis le fichier

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <>
      <div className="loader">
        <img src={logo} alt="Logo" className="loader-logo" />
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

      <style>{`
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .loader-logo {
          width: 150px;
          margin-bottom: 20px;
          animation: zoom 2s ease-in-out infinite;
        }

        @keyframes zoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .dots {
          display: flex;
          gap: 5px;
        }

        .dot {
          width: 10px;
          height: 10px;
          background-color: #333;
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out;
        }

        .dot:nth-child(2) { animation-delay: 0.1s; }
        .dot:nth-child(3) { animation-delay: 0.2s; }
        .dot:nth-child(4) { animation-delay: 0.3s; }
        .dot:nth-child(5) { animation-delay: 0.4s; }
        .dot:nth-child(6) { animation-delay: 0.5s; }
        .dot:nth-child(7) { animation-delay: 0.6s; }
        .dot:nth-child(8) { animation-delay: 0.7s; }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          } 
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Preloader;
