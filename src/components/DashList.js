import React, { useState, useEffect, useContext } from "react";
import "../css/DashList.css";
import { Context } from "../context/AppContext";

const DashList = () => {
  const { store, actions } = useContext(Context); // Accede al store y las acciones
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [columns, setColumns] = useState({
    date: true,
    status: true,
    category: true,
    description: true,
  });
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Llama a la acción para cargar los comentarios al montar el componente
  useEffect(() => {
    actions.fetchComments();
  }, []);

  // Muestra un mensaje de carga si no hay comentarios
  if (!store.comments || store.comments.length === 0) {
    return <p>Cargando comentarios...</p>;
  }

  // Función para alternar visibilidad de columna
  const toggleColumn = (column) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  // Función para alternar elementos en los filtros
  const toggleFilter = (filter, setFilter, value) => {
    setFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Filtros aplicados
  const filteredRequests = store.comments.filter((request) => {
    const matchesDescription = request.description
      .toLowerCase()
      .includes(descriptionFilter.toLowerCase());
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(request.status);
    const matchesCategory =
      categoryFilter.length === 0 || categoryFilter.includes(request.category);
    return matchesDescription && matchesStatus && matchesCategory;
  });

  return (
    <div className="request-list">
      <h2>Solicitudes</h2>

      <div className="filters">
        {/* Filtro de descripción */}
        <input
          type="text"
          placeholder="Filtrar por descripción"
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          className="searchBox"
        />

        {/* Dropdown de estado */}
        <div className="filter-group">
          <span
            className={`indicator ${statusFilter.length > 0 ? "active" : ""}`}
          />
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="dropdown-button"
          >
            Estado
          </button>
          {showStatusDropdown && (
            <div className="dropdown-menu">
              {["Pendiente", "Procesando", "Completado"].map((status) => (
                <label key={status} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={statusFilter.includes(status)}
                    onChange={() =>
                      toggleFilter(statusFilter, setStatusFilter, status)
                    }
                  />
                  {status}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown de categoría */}
        <div className="filter-group">
          <span
            className={`indicator ${categoryFilter.length > 0 ? "active" : ""}`}
          />
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="dropdown-button"
          >
            Categoría
          </button>
          {showCategoryDropdown && (
            <div className="dropdown-menu">
              {["Luminarias", "Quejas", "Consultas"].map((category) => (
                <label key={category} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={categoryFilter.includes(category)}
                    onChange={() =>
                      toggleFilter(categoryFilter, setCategoryFilter, category)
                    }
                  />
                  {category}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabla de solicitudes */}
      <div className="request-table">
        <div className="table-header">
          {columns.date && <span>Fecha</span>}
          {columns.status && <span>Estado</span>}
          {columns.category && <span>Categoría</span>}
          {columns.description && <span>Descripción</span>}
        </div>
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="table-row"
            onClick={() => setSelectedRequest(request)} // Al hacer clic, abre el modal
          >
            {columns.date && <span>{request.date}</span>}
            {columns.status && <span className="status">{request.status}</span>}
            {columns.category && <span>{request.category}</span>}
            {columns.description && <span>{request.description}</span>}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Detalles del Comentario</h3>
            <p>
              <strong>RUT:</strong> {selectedRequest.rut}
            </p>
            <p>
              <strong>Fecha:</strong> {selectedRequest.date}
            </p>
            <p>
              <strong>Estado:</strong> {selectedRequest.status}
            </p>
            <p>
              <strong>Categoría:</strong> {selectedRequest.category}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedRequest.description}
            </p>
            <p>
              <strong>Dirección:</strong> {selectedRequest.address}
            </p>
            <p>
              <strong>Archivos:</strong> {selectedRequest.files?.join(", ")}
            </p>
            <button onClick={() => setSelectedRequest(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashList;
