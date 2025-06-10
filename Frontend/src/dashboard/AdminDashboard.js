import { useState } from "react";
import { useAuth } from "../context/auth";
import "./AdminDashboard.css";
import { useNavigate, Link } from "react-router-dom";

import ClientManagement from "../pages/ClientManagement";

import HistoryCLayout from "../pages/HistoryCLayout";
import HistoryLayout from "../pages/HistoryLayout";
import SendMessage from "../pages/SendMessage";
import AgentLayout from "../pages/AgentsLayout";
import PropertyLayout from "../pages/PropertyLayout";

const AdminDashboard = () => {
  // Correction: on utilise "users" comme clé cohérente partout
  const [activeTab, setActiveTab] = useState("users");
  const { logout } = useAuth();

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <ClientManagement />;
      case "agents":
        return <AgentLayout />;
      case "properties":
        return <PropertyLayout />;
      case "clientHistory":
        return <HistoryCLayout />;
      case "agentHistory":
        return <HistoryLayout />;
      case "messages":
        return <SendMessage />;
      default:
        return <ClientManagement />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo-container">
          {/* Pour ion-icons (voir remarque ci-dessous) */}
          <ion-icon name="settings-outline"></ion-icon>
          <span>Admin Panel</span>
        </div>

        <nav>
          <button
            onClick={() => setActiveTab("users")}
            className={activeTab === "users" ? "active" : ""}
          >
            <ion-icon name="person-outline"></ion-icon>
            <span>Manage Clients</span>
          </button>

          <button
            onClick={() => setActiveTab("agents")}
            className={activeTab === "agents" ? "active" : ""}
          >
            <ion-icon name="people-outline"></ion-icon>
            <span>Manage Agents</span>
          </button>

          <button
            onClick={() => setActiveTab("properties")}
            className={activeTab === "properties" ? "active" : ""}
          >
            <ion-icon name="home-outline"></ion-icon>
            <span>Manage Properties</span>
          </button>

          <button
            onClick={() => setActiveTab("clientHistory")}
            className={activeTab === "clientHistory" ? "active" : ""}
          >
            <ion-icon name="time-outline"></ion-icon>
            <span>Client History</span>
          </button>

          <button
            onClick={() => setActiveTab("agentHistory")}
            className={activeTab === "agentHistory" ? "active" : ""}
          >
            <ion-icon name="document-text-outline"></ion-icon>
            <span>Agent History</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={activeTab === "messages" ? "active" : ""}
          >
            <ion-icon name="chatbox-ellipses-outline"></ion-icon>
            <span>Messages</span>
          </button>

          <button className="logout-btn" onClick={logoutHandler}>
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="content-header">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </header>

        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
