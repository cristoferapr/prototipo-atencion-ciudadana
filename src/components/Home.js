import React from 'react';
import SearchBox from './SearchBox';

const Home = () => {
  const handleSearchSubmit = (searchTerm, selectedCategory) => {
    // Aquí puedes implementar la lógica para manejar la búsqueda con los datos enviados
    console.log(`Categoría seleccionada: ${selectedCategory}, Reclamo: ${searchTerm}`);
    // Por ejemplo, podrías enviar esta información a un servidor, almacenarla en el estado global de la aplicación, etc.
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4"> Atención Ciudadana</h1>
      <SearchBox onSearchSubmit={handleSearchSubmit} />
    </div>
  );
}

export default Home;
