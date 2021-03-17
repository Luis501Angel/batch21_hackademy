function crear() {
  var formulario = document.getElementById('formulario');
  var tipo_comida = document.getElementById("tipocomida").value;
  
  var datos = new FormData(formulario);
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/food', {
      method: 'POST', headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        name: datos.get('nameFood'),
        description: datos.get('descriptionFood'),
        image_url: urlImageFirebase,
        type_food: tipo_comida
      }),
    })
      .then(response => response.json())
      .then(json => console.log(json), )
  })
}

window.onload = function obtener() {
  fetch('http://127.0.0.1:5000/food', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}

var contenedor = document.getElementById('contenedor');

function tabla(json) {
  var contenido = "";
  json.forEach(function (result, i) {
    contenido += `
    <div class="col">
    <div class="card" style="width: 15rem;" >
      <img src="${result.image_url}" class="card-img-top" width="110rem" height="160rem">
      <div class="card-body">
        <h5 class="card-title text-center">${result.name}</h5>
      </div>
    </div>
    </div>
    `
  });
  contenedor.innerHTML += contenido;
}

function obtenerSopas() {
  contenedor.innerHTML = ``;
  fetch('http://127.0.0.1:5000/food/type/sopa', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}

function obtenerBebidas() {
  contenedor.innerHTML = ``;
  fetch('http://127.0.0.1:5000/food/type/bebida', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}

function obtenerGuisados() {
  contenedor.innerHTML = ``;
  fetch('http://127.0.0.1:5000/food/type/guisado', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}