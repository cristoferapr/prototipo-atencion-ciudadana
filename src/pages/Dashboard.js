// DashboardPage.js
import React, { useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import DashOverview from "../components/DashOverview";
import DashList from "../components/DashList";
import "../css/Dashboard.css";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-page">
      <DashSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
        <DashHeader toggleSidebar={toggleSidebar} />
        <div className="dashboard-sections">
          <DashOverview />
          <DashList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
