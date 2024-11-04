<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        onLogin(username);
        setUsername('');
        setPassword('');
        setError('');
        onClose(); // Cerrar el formulario después de iniciar sesión exitosamente
      } else {
        throw new Error('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card" style={{ width: '20rem' }}>
      <div className="card-body">
        <h5 className="card-title">Iniciar sesión</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className={`form-control ${error && 'is-invalid'}`}
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${error && 'is-invalid'}`}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
=======
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true');
        onLogin(username);
        setUsername('');
        setPassword('');
        setError('');
        onClose(); // Cerrar el formulario después de iniciar sesión exitosamente
      } else {
        throw new Error('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card" style={{ width: '20rem' }}>
      <div className="card-body">
        <h5 className="card-title">Iniciar sesión</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className={`form-control ${error && 'is-invalid'}`}
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${error && 'is-invalid'}`}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
>>>>>>> 82b4dcb0324aa523db652c796e0eefa44c60c327
