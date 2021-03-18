const apiURL = 'http://127.0.0.1:5000';

function crear() {
  var formulario = document.getElementById('formulario');

  var datos = new FormData(formulario);
  var tipo_comida  = document.getElementById("tipocomida").value;
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(apiURL + '/food', {
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
      .then(json => console.log(json),)
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

  function obtener() {
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