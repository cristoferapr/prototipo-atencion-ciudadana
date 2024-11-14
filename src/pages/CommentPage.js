import React from "react";
import CommentForm from "../components/CommentForm";

const CommentPage = () => {
  const handleCommentSubmit = (commentData) => {
    console.log("Comentario enviado:", commentData);
    alert("Comentario enviado y convertido en solicitud!");
  };

  return (
    <div className="comment-page">
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentPage;
