import React, { useEffect, useState } from 'react';
import './HistoryPage.css'; 

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setHistoryData(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/user/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setHistoryData(historyData.filter(item => item._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  if (loading) return <div className="history-container">⏳ Loading...</div>;

  return (
    <div className="history-container">
      <h1 className="history-title">🕓 My Activity History</h1>
      {historyData.length === 0 ? (
        <p className="no-history">No history available.</p>
      ) : (
        <div className="history-list">
          {historyData.map((item) => (
            <div key={item._id} className="history-card">
              <div className="history-info">
                <h3 className="history-item-title">{item.title}</h3>
                <p className="history-date">📅 {new Date(item.date).toLocaleString()}</p>
                <p>📌 Status: <strong>{item.status}</strong></p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
