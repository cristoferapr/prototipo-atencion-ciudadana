import React from "react";
import "../css/DashRecentsales.css";

const RecentSales = () => {
  const sales = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00" },
    { name: "William Kim", email: "will@email.com", amount: "$99.00" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00" },
  ];

  return (
    <div className="recent-sales">
      <h2>Recent Sales</h2>
      {sales.map((sale, index) => (
        <div key={index} className="sale-item">
          <div className="sale-info">
            <p className="sale-name">{sale.name}</p>
            <p className="sale-email">{sale.email}</p>
          </div>
          <p className="sale-amount">{sale.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;