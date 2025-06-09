import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Activate from "./pages/Activate";
import Home from "./pages/Home";
import About from "./pages/About";
import PropertyListing from "./pages/PropertyListing";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Preloader from "./components/Preloader";
import Post from "./pages/Post";
import PropertyByLocation from "./pages/PropertyByLocation";
import HouseForSaleOrRent from "./pages/HouseForSaleOrRent";
import AdminDashboard from "./dashboard/AdminDashboard";
import AgentDashboard from "./dashboard/AgentDashboard";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ClientManagement from "./pages/ClientManagement";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import CodeVerif from "./pages/CodeVerif";
import { AuthProvider, useAuth } from "./context/auth"; // Import AuthProvider ET useAuth
import EmailVerification from "./pages/EmailVerification";
import AgentLayout from "./components/layout/AgentLayout";
import AuthLayout from "./components/layout/AuthLayout";
import { useNavigate } from "react-router-dom";

function AppContent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    handleStorageChange();
  }, []);

  return (
    <>
      {!user && <NavBar />}

      <div className="app-container p-4 bg-gray-100">
        <Routes>
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/CodeVerif" element={<CodeVerif />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<AuthLayout />}>
            <Route path="/Post" element={<Post />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/agent" element={<AgentLayout />}>
              <Route index element={<AgentDashboard />} />
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route index element={<div>Default dashboard content</div>} />
              <Route path="users" element={<ClientManagement />} />
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
      <div>
        <Routes>
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <AppContent />
    </>
  );
}

export default App;
