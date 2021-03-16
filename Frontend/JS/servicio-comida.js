function crear() {
  console.log(urlImageFirebase)
  var formulario = document.getElementById('formulario');
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
        image_url: urlImageFirebase
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

function tabla(json) {
  var contenedor = document.getElementById('contenedor');
  var contenido = "";
  json.forEach(function (result, i) {
    if (i == 0) {
      contenido += `<div class="p-2">
      <div class = "row">`
    }
    contenido += `
    <div class="card" style="width: 15rem;" >
      <img src="${result.image_url}" class="card-img-top" width="110rem" height="160rem">
      <div class="card-body">
        <h5 class="card-title text-center">${result.name}</h5>
      </div>
    </div>
    `
  });
  contenido += `</div></div>`
  contenedor.innerHTML += contenido;
}