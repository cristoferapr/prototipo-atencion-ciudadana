import jwt
from flask import request, jsonify
from flask_restful import Resource
from api.models import db, Comment, User, Category

SECRET_KEY = "sadjf123124NJSNFJW4954Omk"  # Usa tu clave secreta configurada
class CommentListResource(Resource):
    def get(self):
        try:
            # Obtener todos los comentarios
            comments = Comment.query.all()

            # Serializar manualmente cada comentario
            serialized_comments = []
            for comment in comments:
                serialized_comments.append({
                    "id": comment.id,
                    "user_rut": comment.user_rut,
                    "category": comment.category.name,
                    "comment": comment.comment,
                    "latitude": comment.latitude,
                    "longitude": comment.longitude,
                    "address": comment.address,
                    "files": comment.files,
                    "created_at": comment.created_at.isoformat() if comment.created_at else None,
                    "updated_at": comment.updated_at.isoformat() if comment.updated_at else None,
                })

            return {
                "message": "Comentarios obtenidos exitosamente",
                "data": serialized_comments
            }, 200
        except Exception as e:
            return {"message": "Error al obtener los comentarios", "error": str(e)}, 500
