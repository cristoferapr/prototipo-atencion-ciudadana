<<<<<<< HEAD
from flask import request
from flask_restful import Resource

class Register(Resource):
    def post(self):
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        address = data.get('address')
        password = data.get('password')
        phone_number = data.get('phoneNumber')

        if not name or not email or not address or not password or not phone_number:
            return {"message": "Todos los campos son obligatorios."}, 400

        # Aquí podrías agregar lógica para procesar y guardar los datos del registro
        # Por ahora solo devolveremos los datos recibidos
        return {
            "message": "Registro exitoso",
            "data": {
                "name": name,
                "email": email,
                "address": address,
                "password": password,
                "phone_number": phone_number
            }
        }, 201
=======
from flask import request
from flask_restful import Resource

class Register(Resource):
    def post(self):
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        address = data.get('address')
        password = data.get('password')
        phone_number = data.get('phoneNumber')

        if not name or not email or not address or not password or not phone_number:
            return {"message": "Todos los campos son obligatorios."}, 400

        # Aquí podrías agregar lógica para procesar y guardar los datos del registro
        # Por ahora solo devolveremos los datos recibidos
        return {
            "message": "Registro exitoso",
            "data": {
                "name": name,
                "email": email,
                "address": address,
                "password": password,
                "phone_number": phone_number
            }
        }, 201
>>>>>>> 82b4dcb0324aa523db652c796e0eefa44c60c327
