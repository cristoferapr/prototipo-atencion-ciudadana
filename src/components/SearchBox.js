<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SearchBox.css';

const SearchBox = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    claim: '',
    images: []
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    claim: ''
  });
  const [formMessage, setFormMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  }); // Datos del usuario logueado

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    setIsLoggedIn(userLoggedIn);

    // Si el usuario está logueado, obtener y establecer sus datos (simulado)
    if (userLoggedIn) {
      setUserData({
        name: 'Usuario Logueado',
        email: 'usuario@logueado.com',
        phoneNumber: '1234567890',
        address: 'Dirección del Usuario Logueado'
      });
    } else {
      setUserData({
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
      });
    }
  }, []); // Se ejecuta solo al montar el componente

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowForm(true); // Mostrar el formulario al seleccionar una categoría
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    // Limpiar el error cuando se comienza a escribir en el campo
    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormState({
      ...formState,
      images: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviar
    const errors = {};
    if (!formState.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Ingrese una dirección de correo electrónico válida';
    }
    if (!/^\d{9,10}$/.test(formState.phoneNumber)) {
      errors.phoneNumber = 'El número de teléfono debe tener entre 9 y 10 dígitos';
    }
    if (!formState.address.trim()) {
      errors.address = 'La dirección es obligatoria';
    }
    if (!formState.claim.trim()) {
      errors.claim = 'Debe escribir su sugerencia';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();
        formData.append('category', selectedCategory);
        formData.append('name', formState.name);
        formData.append('email', formState.email);
        formData.append('phoneNumber', formState.phoneNumber);
        formData.append('address', formState.address);
        formData.append('claim', formState.claim);
        formState.images.forEach((image, index) => {
          formData.append(`image-${index + 1}`, image);
        });

        const response = await axios.post('http://localhost:5000/api/claim', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Sugerencia enviado:', response.data);
        setFormMessage('Sugerencia enviado exitosamente');

        // Limpiar el formulario después de enviar
        setFormState({
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          claim: '',
          images: []
        });
        setFormErrors({
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          claim: ''
        });
        setSelectedCategory('');
        setShowForm(false);

      } catch (error) {
        console.error('Error al enviar sugerencia:', error);
        setFormMessage('Error al enviar sugerencia');
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="category-select mb-3">
            <h4>Seleccione una categoría:</h4>
            <div className="dropdown">
              <button
                className={`btn btn-secondary dropdown-toggle ${selectedCategory ? '' : 'is-invalid'}`}
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ zIndex: 10 }}
              >
                {selectedCategory ? selectedCategory : 'Seleccionar categoría'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><button className="dropdown-item" onClick={() => handleCategorySelect('Luminarias')}>Luminarias</button></li>
                <li><button className="dropdown-item" onClick={() => handleCategorySelect('Calles en mal estado')}>Calles en mal estado</button></li>
                <li><button className="dropdown-item" onClick={() => handleCategorySelect('Otros')}>Otros</button></li>
              </ul>
              {selectedCategory === '' && <div className="invalid-feedback">Debe seleccionar una categoría</div>}
            </div>
          </div>

          {showForm && (
            <div className="claim-form">
              <h4>Complete el formulario:</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Número telefónico</label>
                  <input
                    type="tel"
                    className={`form-control ${formErrors.phoneNumber ? 'is-invalid' : ''}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.phoneNumber && <div className="invalid-feedback">{formErrors.phoneNumber}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={formState.address}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="claim" className="form-label">Sugerencia</label>
                  <textarea
                    className={`form-control ${formErrors.claim ? 'is-invalid' : ''}`}
                    id="claim"
                    name="claim"
                    value={formState.claim}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                  {formErrors.claim && <div className="invalid-feedback">{formErrors.claim}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="images" className="form-label">Adjuntar imágenes (opcional)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="images"
                    name="images"
                    onChange={handleImageUpload}
                    multiple
                  />
                </div>
                <button type="submit" className="btn btn-primary">Enviar reclamo</button>
                {formMessage && <div className={`alert ${formMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">{formMessage}</div>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SearchBox.css';

const SearchBox = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    claim: '',
    images: []
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    claim: ''
  });
  const [formMessage, setFormMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  }); // Datos del usuario logueado

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    setIsLoggedIn(userLoggedIn);

    // Si el usuario está logueado, obtener y establecer sus datos (simulado)
    if (userLoggedIn) {
      setUserData({
        name: 'Usuario Logueado',
        email: 'usuario@logueado.com',
        phoneNumber: '1234567890',
        address: 'Dirección del Usuario Logueado'
      });
    } else {
      setUserData({
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
      });
    }
  }, []); // Se ejecuta solo al montar el componente

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowForm(true); // Mostrar el formulario al seleccionar una categoría
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
    // Limpiar el error cuando se comienza a escribir en el campo
    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormState({
      ...formState,
      images: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviar
    const errors = {};
    if (!formState.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Ingrese una dirección de correo electrónico válida';
    }
    if (!/^\d{9,10}$/.test(formState.phoneNumber)) {
      errors.phoneNumber = 'El número de teléfono debe tener entre 9 y 10 dígitos';
    }
    if (!formState.address.trim()) {
      errors.address = 'La dirección es obligatoria';
    }
    if (!formState.claim.trim()) {
      errors.claim = 'Debe escribir su sugerencia';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();
        formData.append('category', selectedCategory);
        formData.append('name', formState.name);
        formData.append('email', formState.email);
        formData.append('phoneNumber', formState.phoneNumber);
        formData.append('address', formState.address);
        formData.append('claim', formState.claim);
        formState.images.forEach((image, index) => {
          formData.append(`image-${index + 1}`, image);
        });

        const response = await axios.post('http://localhost:5000/api/claim', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Sugerencia enviado:', response.data);
        setFormMessage('Sugerencia enviado exitosamente');

        // Limpiar el formulario después de enviar
        setFormState({
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          claim: '',
          images: []
        });
        setFormErrors({
          name: '',
          email: '',
          phoneNumber: '',
          address: '',
          claim: ''
        });
        setSelectedCategory('');
        setShowForm(false);

      } catch (error) {
        console.error('Error al enviar sugerencia:', error);
        setFormMessage('Error al enviar sugerencia');
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="category-select mb-3">
            <h4>Seleccione una categoría:</h4>
            <div className="dropdown">
              <button
                className={`btn btn-secondary dropdown-toggle ${selectedCategory ? '' : 'is-invalid'}`}
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ zIndex: 10 }}
              >
                {selectedCategory ? selectedCategory : 'Seleccionar categoría'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><button className="dropdown-item" onClick={() => handleCategorySelect('Luminarias')}>Luminarias</button></li>
                <li><button className="dropdown-item" onClick={() => handleCategorySelect('Calles en mal estado')}>Calles en mal estado</button></li>
                <li><button className="dropdown-item" onClick={() => handleCategorySelect('Otros')}>Otros</button></li>
              </ul>
              {selectedCategory === '' && <div className="invalid-feedback">Debe seleccionar una categoría</div>}
            </div>
          </div>

          {showForm && (
            <div className="claim-form">
              <h4>Complete el formulario:</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Número telefónico</label>
                  <input
                    type="tel"
                    className={`form-control ${formErrors.phoneNumber ? 'is-invalid' : ''}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.phoneNumber && <div className="invalid-feedback">{formErrors.phoneNumber}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={formState.address}
                    onChange={handleInputChange}
                    required
                    disabled={isLoggedIn} // Deshabilitar si el usuario está logueado
                  />
                  {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="claim" className="form-label">Sugerencia</label>
                  <textarea
                    className={`form-control ${formErrors.claim ? 'is-invalid' : ''}`}
                    id="claim"
                    name="claim"
                    value={formState.claim}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                  {formErrors.claim && <div className="invalid-feedback">{formErrors.claim}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="images" className="form-label">Adjuntar imágenes (opcional)</label>
                  <input
                    type="file"
                    className="form-control"
                    id="images"
                    name="images"
                    onChange={handleImageUpload}
                    multiple
                  />
                </div>
                <button type="submit" className="btn btn-primary">Enviar reclamo</button>
                {formMessage && <div className={`alert ${formMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">{formMessage}</div>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
>>>>>>> 82b4dcb0324aa523db652c796e0eefa44c60c327
