import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaShieldAlt,
  FaUsers,
  FaAward,
} from "react-icons/fa";
import "./About.css";

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [formData, setFormData] = React.useState({
    streetAddress: "",
    city: "",
  });
  const images = [
    "img/bg-img/hero1.jpg",
    "img/bg-img/hero2.jpg",
    "img/bg-img/hero3.jpg",
  ];

  const sectionRef = React.useRef(null);
  const streetRef = React.useRef(null);
  const unitRef = React.useRef(null);
  const cityRef = React.useRef(null);
  const zipRef = React.useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    console.log("Form submitted", formData);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
      { threshold: 0.1 } // Déclenche quand 10% de l'élément est visible
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
  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);
  return (
    <div className="container-fluid about-container py-5">
      <section className="hero">
        <div className="hero-slides owl-carousel">
          <div
            className="single-hero-slide"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              backgroundRepeat: "no-repeat",
              height: "100vh",
              marginLeft: "-30px",
              // Right: "20px",

              transition: "background-image 0.5s ease-in-out", // Ajoutez cette ligne

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
                    marginTop: "200px",

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
                      margin: "200px 0 10px 0",
                      animation: "fadeIn 1.5s ease-out both",
                    }}
                  >
                    Our story began with a key.
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
                    marginTop: "200px",
                    color: "#947054",
                  }}
                >
                  ›
                </span>
              </div>
            </div>

            {/* Animation minimaliste */}
            <style jsx global>{`
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
      {/* Header Section */}
      <div className="background-text">
        <div className="input-container1">
          <center>
            <p className="lead">
              What began as a small, family-run business driven by a deep
              commitment to trust and service has grown into a recognized and
              respected real estate agency. From our humble beginnings, we've
              built a reputation in the community for dedication, integrity, and
              a passion for helping people find the right place to call home.
              Today, our agency continues to thrive by putting clients first and
              offering personalized, reliable real estate solutions.
            </p>
          </center>
        </div>
      </div>
      {/* History Section */}
      <section className="history-section">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1600585152220-90363fe7e115"
              alt="Our first shop"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h2 className="display-5 fw-bold mb-4">Our Humble Beginnings</h2>
            <p className="lead">
              Founded in 1964 by John and Mary Smith, our journey began in a
              small family office at the heart of the city. Driven by a passion
              for service and a genuine desire to help, we gradually grew into a
              trusted real estate agency serving the entire region.
            </p>
            <p>
              While staying true to our family values, we've embraced the
              evolving real estate landscape. Every team member is trained in
              both traditional property practices and the latest digital tools,
              ensuring a modern, personalized, and reliable experience for every
              client.
            </p>
          </div>
        </div>
      </section>
      ro
      {/* Values Section */}
      <section className="values-section my-5 py-5">
        <h2 className="text-center display-4 fw-bold mb-5">Our Core Values</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="icon mb-3">
                  <FaShieldAlt className="fs-1 text-primary" />
                </div>
                <h3 className="card-title fs-3 fw-bold mb-3">Integrity</h3>
                <p className="card-text">
                  We conduct all our business with honesty and transparency,
                  building trust with every client interaction.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="icon mb-3">
                  <FaUsers className="fs-1 text-primary" />
                </div>
                <h3 className="card-title fs-3 fw-bold mb-3">Client Focus</h3>
                <p className="card-text">
                  Your needs come first. We listen carefully to understand your
                  goals and provide personalized solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 p-4 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="icon mb-3">
                  <FaAward className="fs-1 text-primary" />
                </div>
                <h3 className="card-title fs-3 fw-bold mb-3">Excellence</h3>
                <p className="card-text">
                  With decades of experience, we bring unmatched expertise to
                  every transaction, ensuring outstanding results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="team-section t">
        <h2 className="text-center display-4 fw-bold mb-5">Meet Our Team</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-md-3">
            <div className="card h-100 border-0">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="card-img-top rounded-circle w-50 mx-auto mt-3"
                alt="Team member"
              />
              <div className="card-body text-center">
                <h3 className="fs-4 fw-bold">Anas Brahem</h3>
                <p className="text-muted">Senior Real Estate Agent</p>
                <p className="small">25 years experience</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 border-0">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="card-img-top rounded-circle w-50 mx-auto mt-3"
                alt="Team member"
              />
              <div className="card-body text-center">
                <h3 className="fs-4 fw-bold">Maram Aouididi</h3>
                <p className="text-muted">Property Specialist</p>
                <p className="small">15 years experience</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card h-100 border-0">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                className="card-img-top rounded-circle w-50 mx-auto mt-3"
                alt="Team member"
              />
              <div className="card-body text-center">
                <h3 className="fs-4 fw-bold">Mohammed Chouk</h3>
                <p className="text-muted">Commercial Specialist</p>
                <p className="small">10 years experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="cta-section text-center my-5 py-5">
        <h2 className="display-5 fw-bold mb-4">
          Ready to Find Your Dream Home?
        </h2>
        <button className="btn btn-primary btn-lg px-5 py-3 fw-bold">
          CONTACT US TODAY
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
