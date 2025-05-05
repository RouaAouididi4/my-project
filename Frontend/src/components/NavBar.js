import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "../pages/images/8.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      {!scrolled && (
        <div className="top-bar">
          <div className="container">
            <a href="mailto:contact@southernplate.com" className="email">
              CasaTech@gmail.com
            </a>
            <div className="phone">
              <div className="phone-icon"></div>
              <a href="tel:+456775993000223">+216 ** *** ***</a>
            </div>
          </div>
        </div>
      )}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <Link to="/" className="logo">
            <img
              src={logoImage}
              alt="CASATECH real estate agency"
              className="logo-image"
            />
          </Link>

          <div className={`menu ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <a href="/" className="menu-item">
              HOME
            </a>
            <a href="/Services" className="menu-item">
              Services
            </a>
            <a href="/upload" className="menu-item">
              Upload
            </a>
            <a href="/about" className="menu-item">
              About Us
            </a>
            <a href="/Post" className="menu-item">
              Post
            </a>
            <a href="/blog" className="menu-item">
              Blog
            </a>

            <div className="dropdown">
              <button className="menu-item">
                PROPERTIES<span className="arrow">▼</span>
              </button>
              <div className="dropdown-content">
                <Link to="/Property-Listing">Properties-Listing</Link>
                <Link to="/Property-By-Location">Properties-By-Location</Link>
                <Link to="/house-for-sale-or-rent">House-For-Sale-Or-Rent</Link>
              </div>
            </div>

            <a href="/contact" className="menu-item">
              Contact
            </a>
          </div>

          <div className="auth-links">
            <Link to="/profile" className="menu-item">
              PROFILE
            </Link>
            <a href="/login" className="menu-item">
              LOGIN
            </a>
            <a href="/signup" className="menu-item signup">
              SIGNUP
            </a>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>
      </nav>

      <style data-jsx>{`
        .header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
        .top-bar {
          background-color: #000;
          color: white;
          font-size: 13px;
        }
        .email, .phone a { color: white; text-decoration: none; }
        .email:hover, .phone a:hover { color: #ccc; }
        .phone { display: flex; align-items: center; }
        .logo-image {
          height: 100px;
          width: auto;
          max-width: 100px;
          object-fit: contain;
          display: block;
        }
        .logo { display: flex; align-items: center; height: 100%; }
        .phone-icon {
          width: 24px;
          height: 24px;
          background-color: white;
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phone-icon::before { content: "📞"; font-size: 12px; }
        .navbar {
          padding: 0px 0;
          background-color: transparent;
          transition: all 0.3s ease;
        }
        .navbar.scrolled { background-color: #000; }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: 5 15px;
          position: relative;
        }
        .logo { color: white; font-size: 28px; font-weight: bold; text-decoration: none; text-transform: uppercase; }
        .menu {
          display: flex;
          gap: 20px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .menu-item {
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
        }
        .menu-item:hover { color: #ccc; }
        .arrow { margin-left: 5px; font-size: 10px; }
        .auth-links {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .auth-links .menu-item.signup {
          padding: 8px 15px;
          background-color: #fff;
          color: #000;
          border-radius: 4px;
        }
        .auth-links .menu-item.signup:hover {
          background-color: #ddd;
          color: #000;
        }
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #000;
          min-width: 160px;
          box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          z-index: 1;
          padding: 10px 0;
        }
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-content a {
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          display: block;
          text-transform: none;
          font-weight: normal;
        }
        .dropdown-content a:hover { background-color: #333; }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        @media (max-width: 992px) {
          .menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #000;
            padding: 20px;
            gap: 15px;
          }
          .menu.mobile-open { display: flex; }
          .mobile-menu-btn { display: block; }
          .dropdown-content {
            position: static;
            width: 100%;
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
