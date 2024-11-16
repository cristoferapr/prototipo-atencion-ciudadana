from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api
from flask_migrate import Migrate
from api.register import Register
from api.login import Login
from api.comment import CommentResource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from api.models import db
from api.allcomments import CommentListResource

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# Remove in production. This is for dev (same origin server) only.
app.config['CORS_HEADERS'] = 'Content-Type'

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:test@localhost/atencion_ciudadana'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

@app.route("/", defaults={'path': ''})
def test(path):
    return 'Hello World'

# Agregar la ruta para el registro
api.add_resource(Register, '/api/register')

api.add_resource(Login, '/api/login')

api.add_resource(CommentResource, '/api/comments')

api.add_resource(CommentListResource, '/api/allcomments')

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
