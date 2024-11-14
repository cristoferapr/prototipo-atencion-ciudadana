import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import AutoCompleteAddress from "./AutocompleteAdress";
import "leaflet/dist/leaflet.css";

// Coordenadas iniciales para Villa Alemana, Chile
const DEFAULT_CENTER = { lat: -33.0425, lng: -71.3737 };

// Subcomponente para escuchar eventos del mapa y actualizar la posición del marcador
const CenterMarker = ({ location, setLocation }) => {
  const map = useMapEvents({
    drag() {
      setLocation(map.getCenter()); // Actualiza la ubicación al arrastrar el mapa
    },
    zoom() {
      setLocation(map.getCenter()); // Actualiza la ubicación al hacer zoom
    },
  });

  useEffect(() => {
    map.setView(location, map.getZoom()); // Centra el mapa en la ubicación inicial o seleccionada
  }, [location, map]);

  return <Marker position={location} draggable={false} />;
};

const MapComponent = () => {
  const [location, setLocation] = useState(DEFAULT_CENTER);

  // Solicita la geolocalización del usuario y centra el mapa en su ubicación
  const requestUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.log("Geolocalización denegada o no disponible.")
    );
  };

  // Solicita la ubicación del usuario una vez al montar el componente
  useEffect(() => {
    requestUserLocation();
  }, []);

  // Función para manejar la selección de una dirección y centrar el mapa en ella
  const handleAddressSelect = (newLocation) => {
    setLocation(newLocation); // Actualiza la ubicación en el centro del mapa
  };

  return (
    <div className="map-container">
      <AutoCompleteAddress onSelectAddress={handleAddressSelect} />
      <MapContainer center={location} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CenterMarker location={location} setLocation={setLocation} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
