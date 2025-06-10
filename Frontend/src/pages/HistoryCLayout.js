import React from "react";
import "./HistoryCLayout.css";

const HistoryCLayout = () => {
  // Exemple de données d'historique (à remplacer par données réelles via API)
  const clientHistory = [
    {
      id: 1,
      clientName: "John Doe",
      action: "Booked Property",
      date: "2025-06-01",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      action: "Updated Profile",
      date: "2025-06-03",
    },
    {
      id: 3,
      clientName: "Ali Ben",
      action: "Canceled Appointment",
      date: "2025-06-05",
    },
  ];

  return (
    <div className="history-clients-container">
      <h2>Historique des Clients</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {clientHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.clientName}</td>
              <td>{item.action}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryCLayout;
