// Dashboard.js
import React from "react";
import { useState } from "react";
import Sidebar from "./DashSidebar";
import Header from "./DashHeader";
import Overview from "./DashOverview";
import RecentSales from "./DashRecentsales";
import "../css/Dashboard.css";
import DashList from "./DashList";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="dashboard-container">
        {/* Sidebar, se muestra en pantallas grandes y esconde en móviles */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Contenido principal */}
        <div className="dashboard-main">
          <Header toggleSidebar={toggleSidebar} />
          <div className="dashboard-content">
            <Overview />
            <DashList />
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;