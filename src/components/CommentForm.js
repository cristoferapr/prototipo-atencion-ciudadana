import React, { useState, useContext } from "react";
import MapComponent from "./MapComponent";
import { Context } from "../context/AppContext";
import "../css/CommentForm.css";

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const CommentForm = () => {
  const { actions } = useContext(Context);
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [manualAddress, setManualAddress] = useState(""); // Dirección manual
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalSizeMB = selectedFiles.reduce(
      (total, file) => total + file.size / (1024 * 1024),
      0
    );

    if (totalSizeMB > MAX_FILE_SIZE_MB) {
      setFileError(
        `El tamaño total de los archivos no puede superar los ${MAX_FILE_SIZE_MB} MB.`
      );
      return;
    }

    const invalidFile = selectedFiles.find(
      (file) => !ALLOWED_FILE_TYPES.includes(file.type)
    );
    if (invalidFile) {
      setFileError(
        "Solo se permiten imágenes o documentos (jpg, png, gif, pdf, docx, txt)."
      );
      return;
    }

    setFileError(""); // Limpia cualquier error previo
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment || !category) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    if (!location) {
      alert("Por favor, selecciona una ubicación en el mapa.");
      return;
    }

    actions.submitComment({
      userRut: "12345678-9", // Aquí debes obtener el RUT del usuario logueado
      category,
      comment,
      location,
      manualAddress,
      files,
    });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2>Enviar un comentario</h2>
      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Quejas">Quejas</option>
          <option value="Sugerencias">Sugerencias</option>
          <option value="Preguntas">Preguntas</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comentario</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe tu comentario..."
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="file">Adjuntar Archivos (máximo 10MB)</label>
        <input
          type="file"
          id="file"
          multiple
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.gif,.pdf,.docx,.txt"
        />
        {fileError && <p className="error-text">{fileError}</p>}
      </div>
      <div className="form-group">
        <label>Selecciona tu ubicación:</label>
        <MapComponent location={location} setLocation={setLocation} />
      </div>
      <div className="form-group">
        <label>Ingresa una dirección (opcional):</label>
        <input
          type="text"
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          placeholder="Ingresa tu dirección..."
        />
      </div>
      <button type="submit">Enviar Comentario</button>
    </form>
  );
};

export default CommentForm;
