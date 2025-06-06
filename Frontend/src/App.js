import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBar2 from "./components/NavBar2";
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
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import CodeVerif from "./pages/CodeVerif";
import { AuthProvider, useAuth } from "./context/auth"; // Import AuthProvider ET useAuth
import EmailVerification from "./pages/EmailVerification";

function AppContent() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hideNavAndFooter = location.pathname === "/AdminDashboard";
  console.log("User in AppContent:", user);
  const renderNavBar = () => {
    if (!user || !user.role) return <NavBar />;
    if (user.role === "client")
      return <NavBar2 user={user} onLogout={logout} />;
    return null; // admin ou agent → pas de navbar (ou ajouter DashboardNav ici)
  };
  return (
    <>
      {!hideNavAndFooter && renderNavBar()}

      <div className="app-container p-4 bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Property-Listing" element={<PropertyListing />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AgentDashboard" element={<AgentDashboard />} />
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify/:token" element={<EmailVerification />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/CodeVerif" element={<CodeVerif />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Route admin dashboard ici */}
          {/* <Route path="/AdminDashboard" element={<AdminDashboard />} /> */}
        </Routes>
      </div>

      {!hideNavAndFooter && <Footer />}
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
