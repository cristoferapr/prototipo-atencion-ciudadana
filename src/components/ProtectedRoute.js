import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { store } = useContext(Context);

  // Si no hay token, redirige al Home ("/")
  if (!store.token) {
    return <Navigate to="/" />;
  }

  // Si hay token, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
