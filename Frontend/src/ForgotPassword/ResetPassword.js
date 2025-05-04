import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="auth-screen">
      <h1>Reset password</h1>
      <p className="instruction-text">Please send your post now password.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-section">
          <label>New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="password-input"
          />
          <div className="password-strength">Password strength: breakers</div>
        </div>
        
        <div className="input-section">
          <label>Re-enter password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password-input"
          />
        </div>
        
        <button type="submit" className="submit-button">Send Email</button>
      </form>
    </div>
  );
};

export default ResetPassword;