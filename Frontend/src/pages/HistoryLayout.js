// HistoryLayout.jsx
import React from "react";
import { FaHistory } from "react-icons/fa";
import "./HistoryLayout.css"; // We'll create this CSS file next

const HistoryLayout = ({ searchHistory = [] }) => {
  return (
    <div className="history-layout">
      <div className="history-header">
        <FaHistory className="history-icon" />
        <h2>Your Search History</h2>
      </div>

      {!searchHistory || searchHistory.length === 0 ? (
        <p className="no-history">No history found.</p>
      ) : (
        <ul className="history-list">
          {searchHistory.map((item) => (
            <li key={item.id} className="history-item">
              <div className="history-content">
                <strong className="history-query">{item.query}</strong>
                {item.price && (
                  <span className="history-price">{item.price}</span>
                )}
                {item.title && (
                  <span className="history-title">{item.title}</span>
                )}
              </div>
              <span className="history-date">{item.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
HistoryLayout.defaultProps = {
  searchHistory: [],
};
export default HistoryLayout;
