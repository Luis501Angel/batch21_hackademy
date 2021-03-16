from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
import json
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps
import datetime

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/restaurant'
app.config['SECRET_KEY']='legluang34'
CORS(app)
mongo = PyMongo(app)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None

        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        if not token:
            return jsonify({'message': 'Falta token de acceso'})
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = mongo.db.users.find_one({'public_id' : data['public_id']})
        except:
            return jsonify({'message': 'Token invalido'})
        return f(current_user, *args, **kwargs)
    return decorator

@app.route('/food', methods = ['POST'])
def create_food():
    name = request.json['name']
    description = request.json['description']
    image_url = request.json['image_url']

    if name and description and image_url:
        mongo.db.foods.insert(
            {
                'name': name,
                'description': description,
                'image_url': image_url
            }
        )
        response = {
            'message': 'Se creo correctamente' 
        }
        return response
    else:
        response = {
            'message': 'No se ha creado'
        }
        return response

@app.route('/food', methods = ['GET'])
#@token_required
def get_foods():
    foods = mongo.db.foods.find()
    response = json_util.dumps(foods)
    return Response(response, mimetype='application/json')

@app.route('/food/<id>', methods = ['GET'])
def get_food(id):
    food = mongo.db.foods.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(food)
    return Response(response, mimetype='aplication/json')

@app.route('/food/<id>', methods = ['DELETE'])
def delete_food(id):
    mongo.db.foods.delete_one({'_id': ObjectId(id)})
    response = jsonify({'message': 'Comida: ' + id + ' eliminada correctamente'})
    return response

@app.route('/food/<id>', methods = ['PUT'])
def update_food(id):
    name = request.json['name'],
    description = request.json['description'],
    image_url = request.json['image_url']

    if name and description and image_url:
        mongo.db.foods.update_one({'__id': ObjectId(id)}, {
            '$set': {
                'name': name,
                'description': description,
                'image_url': image_url
            }
        })
        response = jsonify({'message': 'Comida: ' + id + ' fue actualizada correctamente'})
        return response

@app.errorhandler(404)
def not_found(error=None):
    response = jsonify({
        'message': 'Recurso no encontrado ' + request.url,
        'status': 404
    })
    response.status_code = 404
    return response

@app.route('/register', methods = ['GET', 'POST'])
def signup_admin():
    username = request.json['username']
    password = request.json['password'] 

    if username and password:
        hashed_password = generate_password_hash(password)
        mongo.db.users.insert({'public_id': str(uuid.uuid4()),'username': username, 'password': hashed_password})
        response = {
            'message': 'Registrado'
        }
        return response
    else:
        response = {
            'message': 'No registrado'
        }
        return response

@app.route('/login', methods = ['POST', 'GET'])
def login():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        response = jsonify({
             'message': 'No se pudo autenticar'
        })
        return response

    admin = mongo.db.users.find_one({'username': auth.username})
    user = json.loads(json_util.dumps(admin))
    password = user['password']

    if check_password_hash(password, auth.password):
        token = jwt.encode({'public_id': user['public_id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes = 30)}, app.config['SECRET_KEY'])
        return jsonify({'token': token})
    response = jsonify({
             'message': 'No se pudo autenticar'
       })
    return response

if __name__ == "__main__":
    app.run(debug = True)