import React, { useContext } from "react";
import { Context } from "../context/AppContext";
import StatusCircle from "./DashStatuscircle";
import "../css/DashOverview.css";

const Overview = () => {
  const { store } = useContext(Context); // Accede a la store

  // Calcular el total de solicitudes por estado
  const counts = store.comments.reduce(
    (acc, comment) => {
      if (comment.status === "Pendiente") acc.pending += 1;
      else if (comment.status === "Procesando") acc.processing += 1;
      else if (comment.status === "Completado") acc.completed += 1;
      return acc;
    },
    { pending: 0, processing: 0, completed: 0 }
  );

  return (
    <div className="overview">
      <h2>Solicitudes</h2>
      <div className="status-circles">
        <StatusCircle
          title="Pendientes"
          value={counts.pending}
          color="#ffcc00"
        />
        <StatusCircle
          title="En Proceso"
          value={counts.processing}
          color="#00bfff"
        />
        <StatusCircle
          title="Finalizadas"
          value={counts.completed}
          color="#32cd32"
        />
      </div>
    </div>
  );
};

export default Overview;
