import jwt
from flask import request, jsonify
from flask_restful import Resource
from api.models import db, Comment, User, Category
from datetime import datetime

SECRET_KEY = "sadjf123124NJSNFJW4954Omk"  # Usa tu clave secreta configurada

class CommentResource(Resource):
    def post(self):
        # Validar token del encabezado
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return {"message": "Token no proporcionado o inválido"}, 401

        token = auth_header.split(" ")[1]  # Obtén el token
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_rut = payload.get("rut")
        except jwt.ExpiredSignatureError:
            return {"message": "El token ha expirado"}, 401
        except jwt.InvalidTokenError:
            return {"message": "Token inválido"}, 401

        # Validación de datos del cuerpo
        data = request.get_json()
        category_name = data.get('category')
        comment_text = data.get('comment')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        address = data.get('address')
        files = data.get('files', [])

        if not category_name or not comment_text or not latitude or not longitude:
            return {"message": "Faltan campos obligatorios."}, 400

        # Verificar si el usuario existe
        user = User.query.filter_by(rut=user_rut).first()
        if not user:
            return {"message": "Usuario no encontrado."}, 404

        # Verificar si la categoría existe
        category = Category.query.filter_by(name=category_name).first()
        if not category:
            return {"message": "Categoría no encontrada."}, 404

        # Crear el comentario
        new_comment = Comment(
            user_rut=user.rut,
            category_id=category.id,
            comment=comment_text,
            latitude=latitude,
            longitude=longitude,
            address=address,
            files=files,
            created_at=datetime.utcnow()
        )

        try:
            db.session.add(new_comment)
            db.session.commit()
            
            # Serializar manualmente el comentario para evitar problemas con datetime
            comment_data = {
                "id": new_comment.id,
                "user_rut": new_comment.user_rut,
                "category": category.name,
                "comment": new_comment.comment,
                "latitude": new_comment.latitude,
                "longitude": new_comment.longitude,
                "address": new_comment.address,
                "files": new_comment.files,
                "created_at": new_comment.created_at.isoformat() if new_comment.created_at else None,
                "updated_at": new_comment.updated_at.isoformat() if new_comment.updated_at else None,
            }

            return {
                "message": "Comentario creado exitosamente",
                "data": comment_data
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"message": "Error al crear el comentario", "error": str(e)}, 500