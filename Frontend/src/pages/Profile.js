import React, { useState, useEffect, useRef } from "react";
import {
  FaBell,
  FaHeart,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaLock,
  FaHistory,
} from "react-icons/fa";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { AiFillHeart } from "react-icons/ai";
import image1 from "./images/Listing1.jpg";
import image2 from "./images/Listing2.jpg";
import image3 from "./images/Listing3.jpg";

const Profile = () => {
  const settingsRef = useRef(null);
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const infoRef = useRef(null);
  const favoritesRef = useRef(null);
  const historyRef = useRef(null);
  const [fadingOutId, setFadingOutId] = useState(null);
  const [removedIds, setRemovedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("info");

  const [favoriteProperties, setFavoriteProperties] = useState([
    {
      id: "1",
      price: "2500000 DT",
      location: "Hergla, Cité Nozha",
      image: image1,
    },
    {
      id: "2",
      price: "2500000 DT",
      location: "Kantaoui, Sousse",
      image: image2,
    },
    {
      id: "3",
      price: "800000 DT",
      location: "Rue Orange, Monastir",
      image: image3,
    },
  ]);

  const handleRemoveWithFade = (id) => {
    setFadingOutId(id);
    setTimeout(() => {
      setFavoriteProperties((prev) =>
        prev.filter((property) => property.id !== id)
      );
      setRemovedIds((prev) => [...prev, id]);
      setFadingOutId(null);
    }, 400); // match fade-out duration in CSS
  };

  const [searchHistory, setSearchHistory] = useState([
    {
      id: "1",
      query: "house for sale in Tunis",

      price: "2500000 DT",
      location: "Hergla, Cité Nozha",
      image: image1,
      date: "2025-05-10",
    },
    {
      id: 2,
      query: "apartment for rent Sfax",
      date: "2025-05-25",
      price: "1.500.000 DT",
    },
  ]);

  useEffect(() => {
    console.log(user?.FullName);
  }, []);

  const [formData, setFormData] = useState(() => {
    const { FullName, email, phone, location } = JSON.parse(
      localStorage.getItem("user")
    );

    return {
      FullName,
      email,
      phone,
      location,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  });

  useEffect(() => {
    if (user) {
      setFormData({
        FullName: user.FullName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const scrollToSection = (section) => {
    setActiveSection(section);
    if (section === "info" && infoRef.current) {
      infoRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "favorites" && favoritesRef.current) {
      favoritesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "history" && historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Fetch user profile
        const profileResponse = await fetch("/api/users/me", {
          method: "GET",

          headers: { Authorization: `Bearer ${token}` },
        });

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profileData = await profileResponse.json();
        setFormData({
          FullName: profileData.FullName || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          location: profileData.location || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Fetch favorites
        const favoritesResponse = await fetch("/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (favoritesResponse.ok) {
          const favoritesData = await favoritesResponse.json();
          setFavoriteProperties(favoritesData);
        }

        // Fetch history
        const historyResponse = await fetch("/api/search-history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setSearchHistory(historyData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      // Clear user state and redirect
      setUser(null);
      navigate("/");
    } else {
      alert("Failed to logout. Please try again.");
    }
  };

  const handleScroll = (section) => {
    setActiveSection(section);
    const sectionRef =
      section === "info"
        ? infoRef
        : section === "favorites"
          ? favoritesRef
          : settingsRef;
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <section className="hero">
        <div
          className="single-hero-slide"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          ></div>
          <div
            className="hero-content"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "30px",
              }}
            >
              <span
                onClick={goToPrevSlide}
                style={{ fontSize: "40px", cursor: "pointer", color: "#fff" }}
              >
                ‹
              </span>
              <h2>Your Profile</h2>
              <span
                onClick={goToNextSlide}
                style={{ fontSize: "40px", cursor: "pointer", color: "#fff" }}
              >
                ›
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-wrapper" style={{ marginTop: "100px" }}>
        <div className="sidebar">
          <h2>User Profile </h2>
          <ul>
            <li
              className={activeSection === "info" ? "active" : ""}
              onClick={() => scrollToSection("info")}
            >
              <FaUser /> User info
            </li>
            <li
              className={activeSection === "favorites" ? "active" : ""}
              onClick={() => scrollToSection("favorites")}
            >
              <FaHeart /> Favorites
            </li>
            <li
              className={activeSection === "history" ? "active" : ""}
              onClick={() => scrollToSection("history")}
            >
              <FaHistory /> History
            </li>
            <li>
              <FaCog /> Setting
            </li>
            <li>
              <FaBell /> Notifications
            </li>
          </ul>
          <button className="logout menu-item" onClick={handleLogout}>
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>

        <div className="profile-form">
          <div className="user-header">
            <div className="user-info">
              <h3>{JSON.parse(localStorage.getItem("user")).FullName}</h3>
              <p>{formData.location}</p>
            </div>
          </div>

          <div className="profile-form-content">
            <div ref={infoRef}>
              {activeSection === "info" && (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        name="FullName"
                        value={formData.FullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <h4 className="password-section-title">
                    <FaLock /> Change Password
                  </h4>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </form>
              )}
            </div>

            <section ref={favoritesRef}>
              {activeSection === "favorites" && (
                <div className="section">
                  <h2>Favorite Properties</h2>
                  {favoriteProperties.length === 0 ? (
                    <p>You have no favorite properties.</p>
                  ) : (
                    <div className="favorites-list">
                      {favoriteProperties.map((property) => (
                        <div
                          className={`favorite-card ${fadingOutId === property._id ? "fade-out" : ""}`}
                          key={property._id}
                        >
                          <img
                            src={property.image || "/default-house.jpg"}
                            alt={property.title}
                            className="favorite-image"
                          />
                          <div className="favorite-details">
                            <h4>{property.title}</h4>
                            <p>{property.location}</p>
                            <p>{property.price}</p>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveWithFade(property.id)}
                              title="Remove from Favorites"
                              aria-label="Remove from Favorites"
                            >
                              <AiFillHeart color="red" size={24} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Settings Section */}
            <section ref={settingsRef}>
              {activeSection === "settings" && (
                <div className="section">
                  <h2>Account Settings</h2>
                  <p>Settings functionality will be added soon.</p>
                </div>
              )}
            </section>

            <div ref={historyRef}>
              {activeSection === "history" && (
                <div className="history-section">
                  <h3>Your Search History</h3>
                  {searchHistory.length === 0 ? (
                    <p>No history found.</p>
                  ) : (
                    <ul className="history-list">
                      {searchHistory.map((item) => (
                        <li key={item.id} className="history-item">
                          <strong>{item.query}</strong>

                          <span className="history-date">{item.date}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
