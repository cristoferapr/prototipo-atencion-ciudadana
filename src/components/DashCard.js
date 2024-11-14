import React from "react";
import "../css/DashCard.css";

const Card = ({ title, value, subtitle }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="card-value">{value}</p>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
};

export default Card;