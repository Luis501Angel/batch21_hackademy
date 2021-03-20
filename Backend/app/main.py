from flask import Flask, request, jsonify, Response, make_response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId

from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
import datetime
from functools import wraps
import json

app = Flask(__name__)

app.config['SECRET_KEY']='Th1s1ss3cr3t'
app.config['MONGO_URI']='mongodb+srv://apiuser:ocmdTBiwX1AltLnF@restaurant-hackademy.02ags.mongodb.net/restaurant'
app.config['SECRET_KEY']='legluang34'
cors = CORS(app)
mongo = PyMongo(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return jsonify({'message': 'Falta un token valido'})
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            response = mongo.db.users.find_one(mongo.db.users.find_one({'public_id': data['public_id']}))
            current_user = json_util.dumps(response)
        except:
            return jsonify({'message': 'Token invalido'})

        return f(current_user, *args, **kwargs)
    return decorator

@app.route('/login', methods=['GET', 'POST'])  
def login_user(): 
    auth = request.authorization

    if not auth or not auth.username or not auth.password:  
        return make_response('No se puede verificar', 401, {'WWW.Authentication': 'Basic realm: "Es necesario estar logeado"'})
 
    response = mongo.db.users.find_one(mongo.db.users.find_one({'username': auth.username}))
    p_id = json_util.dumps(response['public_id'])
     
    if check_password_hash('pbkdf2:sha256:150000$K2FnrDum$91586edd013fc8636b727ed645c05182215912027177beb85388e6540ebfae3c' , auth.password):  
        token = jwt.encode({'public_id': p_id}, app.config['SECRET_KEY'])  
        return jsonify({'token' : token.decode('UTF-8')}) 

    return make_response('No se puede verificar',  401, {'WWW.Authentication': 'Basic realm: "Es necesario estar logeado"'})

@cross_origin()
@app.route('/food', methods = ['POST'])
@token_required
def create_food(self):
    name = request.json['name']
    description = request.json['description']
    image_url = request.json['image_url']
    type_food = request.json['type_food']
    price = request.json['price']

    if name and description and image_url and type_food and price:
        mongo.db.foods.insert_one(
            {
                'name': name,
                'description': description,
                'image_url': image_url,
                'type_food': type_food,
                'price': price
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
def get_foods():
    foods = mongo.db.foods.find()
    response = json_util.dumps(foods)
    return Response(response, mimetype='application/json')

@app.route('/food/<id>', methods = ['GET'])
def get_food(id):
    food = mongo.db.foods.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(food)
    return Response(response, mimetype='aplication/json')

@cross_origin()
@app.route('/food/type/<tipo>', methods = ['GET'])
def get_food_by_type(tipo):
    food = mongo.db.foods.find({'type_food': tipo})
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
    image_url = request.json['image_url'],
    type_food = request.json['type_food'],
    price = request.json['price']

    if name and description and image_url:
        mongo.db.foods.update_one({'__id': ObjectId(id)}, {
            '$set': {
                'name': name,
                'description': description,
                'image_url': image_url,
                'type_food': type_food,
                'price': price
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
