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
  const [validationResults, setValidationResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  const zipRef = useRef(null);

  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

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
    beds: "",
    baths: "",
    yearbuilt: "",
    status: "",
    description: "",
    phone: "",
    management: "",
    agreement: false,
    // features object
    features: {
      garden: false,
      parking: false,
      swimmingPool: false,
      balcony: false,
      balconyLocation: "",
      designType: "",
    },
    Kitchen: {
      kitchenCount: 0,
      types: [],
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...fileUrls]);
    setUploadedFiles((prev) => [...prev, ...files]);
    setValidationResults([]); // Reset validation results when new images are uploaded
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

  const validateImages = async () => {
    if (uploadedFiles.length === 0) {
      setMessage("Veuillez télécharger au moins une image");
      return false;
    }

    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      uploadedFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Simuler l'appel API - remplacer par votre véritable appel API
      const response = await fetch(
        "http://localhost:3001/api/images/validate",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setValidationResults(data.images);

      // Vérifier si toutes les images sont valides
      const allValid = data.images.every((img) => img.isValid);
      if (!allValid) {
        setMessage(
          "Certaines images ne sont pas valides. Veuillez les corriger."
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Erreur lors de la validation des images:", error);
      setMessage("Erreur lors de la validation des images: " + error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData?.agreement) {
      alert("Veuillez accepter les termes et conditions");
      return;
    }

    // Valider d'abord les images
    // const imagesValid = await validateImages();
    // if (!imagesValid) {
    //   return;
    // }

    setIsSubmitting(true);

    const formDataToSend = new FormData();

    // Ajouter les fichiers photos
    uploadedFiles.forEach((file) => {
      formDataToSend.append("photos", file);
    });

    if (
      !formData.price ||
      !formData.streetAddress ||
      !formData.city ||
      !formData.hometype ||
      !formData.management ||
      !formData.phone
    ) {
      alert("field is required");
      setLoading(false);
      return;
    }

    // Ajouter les champs un par un, en adaptant les noms aux exigences du backend
    formDataToSend.append("price", formData.price);
    formDataToSend.append("streetAddress", formData.streetAddress);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("type", formData.type || "rent");
    formDataToSend.append("homeType", formData.hometype); // ✅ clé correcte

    formDataToSend.append("size", formData.size || "100"); // Valeur par défaut si vide
    formDataToSend.append("yearbuilt", formData.yearbuilt || "2000"); // par défaut
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("agreement", formData.agreement || false);

    // Adapter les noms de champs pour le backend
    formDataToSend.append("bedrooms", formData.beds); // beds devient bedrooms

    // Convertir les différentes salles de bains en un total
    const totalBaths = Object.values(formData.baths).reduce(
      (sum, val) => sum + Number(val),
      0
    );
    formDataToSend.append("bathrooms", totalBaths);

    // Normaliser la casse du champ management (par exemple : "Unmanaged" ou "Managed")
    const managementFormatted =
      formData.management.charAt(0).toUpperCase() +
      formData.management.slice(1).toLowerCase();
    formDataToSend.append("management", managementFormatted);

    console.log("Contenu de formDataToSend:");
    for (const pair of formDataToSend.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch("http://localhost:3001/api/properties/add", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      alert("Annonce ajoutée avec succès ✅");

      // Réinitialiser les champs
      setPhotos([]);
      setUploadedFiles([]);
      setFormData({
        price: "",
        streetAddress: "",
        city: "",
        location: { lat: 0, lng: 0 },
        hometype: "",
        type: "",
        beds: "",
        baths: "",
        yearbuilt: "",
        status: "",
        description: "",
        phone: "",
        management: "",
        agreement: false,
        swimmingPool: false,
      });
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de la soumission : " + error.message);
    } finally {
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
              backgroundImage: ` url(${images[currentIndex]})`,
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
                          required
                          type="text"
                          name="streetAddress"
                          placeholder="Street Address"
                          value={formData?.streetAddress ?? ""}
                          onChange={handleInputChange}
                          ref={streetRef}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              unitRef.current.focus();
                            }
                          }}
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
                  {validationResults[index] && (
                    <div
                      className={`validation-badge ${validationResults[index].isValid ? "valid" : "invalid"}`}
                    >
                      {validationResults[index].isValid ? "✓" : "✗"}
                      {!validationResults[index].isValid && (
                        <span className="validation-message">
                          {validationResults[index].message}
                        </span>
                      )}
                    </div>
                  )}
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePhoto(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            {message && (
              <div
                className={`message ${message.includes("Erreur") ? "error" : "success"}`}
              >
                {message}
              </div>
            )}
          </div>
          <div className="price-box">
            <span className="price-label">Set Your Price*:</span>
            <div className="price-input-box">
              <input
                required
                type="number"
                className="price-input"
                name="price"
                placeholder="0"
                value={formData?.price ?? ""}
                ref={priceRef}
                onChange={handleInputChange}
              />
              <span className="price-currency">DT</span>
            </div>
          </div>
          <div className="form-row">
            <div className="form-section" style={{ width: "70%" }}>
              <label>Type of property*:</label>
              <select
                name="hometype"
                value={formData.hometype}
                onChange={handleInputChange}
              >
                <option value="">-- Choose a type --</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div className="form-section" style={{ width: "30%" }}>
              <label htmlFor="type">Type*:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Select type:</option>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label>Beds*:</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                name="beds"
                value={formData.beds}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-section">
              <label>Baths*:</label>
              <input
                type="number"
                min="0"
                placeholder="0"
                name="baths"
                value={formData.baths.fullBaths}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const safeValue = isNaN(value) || value < 0 ? 0 : value;

                  setFormData((prev) => ({
                    ...prev,
                    baths: {
                      ...prev.baths,
                      fullBaths: safeValue,
                    },
                  }));
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label>Kitchen*:</label>
              <input
                type="number"
                placeholder="0"
                name="kitchenCount"
                className="kitchen-count-input"
                value={formData.Kitchen?.kitchenCount || 0}
                onChange={(e) => {
                  const rawCount = parseInt(e.target.value);
                  const count = isNaN(rawCount) ? 0 : Math.max(0, rawCount); // لا قيم سالبة

                  setFormData((prev) => {
                    const prevTypes = prev.Kitchen?.types || [];

                    const newTypes = [
                      ...prevTypes.slice(0, count),
                      ...Array(Math.max(count - prevTypes.length, 0)).fill(""),
                    ];

                    return {
                      ...prev,
                      Kitchen: {
                        ...prev.Kitchen,
                        kitchenCount: count,
                        types: newTypes,
                      },
                    };
                  });
                }}
              />

              {formData.Kitchen?.kitchenCount > 0 &&
                formData.Kitchen.types.map((type, index) => (
                  <div className="kitchen-type-select" key={index}>
                    <label>Kitchen {index + 1} Type:</label>
                    <select
                      value={formData.Kitchen.types[index] || ""}
                      onChange={(e) => {
                        const updatedTypes = [...formData.Kitchen.types];
                        updatedTypes[index] = e.target.value;

                        setFormData((prev) => ({
                          ...prev,
                          Kitchen: {
                            ...prev.Kitchen,
                            types: updatedTypes,
                          },
                        }));
                      }}
                    >
                      <option value="">-- Select Type --</option>
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  </div>
                ))}
            </div>

            <div className="form-section">
              <label>Year Built*:</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Year Built"
                name="yearbuilt"
                value={formData.yearbuilt}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="filter-row">
            <div className="management-section">
              <label className="management-label">Management*:</label>
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
              <h3>Contact information*:</h3>
              <input
                type="tel"
                placeholder="(216) 00 000 000"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <p className="info-text">
                Potential buyers will contact you through the email address you
                use to register on Homz. You must also add your phone number to
                the listing here.
              </p>
            </div>
          </div>
          <div className="form-section">
            <label className="management-label">Features:</label>

            <div className="checkbox-group">
              {/* Garden */}
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData?.features?.garden}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        garden: e.target.checked,
                      },
                    }))
                  }
                />
                <span className="checkmark"></span>
                Garden
              </label>

              {/* Parking */}
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData?.features?.parking}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        parking: e.target.checked,
                      },
                    }))
                  }
                />
                <span className="checkmark"></span>
                Parking
              </label>

              {/* swimming pool */}
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData?.features?.["swimming-pool"]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        "swimming-pool": e.target.checked,
                      },
                    }))
                  }
                />
                <span className="checkmark"></span>
                swimming pool
              </label>

              {/* Balcony */}
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData?.features?.balcony}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        balcony: e.target.checked,
                        balconyLocation: e.target.checked ? [] : [], // Reset to empty array if unchecked
                      },
                    }))
                  }
                />
                <span className="checkmark"></span>
                Balcony
              </label>

              {/* Balcony Locations if Balcony is selected */}
              {formData?.features?.balcony && (
                <div>
                  <label>Balcony Location:</label>
                  <div>
                    {["living", "bedrooms", "kitchen", "other"].map(
                      (location) => (
                        <label key={location} className="checkbox-option">
                          <input
                            type="checkbox"
                            checked={formData?.features?.balconyLocation.includes(
                              location
                            )}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const value = location;
                              setFormData((prev) => {
                                const updatedLocations = checked
                                  ? [...prev.features.balconyLocation, value]
                                  : prev.features.balconyLocation.filter(
                                      (loc) => loc !== value
                                    );

                                return {
                                  ...prev,
                                  features: {
                                    ...prev.features,
                                    balconyLocation: updatedLocations,
                                  },
                                };
                              });
                            }}
                          />
                          <span className="checkmark"></span>
                          {location === "living"
                            ? "In the living room"
                            : location === "bedrooms"
                              ? "In the bedrooms"
                              : location === "kitchen"
                                ? "In the kitchen"
                                : "Other"}
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Desegin Type */}
              <div>
                <label>Desegin Type*:</label>
                <select
                  value={formData?.features?.designType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        designType: e.target.value,
                      },
                    }))
                  }
                >
                  <option value="">-- Select Type --</option>
                  <option value="modern">Modern</option>
                  <option value="traditional">Traditional</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="agreement-container">
          <div className="agreement-content">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="agreement-checkbox"
                checked={formData?.agreement}
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
                Property Information All property details must be true and
                accurate. Do not post fake or misleading information. Listings
                with wrong or suspicious info will be removed.
              </li>
              <li>
                Ownership and Authorization You confirm that you are the owner
                of the property or have legal authorization to post this
                property for sale or rent.
              </li>
              <li>
                Monthly Subscription Required To post a property, you must
                subscribe to a monthly plan. The subscription costs 10 TND per
                month. Payment is made online by credit or debit card. The
                subscription is valid until: The property is sold, Or you remove
                the listing yourself. You must pay again if you want to post a
                new property after that.
              </li>
              <li>
                You Must Be the Owner or Authorized You can only post a property
                if: You own it, Or you have permission from the owner to post
                it.
              </li>
              <li>
                Contact If you have any questions, contact us: 📧
                contact@agenceimmobilier.com
              </li>
                         
            </ol>

            <p className="marketing-consent">
              I also agree that by clicking below, CasaTech Group and its
              affiliates, and real estate professionals may call or text me for
              marketing purposes, which may involve use of automated means and
              prerecorded/artificial voices. Consent is not a condition of
              buying any property, goods or services. Message/data rates may
              apply.
            </p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="post-button"
            disabled={isSubmitting || loading}
          >
            {isSubmitting
              ? "Posting..."
              : loading
                ? "Validating images..."
                : "Post For Sale By Owner"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .validation-badge {
          position: absolute;
          top: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
        }

        .validation-badge.valid {
          background-color: #4caf50;
        }

        .validation-badge.invalid {
          background-color: #f44336;
        }

        .validation-message {
          position: absolute;
          bottom: -25px;
          left: 0;
          background: #f44336;
          color: white;
          padding: 5px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
        }

        .message {
          margin-top: 20px;
          padding: 10px;
          border-radius: 4px;
        }

        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
}

export default PostForSaleByOwnerListing;
