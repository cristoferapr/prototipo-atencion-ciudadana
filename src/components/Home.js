import React from 'react';
import SearchBox from './SearchBox';
import '../css/Home.css'
import Dashboard from './Dashboard';

const Home = () => {
  const handleSearchSubmit = (searchTerm, selectedCategory) => {
    // Aquí puedes implementar la lógica para manejar la búsqueda con los datos enviados
    console.log(`Categoría seleccionada: ${selectedCategory}, Reclamo: ${searchTerm}`);
    // Por ejemplo, podrías enviar esta información a un servidor, almacenarla en el estado global de la aplicación, etc.
  };

  return (
    <div className="login-page">
      {/* Sección izquierda con fondo morado */}
      <div className="left-section">
        <div className="content-wrapper">
          <img src="/path/to/logo.png" alt="Logo" className="logo" />
          <h1>Bienvenido a Nuestra Plataforma</h1>
          <p>Únete a nosotros para explorar una experiencia personalizada y herramientas de primer nivel.</p>
        </div>
      </div>

      {/* Sección derecha con el formulario de login */}
      <div className="right-section">
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="nombre@ejemplo.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>
          <p className="signup-text">
            ¿No tienes una cuenta? <a href="/signup">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
