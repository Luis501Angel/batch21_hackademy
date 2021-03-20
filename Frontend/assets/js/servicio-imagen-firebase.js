var urlImageFirebase = '';

var firebaseConfig = {
  apiKey: "AIzaSyCW8wYJ5xbXJQoNYpxI4hCV5BGIkiogfkA",
  authDomain: "batch21-hackademy-restaurant.firebaseapp.com",
  projectId: "batch21-hackademy-restaurant",
  storageBucket: "batch21-hackademy-restaurant.appspot.com",
  messagingSenderId: "566603225174",
  appId: "1:566603225174:web:bd6b81b5621355d16303f7"
};
firebase.initializeApp(firebaseConfig);

var authService = firebase.auth();
var storageService = firebase.storage();

window.onload = function () {
  authService.signInAnonymously()
    .catch(function (error) {
      console.error('Detectado error de autenticación', error);
    });
  mostrarSaludo();

  document.getElementById('food-image').addEventListener('change', function (evento) {
    evento.preventDefault();
    var archivo = evento.target.files[0];
    subirArchivo(archivo);
  });
}

var uploadTask;
function subirArchivo(archivo) {
  var refStorage = storageService.ref('images').child(archivo.name);
  uploadTask = refStorage.put(archivo);

  uploadTask.on('state_changed', registrandoEstadoSubida, errorSubida, finSubida);

  function registrandoEstadoSubida(uploadSnapshot) {
    var calculoPorcentaje = (uploadSnapshot.bytesTransferred / uploadSnapshot.totalBytes) * 100;
    calculoPorcentaje = Math.round(calculoPorcentaje);
    registrarPorcentaje(calculoPorcentaje);
  }
  function errorSubida(err) {
    console.log('Error al subir el archivo', err);
  }
  function finSubida() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      urlImageFirebase = downloadURL;
    });
  }

}

function registrarPorcentaje(porcentaje) {
  var elMensaje = document.getElementById('mensaje');
  var textoMensaje = ``
  var textoMensaje = '<p>Porcentaje de subida: ' + porcentaje + '%</p>';
  elMensaje.innerHTML = textoMensaje;
}

