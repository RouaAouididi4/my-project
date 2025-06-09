import React, { useEffect, useState } from "react";
import "./ClientManagement.css";

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    // Remplace l'URL par celle de ton backend
    fetch("http://localhost:3001/api/users") // Exemple d'URL
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des clients");
        }
        return res.json();
      })
      .then((data) => {
        // Ton backend renvoie { status: "success", data: users }
        setClients(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="client-management-container">
      <h2>List of clients</h2>
      <table className="client-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client._id}
              onClick={() => setSelectedClient(client)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedClient?._id === client._id
                    ? "#f0f8ff"
                    : "transparent",
              }}
            >
              <td>{client.FullName}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedClient && (
        <div className="client-details">
          <h3>Détails du client sélectionné</h3>
          <p>
            <strong>Nom complet:</strong> {selectedClient.FullName}
          </p>
          <p>
            <strong>Email:</strong> {selectedClient.email}
          </p>
          <p>
            <strong>Téléphone:</strong> {selectedClient.phone}
          </p>
          <p>
            <strong>Localisation:</strong> {selectedClient.location}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
