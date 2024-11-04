// Footer.js
import React from 'react';
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} - Ilustre Municipalidad de Villa Alemana
        </p>
      </div>
    </footer>
  );
};

export default Footer;
