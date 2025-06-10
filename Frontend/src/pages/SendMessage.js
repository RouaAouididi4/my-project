import React, { useState } from "react";
import "./SendMessage.css";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ici tu peux faire ta logique d'envoi (API call ou autre)
    console.log("Message envoyé à:", recipient);
    console.log("Message:", message);

    setSuccess(true);
    setMessage("");
    setRecipient("");
  };

  return (
    <div className="send-message-container">
      <h2>Envoyer un message à un agent</h2>
      <form onSubmit={handleSubmit} className="send-message-form">
        <label>
          Destinataire (Agent):
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Nom de l'agent"
            required
          />
        </label>

        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message ici..."
            required
          ></textarea>
        </label>

        <button type="submit">Envoyer</button>
        {success && <p className="success-msg">Message envoyé avec succès !</p>}
      </form>
    </div>
  );
};

export default SendMessage;
