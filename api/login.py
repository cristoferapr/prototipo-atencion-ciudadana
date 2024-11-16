from flask import request, jsonify
from flask_restful import Resource
from werkzeug.security import check_password_hash
from api.models import User

class Login(Resource):
    def post(self):
        data = request.get_json()
        print(data)

        # Validación de datos
        if not data or 'rut' not in data or 'password' not in data:
            return {"message": "Debe proporcionar un usuario y una contraseña"}, 400

        rut = data.get('rut')
        password = data.get('password')

        # Buscar usuario en la base de datos
        user = User.query.filter_by(rut=rut).first()
        if not user or not check_password_hash(user.password_hash, password):
            return {"message": "Credenciales inválidas"}, 401

        # Generar JWT (usando una librería como PyJWT)
        import jwt
        from datetime import datetime, timedelta
        secret_key = "sadjf123124NJSNFJW4954Omk"  # Cambia esto por un valor seguro
        payload = {
            "rut": user.rut,
        }
        token = jwt.encode(payload, secret_key, algorithm="HS256")

        return jsonify({"access_token": token})