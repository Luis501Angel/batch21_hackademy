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
    }) .then(response => response.json())
        .then(response => sessionStorage.setItem('key', response.token));
        $('#exampleModal').modal('hide');
}

function redirigir(){
    location.href ="administrator.html";
}

function checkKey() {
    if (sessionStorage.getItem('key')) {
        redirigir()
    }
}

function cerrarSesion() {
    sessionStorage.removeItem('key');
    location.href ="index.html";
}