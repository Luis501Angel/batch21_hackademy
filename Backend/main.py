from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from decouple import config as config_decouple

app = Flask(__name__)
app.config['MONGO_URI']='mongodb+srv://apiuser:ocmdTBiwX1AltLnF@restaurant-hackademy.02ags.mongodb.net/restaurant'
app.config['SECRET_KEY']='legluang34'
cors = CORS(app)
mongo = PyMongo(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@cross_origin()
@app.route('/food', methods = ['POST'])
def create_food():
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

if __name__ == "__main__":
    app.run(debug = True)