import React, { useState } from 'react';
import '../css/Register.css';
import axios from 'axios';

const Register = () => {
    const [rut, setRut] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({
      rut: '',
      name: '',
      email: '',
      address: '',
      password: '',
      phoneNumber: '',
    });
    const [isRutValid, setIsRutValid] = useState(null);

    
    // Función para validar el RUT usando el algoritmo del Módulo 11
    const validateRut = (rut) => {
      // Eliminar puntos y guion del RUT
      const cleanRut = rut.replace(/\./g, '').replace('-', '');
      const body = cleanRut.slice(0, -1); // Digitos sin el dígito verificador
      const dv = cleanRut.slice(-1).toUpperCase(); // Dígito verificador

      // Validación de formato básico
      if (!/^\d+$/.test(body) || (!/^[0-9K]$/.test(dv))) return false;

      // Calcular el dígito verificador
      let sum = 0;
      let multiplier = 2;

      for (let i = body.length - 1; i >= 0; i--) {
          sum += parseInt(body[i]) * multiplier;
          multiplier = multiplier === 7 ? 2 : multiplier + 1;
      }

      const calculatedDv = 11 - (sum % 11);
      const expectedDv = calculatedDv === 11 ? '0' : calculatedDv === 10 ? 'K' : calculatedDv.toString();

      return dv === expectedDv;
  };

  const formatRut = (inputRut) => {
    const cleanRut = inputRut.replace(/[^0-9Kk]/g, '').toUpperCase(); // Solo números y K
    if (cleanRut.length <= 1) return cleanRut;

    const body = cleanRut.slice(0, -1); // Números sin el dígito verificador
    const dv = cleanRut.slice(-1); // Dígito verificador

    // Insertar puntos y guion
    let formattedBody = body
        .split('')
        .reverse()
        .reduce((acc, char, i) => (i % 3 === 0 && i > 0 ? char + '.' + acc : char + acc), '');

    return `${formattedBody}-${dv}`;
};


const handleRutChange = (e) => {
  let inputRut = e.target.value.toUpperCase();

    // Eliminar caracteres no permitidos (solo números y K)
    inputRut = inputRut.replace(/[^0-9K]/g, '');

    // Limitar la longitud máxima del RUT
    if (inputRut.length > 9) return;

    // Si ya tiene una K al final, no permitir más caracteres
    if (inputRut.includes('K') && inputRut.slice(-1) !== 'K') {
        return;
    }

    // Prevenir más de una K
    const kCount = (inputRut.match(/K/g) || []).length;
    if (kCount > 1) return;


    // Formatear el RUT automáticamente
  const formattedRut = formatRut(inputRut);
  setRut(formattedRut);

  if (formattedRut.length >= 11 && validateRut(formattedRut)) {
      setIsRutValid(true);
      setErrors((prevErrors) => ({
          ...prevErrors,
          rut: '',
      }));
  } else {
      setIsRutValid(false);
      setErrors((prevErrors) => ({
          ...prevErrors,
          rut: 'El RUT no es válido.',
      }));
  }
};

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

  const cleanRut = (formattedRut) => {
    return formattedRut.replace(/\./g, '').replace(/-/g, '');
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        isRutValid &&
        name &&
        /\S+@\S+\.\S+/.test(email) &&
        address &&
        password.length >= 8 &&
        /\d/.test(password) &&
        /[a-zA-Z]/.test(password) &&
        /^\d{9}$/.test(phoneNumber)
    ) {
        try {
            // Limpiar el RUT antes de enviarlo
            const cleanedRut = cleanRut(rut);
            console.log(password)
            const response = await axios.post('http://localhost:5000/api/register', {
                rut : cleanedRut,
                name : name,
                email: email,
                address : address,
                password : password,
                phone_number: phoneNumber
            });

            console.log('Datos del registro enviados:', response.data);
            setRut('');
            setName('');
            setEmail('');
            setAddress('');
            setPassword('');
            setPhoneNumber('');
            setErrors({
                rut: '',
                name: '',
                email: '',
                address: '',
                password: '',
                phoneNumber: '',
            });

        } catch (error) {
            console.error('Error al enviar los datos del registro:', error);
        }
    } else {
        setErrors((prevErrors) => ({
            ...prevErrors,
            rut: isRutValid ? '' : 'El RUT no es válido.',
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
                        <label htmlFor="rut" className="form-label">RUT</label>
                        <input
                            type="text"
                            className={`form-control ${isRutValid === null ? '' : isRutValid ? 'is-valid' : 'is-invalid'}`}
                            id="rut"
                            value={rut}
                            onChange={handleRutChange}
                            required
                        />
                        {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
                        {isRutValid && <div className="valid-feedback">RUT válido</div>}
                    </div>
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
