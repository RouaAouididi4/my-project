import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaGoogle,
  FaEnvelope,
} from "react-icons/fa";
const Footer = () => {
    return (
  
    <div> 
    {/* Footer */}
      <footer className="footer-section bg-dark text-light pt-5 pb-4">
        <div className="container  ">
          <div className="row">
            {/* Column 1 - Brand Info */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="footer-brand">
                <h2 className="text-white mb-3">CasaTech</h2>
                <p className="footer-text">
                  At CasaTech, we are committed to providing exceptional service
                  and support.
                </p>
                <div className="newsletter-form d-flex mt-4">
                  <input
                    type="email"
                    className="form-control me-2"
                    placeholder="Enter Your Email"
                  />
                  <button className="btn btn-outline-light">
                    Discover More
                  </button>
                </div>
                <div className="social-icons mt-4">
                  <a
                    href="https://facebook.com"
                    className="social-icon"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="social-icon"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="social-icon"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://youtube.com"
                    className="social-icon"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-heading mb-4">Quick Links</h5>
              <ul className="footer-links list-unstyled">
                <li className="mb-2">
                  <a href="/about" className="footer-link">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/properties" className="footer-link">
                    Properties
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/Property-Listing" className="footer-link">
                    Listings
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/blog" className="footer-link">
                    Blog News
                  </a>
                </li>
                <li>
                  <a href="/contact" className="footer-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Legal */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-heading mb-4">Legal</h5>
              <ul className="footer-links list-unstyled">
                <li className="mb-2">
                  <a href="/apartment" className="footer-link">
                    Apartment
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/my-house" className="footer-link">
                    My House
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/interiors" className="footer-link">
                    Interiors
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/square-area" className="footer-link">
                    Square Area
                  </a>
                </li>
                <li>
                  <a href="/terms-and-conditions" className="footer-link">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Contact Info */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-heading mb-4">Contact</h5>
              <ul className="footer-contact list-unstyled">
                <li className="mb-3">
                  <FaMapMarkerAlt className="footer-icon me-2" />
                  <a
                    href="https://maps.google.com/?q=Akouda,Sousse,Tunisia"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Akouda, Sousse, Tunisia
                  </a>
                </li>
                <li className="mb-3">
                  <FaPhone className="footer-icon me-2" />
                  <a href="tel:+21612345678" className="footer-link">
                    +216 12 345 678
                  </a>
                </li>
                <li>
                  <FaEnvelope className="footer-icon me-2" />
                  <a
                    href="mailto:contact@agenceimmobilier.com"
                    className="footer-link"
                  >
                    contact@agenceimmobilier.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      </div>
  );
}

export default Footer;
 
