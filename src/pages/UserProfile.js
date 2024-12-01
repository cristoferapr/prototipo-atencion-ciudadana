import React, { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent"; // El componente de mapa que ya tienes
import "../css/UserProfile.css"; // Crea un archivo CSS para esta página

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // Datos del usuario
  const [userRequests, setUserRequests] = useState([]); // Solicitudes del usuario
  const [location, setLocation] = useState(null); // Ubicación para el mapa

  useEffect(() => {
    // Simulación de obtener datos del usuario
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user"); // Endpoint para los datos del usuario
        const data = await response.json();
        setUserData(data);
        setLocation({ lat: data.latitude, lng: data.longitude });
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    // Simulación de obtener solicitudes del usuario
    const fetchUserRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/requests"); // Endpoint para las solicitudes
        const data = await response.json();
        setUserRequests(data);
      } catch (error) {
        console.error("Error al obtener las solicitudes del usuario:", error);
      }
    };

    fetchUserData();
    fetchUserRequests();
  }, []);

  return (
    <div className="user-profile">
      <div className="user-header">
        <h2>Perfil del Usuario</h2>
        {userData && (
          <div className="user-details">
            <p>
              <strong>Nombre:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Dirección:</strong> {userData.address}
            </p>
          </div>
        )}
      </div>

      <div className="map-section">
        <h3>Ubicación</h3>
        <MapComponent location={location} setLocation={setLocation} />
      </div>

      <div className="requests-section">
        <h3>Mis Solicitudes</h3>
        <div className="requests-list">
          {userRequests.map((request) => (
            <div key={request.id} className="request-card">
              <h4>{request.category}</h4>
              <p>
                <strong>Descripción:</strong> {request.description}
              </p>
              <p>
                <strong>Estado:</strong> {request.status}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(request.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
