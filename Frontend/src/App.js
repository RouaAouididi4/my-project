import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Composants
import NavBar from "./components/NavBar";
import ClientNavbar from "./components/ClientNavbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import PropertyListing from "./pages/PropertyListing";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Activate from "./pages/Activate";
import Post from "./pages/Post";
import PropertyByLocation from "./pages/PropertyByLocation";
import HouseForSaleOrRent from "./pages/HouseForSaleOrRent";
import AdminDashboard from "./dashboard/AdminDashboard";
import AgentDashboard from "./dashboard/AgentDashboard";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import ClientManagement from "./pages/ClientManagement";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import CodeVerif from "./pages/CodeVerif";
import EmailVerification from "./pages/EmailVerification";
import SendMessage from "./pages/SendMessage";
import HistoryCLayout from "./pages/HistoryCLayout";
import HistoryLayout from "./pages/HistoryLayout";

// Layouts
import AgentLayout from "./components/layout/AgentLayout";
import AdminLayout from "./components/layout/AdminLayout";
import AuthLayout from "./components/layout/AuthLayout";
import PropertyLayout from "./pages/PropertyLayout";
import PasswordLayout from "./pages/PasswordLayout";
import Agents from "./pages/agents/agents";

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session when component mounts
    const checkSession = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/auth/test-session",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Session check failed");
        }

        const data = await response.json();

        // Update user state based on response
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Or your preloader component
  }

  return (
    <>
      {!user && <NavBar />}
      {user && user.role === "client" && <ClientNavbar />}

      <div className="app-container p-4 bg-gray-100">
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/Property-Listing" element={<PropertyListing />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/House-For-Sale-Or-Rent"
            element={<HouseForSaleOrRent />}
          />
          <Route
            path="/Property-By-Location"
            element={<PropertyByLocation />}
          />
          <Route path="/activate" element={<Activate />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/CodeVerif" element={<CodeVerif />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Routes protégées */}
          <Route element={<AuthLayout />}>
            <Route path="/Post" element={<Post />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />

            {/* Routes Agent/Admin */}
            <Route path="/agent" element={<AgentLayout />}>
              <Route path="agent-dashboard" element={<AgentDashboard />} />
              <Route path="users" element={<ClientManagement />} />
              <Route path="send-message" element={<SendMessage />} />
              <Route path="admin-dashboard" element={<AdminDashboard />} />
              <Route path="properties" element={<PropertyLayout />} />
              <Route path="history-clients" element={<HistoryCLayout />} />
              <Route path="history-agents" element={<HistoryLayout />} />
              <Route path="password" element={<PasswordLayout />} />
              <Route path="agents" element={<Agents />} />
            </Route>
          </Route>
        </Routes>
      </div>

      {!user && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <Preloader />
      <AppContent />
    </>
  );
}

export default App;
