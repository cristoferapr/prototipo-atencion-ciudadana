import React from "react";
import "../css/DashHeader.css";

const Header = ({ toggleSidebar }) => {
    return (
      <header className="header">
        {/* Botón de menú hamburguesa para pantallas pequeñas */}
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Dashboard</h1>
        <div className="header-controls">
          <input type="search" placeholder="Search..." className="search-input" />
          <button className="profile-button">Profile</button>
        </div>
      </header>
    );
  };
  
  export default Header;