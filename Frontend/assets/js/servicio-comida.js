const apiURL = 'https://restaurant-apirest.herokuapp.com';

function obtener() {
  fetch(apiURL + '/food', {
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
    <div class="col-auto p-2">
    <div class="card" style="width: 15rem;" >
      <img src="${result.image_url}" class="card-img-top" width="110rem" height="160rem">
      <div class="card-body">
        <h7 class="card-subtitle text-center" style="font-weight: bold;">${result.name}</h7>
        <p style="float: right; color: #cc0000;">$ ${result.price}</p>
        
      </div>
    </div>
    </div>
    `
  });
  contenedor.innerHTML += contenido;
}

window.onload = obtenerEntradas();

function obtenerEntradas() {
  contenedor.innerHTML = ``;
  fetch(apiURL + '/food/type/entrada', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}

function obtenerSopas() {
  contenedor.innerHTML = ``;
  fetch(apiURL + '/food/type/sopa', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}

function obtenerPlatillos() {
  contenedor.innerHTML = ``;
  fetch(apiURL + '/food/type/platillo', {
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
  fetch(apiURL + '/food/type/bebida', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}


function obtenerPostres() {
  contenedor.innerHTML = ``;
  fetch(apiURL + '/food/type/postre', {
    method: 'GET', headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then(response => response.json())
    .then(json => tabla(json),)
}



