import { useState } from "react";
import { useAuth } from "../context/auth";
import "./AgentDashboard.css";
import { useNavigate } from "react-router-dom";
import ClientManagement from "./../pages/ClientManagement";
import PropertyLayout from "../pages/PropertyLayout";
import HistoryLayout from "../pages/HistoryLayout";
import PasswordLayout from "../pages/PasswordLayout";
import AgentsLayout from "../components/layout/AgentLayout";

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("clients");

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
      <div className="content-area">{renderContent()}</div>
    </div>
  );
};

export default AgentDashboard;
