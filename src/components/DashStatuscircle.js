// StatusCircle.js
import React from "react";
import "../css/DashStatuscircle.css";

const StatusCircle = ({ title, value, color }) => {
  return (
    <div className="status-circle" style={{ borderColor: color }}>
      <div className="circle-content">
        <h3>{title}</h3>
        <p className="circle-value">{value}</p>
      </div>
    </div>
  );
};

export default StatusCircle;
