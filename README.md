# batch21_hackademy
Repositorio dedicado para almacenar el reto técnico para el bootcamp de hackademy 

# Construido con 🛠️
## Backend 🖥️

* [Python 3.7](https://www.python.org/) - Lenguaje de programación
* [PyMongo](https://pymongo.readthedocs.io/en/stable/) - Herramienta usada para trabajar con MongoDB
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - Herramienta usada para crear el servidor

### Deploy 🚀

Realizado en *Heroku*

Enlace a la API REST -> [https://restaurant-apirest.herokuapp.com](https://restaurant-apirest.herokuapp.com)

### Endpoints 🖊️

```
Credenciales: 

Username: administrador
Password: legion501
```

Login para poder acceder a los permisos del administrador: 
```
[POST] /login
```
Regresa un token

Obtiene todas las comidas registradas: 
```
[GET] /food
```

Obtiene todas las comidas registradas por el tipo de comida: 
```
[GET] /food/type/<tipo>
```

Crea una comida para agregarla al menú:
Nota: Se requiere un token de accesso valido
```
[POST] /food
```

## Frontend 🖱️

* HTML
* CSS
* JavaScript
* Bootstrap

### Deploy 🚀

Realizado en *Firebase*

Enlace a la página -> [https://restaurant-batch-larr.web.app/index.html](https://restaurant-batch-larr.web.app/index.html)
