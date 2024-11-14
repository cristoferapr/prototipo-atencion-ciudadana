// Overview.js
import React from "react";
import StatusCircle from "./DashStatuscircle";
import "../css/DashOverview.css";

const Overview = () => {
  return (
    <div className="overview">
      <h2>Solicitudes</h2>
      <div className="status-circles">
        <StatusCircle title="Pendientes" value="12" color="#ffcc00" />
        <StatusCircle title="En Proceso" value="8" color="#00bfff" />
        <StatusCircle title="Finalizadas" value="20" color="#32cd32" />
      </div>
    </div>
  );
};

export default Overview;
