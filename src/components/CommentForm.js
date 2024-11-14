import React, { useState } from "react";
import MapComponent from "./MapComponent";
import AutoCompleteAddress from "./AutocompleteAdress";
import "../css/CommentForm.css";

const CommentForm = ({ onSubmit }) => {
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment || !category) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }
    onSubmit({ category, comment, location, files });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2>Enviar un comentario</h2>
      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
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
        <label htmlFor="file">Adjuntar Archivos (opcional)</label>
        <input type="file" id="file" multiple onChange={handleFileChange} />
      </div>
      <MapComponent location={location} setLocation={setLocation} />
      <button type="submit">Enviar Comentario</button>
    </form>
  );
};

export default CommentForm;
