import React, { useState, useEffect } from "react";
import "./Contact.css";
import contactImage from "./images/cont.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPhone, FaEnvelope } from "react-icons/fa";

function Contact() {
  const [selectedAgent, setSelectedAgent] = useState("");
  const agents = ["Mohammed Nsir", "Achref Aissa", "Hiba Gaîed"]; // 👉 Tu peux changer les noms ici

  const [subject, setSubject] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [expandedId, setExpandedId] = useState(null);

  const data = [
    {
      id: 1,
      question: "What are we working hours?",
      answer:
        "We are open Monday to Friday, 9:00 AM to 6:00 PM. On Saturday, we are open from 9:00 AM to 1:00 PM. Closed on Sunday.",
    },
    {
      id: 2,
      question: "How can I contact you quickly?",
      answer:
        "You can call us at [your phone number] or fill out the contact form. We usually reply within 24 hours.",
    },
    {
      id: 3,
      question: " Where are we located?",
      answer:
        "Our office is at [your address]. You can see the Footer at the bottom of this page.",
    },
    {
      id: 4,
      question: " Can I book an appointment online?",
      answer:
        "Yes, you can book an appointment using the contact form or through our booking page.",
    },
    {
      id: 5,
      question: " How long does it take to get a reply?",
      answer: "We usually reply in 24 to 48 working hours.",
    },
    {
      id: 6,
      question: " What services do you offer?",
      answer:
        "We offer [list of your services, like selling, renting, customer support, etc.]. You can see more on our Services page.",
    },
    {
      id: 7,
      question: "  Can I contact you on social media?",
      answer:
        "Yes! You can message us on [Facebook, Instagram, WhatsApp, etc.]. We will reply as soon as possible.",
    },
  ];

  const toggleSection = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Message sent successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const togglePassword = () => setShowPassword(!showPassword);
  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0
        ? testimonial.length - testimonialsPerPage
        : prev - testimonialsPerPage
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + testimonialsPerPage >= testimonial.length
        ? 0
        : prev + testimonialsPerPage
    );
  };

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

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div>
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
            {/* Overlay sombre */}
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
                {/* Flèche gauche */}
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
                  {/* Titre principal */}
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
                    Connect with Us to Find Your Future Home
                  </h2>
                </div>

                {/* Flèche droite */}
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
          </div>
        </div>
      </section>

      <div className="contact-page">
        <div className="container py-5">
          <div className="row align-items-start">
            {/* Image Section */}
            <div className="col-md-5 mb-4">
              <img
                src={contactImage}
                alt="Contact"
                className="img-fluid rounded shadow-lg contact-image"
              />
            </div>

            {/* Form Section */}
            <div className="col-md-7">
              <div className="contact-forme">
                <h6 className="section-title mb-4">CONTACT INFO</h6>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-7">
                      <label htmlFor="name">Votre Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-7">
                      <label htmlFor="phone">Votre Téléphone</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <FaPhone />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Votre téléphone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-groupcol-md-7">
                    <label htmlFor="subject">Subject:</label>
                    <select
                      id="subject"
                      className="form-control"
                      onChange={(e) => setSubject(e.target.value)}
                      value={subject}
                    >
                      <option value="">Select an option</option>
                      <option value="appointment">
                        Schedule an Appointment
                      </option>
                      <option value="partner">Become a Partner</option>
                    </select>
                  </div>

                  {subject === "appointment" && (
                    <>
                      <div className="form-group col-md-7">
                        <label htmlFor="appointmentDetails">
                          Please describe your request:
                        </label>
                        <textarea
                          className="form-control"
                          id="appointmentDetails"
                          name="appointmentDetails"
                          placeholder="Tell us what this appointment is about..."
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <div className="form-group col-md-7">
                        <label htmlFor="agent">Choose an agent:</label>
                        <select
                          id="agent"
                          className="form-control"
                          value={selectedAgent}
                          onChange={(e) => setSelectedAgent(e.target.value)}
                          required
                        >
                          <option value="">Select an agent</option>
                          {agents.map((agent, index) => (
                            <option key={index} value={agent}>
                              {agent}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {subject === "partner" && (
                    <div className="form-row">
                      <div className="form-group col-md-7">
                        <label htmlFor="company">Company:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          placeholder="Your company name"
                        />
                      </div>
                      <div className="form-group col-md-7">
                        <label htmlFor="businessType">Business Type:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="businessType"
                          placeholder="Your business type"
                        />
                      </div>
                    </div>
                  )}

                  {subject !== "appointment" && (
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        placeholder="Your message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <button type="submit" className="btn south-btn">
                    Send
                  </button>
                </form>
              </div>
            </div>
            {/* FAQ Section */}
            <div className="accordion mt-5">
              <h4 className="mb-3">FAQ'S</h4>
              {data.map((item) => (
                <div key={item.id} className="faq-item mb-3">
                  <div
                    className={`accordion-header ${expandedId === item.id ? "expanded" : ""} d-flex justify-content-between align-items-center`}
                    onClick={() => toggleSection(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <h6 className="mb-0">{item.question}</h6>
                    <span className="toggle-icon">
                      {expandedId === item.id ? "-" : "+"}
                    </span>
                  </div>
                  {expandedId === item.id && (
                    <div className="accordion-content mt-2">
                      <p className="mb-0 fade-in">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
