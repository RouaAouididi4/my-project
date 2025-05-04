// /src/components/PropertyDetails.jsx

import React from 'react';
import './PropertyDetails.css';

function PropertyDetails({ property, agent }) {
  return (
    <div className="property-details-container">
      {/* Left Column */}
      <div className="property-main">
        <h2 className="price">${property.price.toLocaleString()}</h2>
        <h1 className="title">{property.title}</h1>
        <p className="address">{property.address}</p>
        <p className="description">{property.description.repeat(1 )}</p>
        <p className="description">{property.features.join(', ')}</p>
        <div className="icons-row">
          <span>🛁 2</span>
          <span>🛏 2</span>
          <span>📐 120 sq ft</span>
        </div>

        <ul className="features-list">
          {[...new Set([...property.features, ...property.features])].map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className="action-buttons">
          <button className="btn-outline">SEE FLOOR PLANS</button>
          <button className="btn-dark">CALCULATE MORTGAGE</button>
        </div>
      </div>

      {/* Right Column */}
      <div className="agent-card">
        <img src={agent.photo} alt={agent.name} className="agent-photo" />
        <h3>{agent.name}</h3>
        <p className="agent-role">{agent.role}</p>
        <p>📞 {agent.phone}</p>
        <p>📧 {agent.email}</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="Your Number" />
          <input type="email" placeholder="Your Email" />
          <textarea rows="4" placeholder="Your Message"></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
}

export default PropertyDetails;
