import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
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
import Details from "./pages/Details";
import Upload from "./pages/upload";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import ForgotPassword from './ForgotPassword/ForgotPassword';
import CheckEmail from './ForgotPassword/CheckEmail';
import ResetPassword from './ForgotPassword/ResetPassword';


function App() {
  return (
    <>
      <Preloader />
      <NavBar />
      <div className="app-container p-4 bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Property-Listing" element={<PropertyListing />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/House-For-Sale-Or-Rent" element={<HouseForSaleOrRent />} />
          <Route path="/Property-By-Location" element={<PropertyByLocation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
     <Footer/>
    </>
  );
}

export default App;
