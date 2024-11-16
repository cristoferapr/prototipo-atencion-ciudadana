from flask import request
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User

class Register(Resource):
    def post(self):
        data = request.get_json()
        print(data)

        rut = data.get('rut')
        name = data.get('name')
        email = data.get('email')
        address = data.get('address')
        password = data.get('password')
        phone_number = data.get('phone_number')

        # Verificación de campos requeridos
        if not rut or not name or not email or not address or not password or not phone_number:
            return {"message": "Todos los campos son obligatorios."}, 400

        # Verificar si el usuario ya existe
        if User.query.filter_by(rut=rut).first() or User.query.filter_by(email=email).first():
            return {"message": "El usuario con ese RUT o correo ya existe."}, 400
        
        # Encriptar la contraseña
        password_hash = generate_password_hash(password)

        # Crear el nuevo usuario
        new_user = User(
            rut=rut,
            name=name,
            email=email,
            address=address,
            phone_number=phone_number,
            is_active=True
        )
        new_user.set_password(password)  # Configurar la contraseña encriptada

        # Guardar en la base de datos
        try:
            db.session.add(new_user)
            db.session.commit()
            return {
                "message": "Registro exitoso",
                "data": new_user.serialize()
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"message": "Error al registrar el usuario", "error": str(e)}, 500
