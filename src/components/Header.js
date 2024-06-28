import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Importa el archivo CSS personalizado
import logo from '../img/logo.webp'; // Asegúrate de que el logo esté en la ubicación correcta
import LoginForm from './LoginForm';

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado

  useEffect(() => {
    // Verificar si hay una sesión almacenada en localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []); // Se ejecuta solo una vez al cargar el componente

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Eliminar la sesión en localStorage
    setIsLoggedIn(false); // Marcar al usuario como no logueado
    // Lógica adicional para cerrar sesión, como limpiar datos de sesión en el backend
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: 'relative' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary me-2" onClick={handleLoginClick}>Login</button>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-success" to="/register">Registro</Link> {/* Enlace al formulario de registro */}
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-danger me-2" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {showLoginForm && (
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <LoginForm onClose={closeLoginForm} onLogin={() => setIsLoggedIn(true)} />
        </div>
      )}
    </nav>
  );
}

export default Header;
