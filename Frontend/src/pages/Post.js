import React, { useState, useRef, useEffect } from "react";
import "./Post.css";
import "leaflet/dist/leaflet.css"; // Importation du style Leaflet
import { useNavigate } from "react-router-dom";

function PostForSaleByOwnerListing() {
  const [photos, setPhotos] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const priceRef = useRef(null);
  const mapRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const sectionRef = useRef(null);
  const unitRef = useRef(null);
  const zipRef = useRef(null);

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  // Check if the user is logged in when the component loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/check", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsUserLoggedIn(data.isAuthenticated);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsUserLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const [formData, setFormData] = useState({
    photo: [],
    price: "",
    streetAddress: "",
    city: "",
    location: { lat: 0, lng: 0 },
    hometype: "",
    title: "",
    beds: "",
    baths: {
      fullBaths: 0,
      threeQuarterBaths: 0,
      halfBaths: 0,
      quarterBaths: 0,
    },
    yearbuilt: "",
    status: "",
    description: "",
    phone: "",
    management: "",
    agreement: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!isUserLoggedIn) {
      alert("You must be logged in to post an ad");
      navigate("/login");
      return;
    }

    // Vérification si l'utilisateur a accepté les termes et conditions
    if (!formData.agreement) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Indiquer que la soumission est en cours
    setIsSubmitting(true);

    // Créer un objet FormData pour envoyer des fichiers et des données sous forme de formulaire
    const formDataToSend = new FormData();

    // Ajouter les fichiers à l'objet FormData
    uploadedFiles.forEach((file) => {
      console.log("Appending file:", file);
      formDataToSend.append("photos", file);
    });

    // Ajouter les autres données du formulaire (à l'exception des photos)
    Object.keys(formData).forEach((key) => {
      if (key !== "photos" && key !== "photo") {
        console.log(`Appending data: ${key} = ${formData[key]}`);
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      // Envoyer la requête POST avec FormData
      const response = await fetch("http://localhost:3001/api/properties/add", {
        method: "POST",
        body: formDataToSend,
      });

      // Vérification si la réponse est OK (status HTTP 2xx)
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Récupérer la réponse du serveur et afficher le message
      const data = await response.json();
      alert("Property added successfully!");

      // Réinitialiser le formulaire après soumission
      setPhotos([]);
      setUploadedFiles([]);
      setFormData({
        price: "",
        streetAddress: "",
        city: "",
        location: { lat: 0, lng: 0 },
        hometype: "",
        title: "",
        beds: "",
        baths: {
          fullBaths: 0,
          threeQuarterBaths: 0,
          halfBaths: 0,
          quarterBaths: 0,
        },
        yearbuilt: "",
        status: "",
        description: "",
        phone: "",
        management: "",
        agreement: false,
      });
    } catch (error) {
      // En cas d'erreur lors de la soumission
      console.error("Error:", error);
      alert("Error submitting form: " + error.message);
    } finally {
      // Indiquer que la soumission est terminée
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    const { streetAddress, city } = formData;

    if (!streetAddress || !city) {
      alert("Street Address and City are required!");
      return;
    }

    console.log("Street Address:", streetAddress);
    console.log("City:", city);

    handleLocationUpdate();
    setIsMapVisible(true);

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleLocationUpdate = () => {
    // Implement your location update logic here
    console.log("Updating location...");
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...fileUrls]);
    setUploadedFiles((prev) => [...prev, ...files]);
    console.log("Photos sélectionnées :", files);
  };

  const handleDeletePhoto = (index) => {
    const newPhotos = [...photos];
    const newFiles = [...uploadedFiles];
    newPhotos.splice(index, 1);
    newFiles.splice(index, 1);
    setPhotos(newPhotos);
    setUploadedFiles(newFiles);
  };

  const handleReorderPhotos = (startIndex, endIndex) => {
    const newPhotos = [...photos];
    const newFiles = [...uploadedFiles];
    const [movedPhoto] = newPhotos.splice(startIndex, 1);
    const [movedFile] = newFiles.splice(startIndex, 1);
    newPhotos.splice(endIndex, 0, movedPhoto);
    newFiles.splice(endIndex, 0, movedFile);
    setPhotos(newPhotos);
    setUploadedFiles(newFiles);
  };

  return (
    <div className="Post">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-4 collapse navbar-collapse justify-content-end">
        <a className="navbar-brand" href="/">
          CasaTech
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/about-us">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/properties">
              Properties
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/listings">
              Listings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/blog-news">
              Blog
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-white" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-slides owl-carousel">
          <div
            className="single-hero-slide"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              width: "100%",
              transition: "background-image 0.5s ease-in-out",
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
                backgroundColor: "rgba(48, 38, 2, 0.21)",
                zIndex: 0,
              }}
            ></div>
            <div
              className="hero-content"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                width: "100%",
                textAlign: "center",
                color: "white",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)",
                padding: "0 20px",
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
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    opacity: 0.8,
                    transition: "all 0.3s",
                    userSelect: "none",
                    color: "#947054",
                  }}
                >
                  ‹
                </span>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2
                    style={{
                      fontSize: "clamp(32px, 6vw, 62px)",
                      fontWeight: "200",
                      letterSpacing: "3px",
                      lineHeight: "1.2",
                      margin: "0 0 10px 0",
                      animation: "fadeIn 1.5s ease-out both",
                    }}
                  >
                    SHARE YOUR REAL ESTATE OFFER
                  </h2>

                  <div className="background-text">
                    <hr className="line" />
                    <div className="input-container">
                      <div className="input-row">
                        <input
                          type="text"
                          name="streetAddress"
                          placeholder="Street Address"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          ref={streetRef}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              unitRef.current.focus();
                            }
                          }}
                          required
                        />
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city || ""}
                          onChange={handleInputChange}
                          ref={cityRef}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              zipRef.current.focus();
                            }
                          }}
                          required
                        />
                      </div>
                      <div className="input-row"></div>
                      <div className="continue-button-container">
                        <button onClick={handleContinue}>
                          ADD NEW LISTING
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <span
                  onClick={goToNextSlide}
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    opacity: 0.8,
                    transition: "all 0.3s",
                    userSelect: "none",
                    color: "#947054",
                  }}
                >
                  ›
                </span>
              </div>
            </div>

            <style data-jsx data-global>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        </div>
      </section>
      <div
        className="listing-box"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>For Sale By Owner Listing</h2>
        <p>
          Post once and your home will be listed on Homz, reaching buyers on the
          largest real estate network on the Web. Plus, home shoppers receive
          emails about new homes on the market - including yours.
        </p>
      </div>

      <div className="container">
        <center>
          <div className="listing-form">
            <div className="facts">Home Facts</div>

            <div className="photos-section">
              <h2>Photos</h2>
              <p>
                Drag and drop to reorder. Click on a photo to add a caption or
                delete a photo.
              </p>

              <div className="photo-upload-area">
                <p>Drag and drop photos here to upload</p>

                <label className="upload-button">
                  Add New Photo
                  <input
                    type="file"
                    multiple
                    onChange={handlePhotoUpload}
                    hidden
                  />
                </label>
              </div>

              <div className="photos-grid">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="photo-item"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("index", index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const startIndex = e.dataTransfer.getData("index");
                      handleReorderPhotos(parseInt(startIndex), index);
                    }}
                  >
                    <img src={photo} alt={`Uploaded ${index}`} />
                    <button
                      className="delete-button"
                      onClick={() => handleDeletePhoto(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="price-box">
              <span className="price-label">Set Your Price :</span>
              <div className="price-input-box">
                <input
                  type="text"
                  className="price-input"
                  name="price"
                  placeholder="0"
                  value={formData.price}
                  ref={priceRef}
                  onChange={handleInputChange}
                />
                <span className="price-currency">DT</span>
              </div>
            </div>
            <div className="form-row">
              <div className="form-section" style={{ width: "70%" }}>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter A Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-section" style={{ width: "30%" }}>
                <label htmlFor="type">Type :</label>
                <select
                  id="type"
                  name="hometype"
                  value={formData.hometype}
                  onChange={handleInputChange}
                >
                  <option value="">Select type</option>
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-section">
                <label>Beds</label>
                <input
                  type="number"
                  placeholder="0"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-section">
                <label>Baths</label>
                <input
                  type="number"
                  placeholder="0"
                  name="baths"
                  value={formData.baths.fullBaths}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      baths: {
                        ...prev.baths,
                        fullBaths: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-section">
                <label>Year Built</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Year Built"
                  name="yearbuilt"
                  value={formData.yearbuilt}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-section">
                <label>Status</label>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-section">
              <label>Describe your home</label>
              <textarea
                placeholder="Tell us about your home"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="filter-row">
              <div className="management-section">
                <label className="management-label">Management</label>
                <div className="checkbox-group">
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      name="management"
                      value="unmanaged"
                      checked={formData.management === "unmanaged"}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Unmanaged
                  </label>
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      name="management"
                      value="managed"
                      checked={formData.management === "managed"}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Managed
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h3>Contact information</h3>
                <input
                  type="tel"
                  placeholder="(216) 00 000 000"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <p className="info-text">
                  Potential buyers will contact you through the email address
                  you use to register on Homz. You must also add your phone
                  number to the listing here.
                </p>
              </div>
            </div>
            <div className="agreement-container">
              <div className="agreement-content">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="agreement-checkbox"
                    checked={formData.agreement}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreement: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="agreement-checkbox">
                    I agree to acknowledge and understand the following:
                  </label>
                </div>
                <ol className="agreement-list">
                  <li>
                    I am (or I have authority to act on behalf of) the owner of
                    this home;
                  </li>
                  <li>
                    I will not provide incorrect information or state a
                    discriminatory preference;
                  </li>
                  <li>
                    I will be posting my property 'for sale by owner' on
                    homz.com and other affiliated websites and that I will
                    solely be responsible for maintaining and updating the
                    posting and responding to and negotiating potential offers
                    to purchase the property;
                  </li>
                  <li>
                    Homz, Inc. ("Homz") is a licensed real estate brokerage,
                    that I am not entering into any agency or brokerage
                    relationship with Homz as part of this posting and that Homz
                    is not providing me with any real estate brokerage services
                    as part of this posting;
                  </li>
                  <li>
                    I will comply with the Homz Terms of Use and Listing Quality
                    Policy.
                  </li>
                </ol>
                <p className="marketing-consent">
                  I also agree that by clicking below, Homz Group and its
                  affiliates, and real estate professionals may call or text me
                  for marketing purposes, which may involve use of automated
                  means and prerecorded/artificial voices. Consent is not a
                  condition of buying any property, goods or services.
                  Message/data rates may apply.
                </p>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="post-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post For Sale By Owner"}
              </button>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default PostForSaleByOwnerListing;
