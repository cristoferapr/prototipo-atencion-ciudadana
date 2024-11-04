<<<<<<< HEAD
from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api
from api.register import Register
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# Remove in production. This is for dev (same origin server) only.
app.config['CORS_HEADERS'] = 'Content-Type'

# Simulación de datos de usuario (solo para propósitos de ejemplo)
users = {
    'user': {
        'username': 'user',
        'password': 'test',
        'name': 'Usuario de Prueba',
        'email': 'usuario@example.com',
        'phoneNumber': '+56555555555',
        'address': 'Calle Falsa 123'
    }
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and users[username]['password'] == password:
        user_data = {
            'username': users[username]['username'],
            'name': users[username]['name'],
            'email': users[username]['email'],
            'phoneNumber': users[username]['phoneNumber'],
            'address': users[username]['address']
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401

@app.route("/", defaults={'path': ''})
def test(path):
    return 'Hello World'

# Agregar la ruta para el registro
api.add_resource(Register, '/api/register')

# Ruta para recibir los reclamos enviados desde el frontend
@app.route('/api/claim', methods=['POST'])
@cross_origin()
def receive_claim():
    try:
        # Ejemplo de recepción de datos desde el frontend
        category = request.form.get('category')
        name = request.form.get('name')
        email = request.form.get('email')
        phoneNumber = request.form.get('phoneNumber')
        address = request.form.get('address')
        claim = request.form.get('claim')
        images = request.files.getlist('images')

        # Aquí podrías procesar los datos recibidos, almacenar en base de datos, etc.
        # Por ahora, solo mostraremos los datos recibidos en la consola del servidor
        print('Categoría:', category)
        print('Nombre:', name)
        print('Correo electrónico:', email)
        print('Número telefónico:', phoneNumber)
        print('Dirección:', address)
        print('Sugerencia:', claim)
        for image in images:
            print('Imagen:', image.filename)

        return jsonify({'message': 'Reclamo recibido exitosamente'}), 200
    except Exception as e:
        print('Error al procesar el reclamo:', str(e))
        return jsonify({'message': 'Error al procesar el reclamo'}), 500

# Running app
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
=======
from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api
from api.register import Register
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# Remove in production. This is for dev (same origin server) only.
app.config['CORS_HEADERS'] = 'Content-Type'

# Simulación de datos de usuario (solo para propósitos de ejemplo)
users = {
    'user': {
        'username': 'user',
        'password': 'test',
        'name': 'Usuario de Prueba',
        'email': 'usuario@example.com',
        'phoneNumber': '+56555555555',
        'address': 'Calle Falsa 123'
    }
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and users[username]['password'] == password:
        user_data = {
            'username': users[username]['username'],
            'name': users[username]['name'],
            'email': users[username]['email'],
            'phoneNumber': users[username]['phoneNumber'],
            'address': users[username]['address']
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'Usuario o contraseña incorrectos'}), 401

@app.route("/", defaults={'path': ''})
def test(path):
    return 'Hello World'

# Agregar la ruta para el registro
api.add_resource(Register, '/api/register')

# Ruta para recibir los reclamos enviados desde el frontend
@app.route('/api/claim', methods=['POST'])
@cross_origin()
def receive_claim():
    try:
        # Ejemplo de recepción de datos desde el frontend
        category = request.form.get('category')
        name = request.form.get('name')
        email = request.form.get('email')
        phoneNumber = request.form.get('phoneNumber')
        address = request.form.get('address')
        claim = request.form.get('claim')
        images = request.files.getlist('images')

        # Aquí podrías procesar los datos recibidos, almacenar en base de datos, etc.
        # Por ahora, solo mostraremos los datos recibidos en la consola del servidor
        print('Categoría:', category)
        print('Nombre:', name)
        print('Correo electrónico:', email)
        print('Número telefónico:', phoneNumber)
        print('Dirección:', address)
        print('Sugerencia:', claim)
        for image in images:
            print('Imagen:', image.filename)

        return jsonify({'message': 'Reclamo recibido exitosamente'}), 200
    except Exception as e:
        print('Error al procesar el reclamo:', str(e))
        return jsonify({'message': 'Error al procesar el reclamo'}), 500

# Running app
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
>>>>>>> 82b4dcb0324aa523db652c796e0eefa44c60c327
