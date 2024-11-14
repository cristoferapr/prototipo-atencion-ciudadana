
// Sidebar.js
import React from "react";
import "../css/DashSidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleSidebar}>
        &times;
      </button>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>Overview</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;