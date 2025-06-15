import React, { useEffect, useState } from "react";
import "./AgentLayout.css";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useLocation } from "react-router-dom";

const AgentLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const [user, setUser] = useState();

  const logoutHandler = () => {
    logout();
    navigate("/login");
    location.reload();
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    handleStorageChange();
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="agent-layout container py-5">
      <div className="sidebar">
        <div className="logo-container">
          <ion-icon name="business-outline"></ion-icon>
          <span>CasaTech</span>
        </div>

        <nav>
          <button
            onClick={() => navigate("/agent/users")}
            className={
              routerLocation?.pathname === "/agent/users" ? "active" : ""
            }
          >
            <ion-icon name="person-outline"></ion-icon>
            <span>Clients</span>
          </button>

          <button
            onClick={() => navigate("/agent/properties")}
            className={
              routerLocation?.pathname === "/agent/properties" ? "active" : ""
            }
          >
            <ion-icon name="home-outline"></ion-icon>
            <span>Properties</span>
          </button>

          <button
            onClick={() => navigate("/agent/history-clients")}
            className={
              routerLocation?.pathname === "/agent/history-clients"
                ? "active"
                : ""
            }
          >
            <ion-icon name="list-circle-outline"></ion-icon>
            <span>History Clients</span>
          </button>

          <button
            onClick={() => navigate("/agent/history-agents")}
            className={
              routerLocation?.pathname === "/agent/history-agents"
                ? "active"
                : ""
            }
          >
            <ion-icon name="list-circle-outline"></ion-icon>
            <span>History Agents</span>
          </button>

          <button
            onClick={() => navigate("/agent/password")}
            className={
              routerLocation?.pathname === "/agent/password" ? "active" : ""
            }
          >
            <ion-icon name="lock-closed-outline"></ion-icon>
            <span>Password</span>
          </button>

          <button
            onClick={() => navigate("/agent/agents")}
            className={
              routerLocation?.pathname === "/agent/agents" ? "active" : ""
            }
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

        <Outlet />
      </div>
    </div>
  );
};

export default AgentLayout;
