import React, { useState } from 'react';
import '../css/Register.css';
import axios from 'axios';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({
      name: '',
      email: '',
      address: '',
      password: '',
      phoneNumber: '',
    });
  
    const handleNameChange = (e) => {
      setName(e.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: e.target.value ? '' : 'El nombre es obligatorio.',
      }));
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: /\S+@\S+\.\S+/.test(e.target.value) ? '' : 'Ingrese una dirección de correo electrónico válida.',
      }));
    };
  
    const handleAddressChange = (e) => {
      setAddress(e.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: e.target.value ? '' : 'La dirección es obligatoria.',
      }));
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if (e.target.value.length >= 8 && /\d/.test(e.target.value) && /[a-zA-Z]/.test(e.target.value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: '',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'La contraseña debe tener al menos 8 caracteres, incluyendo mínimo un número y letras.',
        }));
      }
    };
  
    const handlePhoneNumberChange = (e) => {
      let formattedPhoneNumber = e.target.value.replace(/[^\d]/g, '');
      setPhoneNumber(formattedPhoneNumber);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: /^\d{9}$/.test(formattedPhoneNumber) ? '' : 'El número de teléfono debe tener 9 dígitos.',
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (name && /\S+@\S+\.\S+/.test(email) && address && password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password) && /^\d{9}$/.test(phoneNumber)) {
        try {
          const response = await axios.post('http://localhost:5000/api/register', {
            name,
            email,
            address,
            password,
            phoneNumber
          });
  
          console.log('Datos del registro enviados:', response.data);
          // Limpiar el formulario después de enviar
          setName('');
          setEmail('');
          setAddress('');
          setPassword('');
          setPhoneNumber('');
          setErrors({
            name: '',
            email: '',
            address: '',
            password: '',
            phoneNumber: '',
          });
  
          // Aquí podrías redirigir al usuario a la página de inicio de sesión, por ejemplo
        } catch (error) {
          console.error('Error al enviar los datos del registro:', error);
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: name ? '' : 'El nombre es obligatorio.',
          email: /\S+@\S+\.\S+/.test(email) ? '' : 'Ingrese una dirección de correo electrónico válida.',
          address: address ? '' : 'La dirección es obligatoria.',
          password: password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password) ? '' : 'La contraseña debe tener al menos 8 caracteres, incluyendo mínimo un número y letras.',
          phoneNumber: /^\d{9}$/.test(phoneNumber) ? '' : 'El número de teléfono debe tener 9 dígitos.',
        }));
      }
    };
  
    return (
      <div className="container register-container">
        <div className="register-card">
          <h2 className="text-center mt-4">Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                id="address"
                value={address}
                onChange={handleAddressChange}
                required
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Número telefónico</label>
              <div className="input-group">
                <span className="input-group-text">56</span>
                <input
                  type="tel"
                  className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;