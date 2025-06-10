import React, { useState } from "react";
import "./PasswordLayout.css";

const PasswordLayout = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas !");
      return;
    }

    // Ici tu peux appeler une API pour changer le mot de passe
    setMessage("Mot de passe changé avec succès !");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="password-layout">
      <h2>Changer le mot de passe</h2>
      <form onSubmit={handleSubmit} className="password-form">
        <label>
          Ancien mot de passe:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Nouveau mot de passe:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirmer le nouveau mot de passe:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Changer</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PasswordLayout;
