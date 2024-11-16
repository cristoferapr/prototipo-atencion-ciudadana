import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = { lat: -33.0425, lng: -71.3737 };
const DEFAULT_ZOOM = 17; // Más cercano por defecto

// Configuración del ícono de marcador predeterminado
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const CenterMarker = ({ location, setLocation }) => {
  const map = useMapEvents({
    drag() {
      setLocation(map.getCenter());
    },
    zoom() {
      setLocation(map.getCenter());
    },
  });

  useEffect(() => {
    map.setView(location, map.getZoom());
  }, [location, map]);

  return <Marker position={location} />;
};

const MapComponent = ({ location, setLocation }) => {
  useEffect(() => {
    if (!location) {
      // Si no hay una ubicación definida, usa la geolocalización del usuario
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setLocation(DEFAULT_CENTER); // Si no se puede obtener la geolocalización, usa el centro por defecto
        }
      );
    }
  }, [location, setLocation]);

  return (
    <MapContainer
      center={location || DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {location && (
        <CenterMarker location={location} setLocation={setLocation} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
