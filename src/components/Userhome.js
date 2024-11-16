import React from 'react';
import SearchBox from '../components/SearchBox'; // Ajusta la ruta según la ubicación de tu componente

const RequestsPage = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Enviar Solicitudes</h1>
      {/* Incluir el formulario */}
      <SearchBox />
    </div>
  );
};

export default RequestsPage;
