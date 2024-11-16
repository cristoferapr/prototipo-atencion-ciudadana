import React, { useState, useEffect } from "react";
import "../css/DashList.css";
import axios from "axios";

const DashList = () => {
  const [requests, setRequests] = useState([]); // Cambiado de initialRequests
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
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // Cargar comentarios desde el backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allcomments");
        const data = await response.json();
        setRequests(
          data.data.map((comment) => ({
            id: comment.id,
            date: new Date(comment.created_at).toLocaleDateString(),
            status: "Pendiente",
            category: comment.category,
            description: comment.comment,
          }))
        );
      } catch (error) {
        console.error("Error al cargar los comentarios:", error);
      }
    };

    fetchComments();
  }, []);

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
  const filteredRequests = requests.filter((request) => {
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

        {/* Toggle View como menú desplegable */}
        <div className="toggle-view">
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="toggle-button"
          >
            ⚙️ Toggle View
          </button>
          {showColumnMenu && (
            <div className="column-menu">
              {Object.keys(columns).map((column) => (
                <label key={column} className="menu-item">
                  <input
                    type="checkbox"
                    checked={columns[column]}
                    onChange={() => toggleColumn(column)}
                  />
                  {column.charAt(0).toUpperCase() + column.slice(1)}
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
          <div key={request.id} className="table-row">
            {columns.date && <span>{request.date}</span>}
            {columns.status && <span className="status">{request.status}</span>}
            {columns.category && <span>{request.category}</span>}
            {columns.description && <span>{request.description}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashList;
