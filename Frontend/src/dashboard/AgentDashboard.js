import { useState } from "react";
import { useAuth } from "../context/auth";
import "./AgentDashboard.css";
import { useNavigate } from "react-router-dom";
import ClientManagement from "./../pages/ClientManagement";
import PropertyLayout from "../pages/PropertyLayout";
import HistoryLayout from "../pages/HistoryLayout";
import PasswordLayout from "../pages/PasswordLayout";
import AgentsLayout from "../pages/AgentsLayout";

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("clients");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "clients":
        return <ClientManagement />;
      case "properties":
        return (
          <div>
            <PropertyLayout />
          </div>
        );

      case "history":
        return (
          <div>
            <HistoryLayout />
          </div>
        );
      case "password":
        return (
          <div>
            <PasswordLayout />
          </div>
        );
      case "agents":
        return (
          <div>
            <AgentsLayout />
          </div>
        );
      default:
        return <ClientManagement />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo-container">
          <ion-icon name="business-outline"></ion-icon>
          <span>CasaTech</span>
        </div>

        <nav>
          <button
            onClick={() => setActiveTab("clients")}
            className={activeTab === "clients" ? "active" : ""}
          >
            <ion-icon name="person-outline"></ion-icon>
            <span>Clients</span>
          </button>

          <button
            onClick={() => setActiveTab("properties")}
            className={activeTab === "properties" ? "active" : ""}
          >
            <ion-icon name="home-outline"></ion-icon>
            <span>Properties</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={activeTab === "history" ? "active" : ""}
          >
            <ion-icon name="list-circle-outline"></ion-icon>
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={activeTab === "password" ? "active" : ""}
          >
            <ion-icon name="lock-closed-outline"></ion-icon>
            <span>Password</span>
          </button>

          <button
            onClick={() => setActiveTab("agents")}
            className={activeTab === "agents" ? "active" : ""}
          >
            <ion-icon name="people-outline"></ion-icon>
            <span>Agents</span>
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

export default AgentDashboard;
