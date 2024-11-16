import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/AppContext"; // Importa el contexto correctamente
import "../css/Header.css"; // Importa el archivo CSS personalizado
import logo from "../img/logo.webp"; // Asegúrate de que el logo esté en la ubicación correcta

const Header = () => {
  const { store, actions } = useContext(Context); // Obtén el token y las acciones desde el contexto
  const navigate = useNavigate(); // Para redireccionar después del logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay un token en la store
    setIsLoggedIn(!!store.token); // Actualiza el estado basado en el token
  }, [store.token]); // Escucha cambios en el token

  const handleLogout = () => {
    actions.logout(); // Llama la función de logout en el flux
    navigate("/"); // Redirige al usuario a la página de inicio
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ position: "relative" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="ml-auto">
          {isLoggedIn && (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
