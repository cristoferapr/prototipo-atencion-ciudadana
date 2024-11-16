from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    rut = db.Column(db.String(10), unique=True, nullable=False, primary_key=True)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20))
    address = db.Column(db.String(200))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.rut}>'

    def serialize(self):
        return {
            "rut": self.rut,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Modelo de categoría
class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


# Modelo de comentario
class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_rut = db.Column(db.String(10), db.ForeignKey('users.rut'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    address = db.Column(db.String(255))  # Dirección opcional
    files = db.Column(db.JSON, nullable=True)  # Almacenar archivos en formato JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # Relación con usuarios
    user = db.relationship('User', backref='comments', lazy=True)

    # Relación con categorías
    category = db.relationship('Category', backref='comments', lazy=True)

    def __repr__(self):
        return f'<Comment {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_rut": self.user_rut,
            "category": self.category.serialize(),
            "comment": self.comment,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "address": self.address,
            "files": self.files,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
