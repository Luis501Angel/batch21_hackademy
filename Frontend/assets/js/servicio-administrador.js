const apiURL = 'https://restaurant-apirest.herokuapp.com';
  
var contenedor = document.getElementById('contenedor');

function crear() {
  var formulario = document.getElementById('formulario');

  var datos = new FormData(formulario);
  var tipo_comida  = document.getElementById("tipocomida").value;
  var precio_comida = document.getElementById('preciocomida').value;
  console.log(precio_comida)
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(apiURL + '/food', {
      method: 'POST', headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-access-tokens": localStorage.getItem('key')
      },
      body: JSON.stringify({
        name: datos.get('nameFood'),
        description: datos.get('descriptionFood'),
        image_url: urlImageFirebase,
        type_food: tipo_comida,
        price: parseInt(precio_comida)
      }),
    })
      .then(response => response.json())
      .then(json => console.log(json),)
      .then(limpiarCampos())
  })
}

function mostrarSaludo() {
    var fecha = new Date();
    var hora = fecha.getHours();
  
    if (hora >= 0 && hora < 12) {
      document.getElementById('saludo').innerHTML = `
    <h3> Buenos días <img src="./assets/img/buenosDias.png"  style="width: 40px;"></h3>
    `
    } else if (hora >= 12 && hora < 19) {
      document.getElementById('saludo').innerHTML = `
    <h3> Buenas tardes <img src="./assets/img/buenasTardes.png"  style="width: 40px;"></h3>
    `
    } else {
      document.getElementById('saludo').innerHTML = `
    <h3> Buenas noches <img src="./assets/img/buenasNoches.png"  style="width: 40px;"></h3>
    `
    }
  }

  function tabla(json) {
    var contenido = "";
    json.forEach(function (result, i) {
      contenido += `
      <div class="col-auto text-center p-2">
      <div class="card" style="width: 15rem;" >
        <img src="${result.image_url} " class="card-img-top" width="110rem" height="160rem">
        <div class="card-body">
          <h7 class="card-subtitle text-center" style="font-weight: bold;">${result.name}</h7>
        </div>
        <button type="submit" class="btn btn-danger" onclick="eliminar(${result})">Eliminar</button>
        
      </div>
      </div>
      `
    });
    contenedor.innerHTML += contenido;
  }  
  
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

  function limpiarCampos() {
    document.getElementById("formulario").reset();
  }

  



  