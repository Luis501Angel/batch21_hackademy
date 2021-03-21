function login() {
    var formulario = document.getElementById('formularioadmin');
    var datos = new FormData(formulario);
    auth = btoa(unescape(encodeURIComponent(datos.get('username') + ':' + datos.get('password'))));
    fetch(apiURL + '/login', {
        method: 'POST', headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": 'Basic ' + auth
        }
    })
        .then(response => response.json())
        .then(json => localStorage.setItem('key', json.token),)
        .then(location.href ="https://restaurant-batch-larr.web.app/administrator.html")
}

function checkKey() {
    if (localStorage.getItem('key')) {
        location.href ="https://restaurant-batch-larr.web.app/administrator.html";
    }
}

function cerrarSesion() {
    localStorage.removeItem('key');
    location.href ="https://restaurant-batch-larr.web.app/index.html";
}