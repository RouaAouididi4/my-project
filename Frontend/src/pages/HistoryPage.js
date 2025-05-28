import React, { useState } from "react";
import "./HistoryPage.css";
import { FaTrash } from "react-icons/fa";

const HistoryPage = () => {
  // Données historiques initiales
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      title: "House in Sousse",
      date: "2025-05-10",
      status: "Published",
    },
    {
      id: 2,
      title: "Apartment in Tunis",
      date: "2025-05-05",
      status: "Rejected",
    },
    {
      id: 3,
      title: "Villa in Hammamet",
      date: "2025-04-28",
      status: "Approved",
    },
  ]);

  // Supprimer un élément par id
  const handleDelete = (id) => {
    setHistoryData(historyData.filter((item) => item.id !== id));
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Your Activity History</h2>
      <div className="history-list">
        {historyData.length === 0 ? (
          <p className="no-history">No history available.</p>
        ) : (
          historyData.map((item) => (
            <div key={item.id} className="history-card">
              <div className="card-header">
                <h3>{item.title}</h3>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete history item ${item.title}`}
                >
                  <FaTrash /> Delete
                </button>
              </div>
              <p className="date">Date: {item.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
