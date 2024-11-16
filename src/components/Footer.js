// Footer.js
import React from 'react';
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          {new Date().getFullYear()} - Antencion Ciudadana Web
        </p>
      </div>
    </footer>
  );
};

export default Footer;
