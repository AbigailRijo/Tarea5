var foto;
var btnGuardar = document.getElementById('btnGuardar');
var btnFoto = document.getElementById('btnFoto');
var quizasPersonas = localStorage.getItem('persona');
var photo = document.querySelector('#photo');
var index;
var  estado= 1;
var  video = document.querySelector('#video');

if (quizasPersonas) {

  personas = JSON.parse(quizasPersonas);
}
else {
 personas = [];
}



LlenarTabla();

function Camara() {
  var streaming = false,
      canvas = document.querySelector('#canvas'),

      startbutton = document.querySelector('#startbutton'),
      width = 320,
      height = 0;


  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.getMedia) {
        video.srcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
         video.hidden = false;
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
    foto = data;
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

};

function Persona(cedula, nombre, apellido, telefono, foto) {
  // body...
  this.cedula = cedula;
  this.nombre = nombre;
  this.apellido = apellido;
  this.telefono = telefono;
  this.foto = foto;
}

btnGuardar.addEventListener('click', GuardarDatos);

function GuardarDatos() {
  // body...

  if (estado !== 1) {

  modificar();
}
else if(document.querySelector('#txtCedula ').value == "" || document.querySelector('#txtNombre').value == "" || document.querySelector('#txtApellido').value == ""){
 alert("llene todos los campos");
  
}
else{
  
  var cedula = document.querySelector('#txtCedula').value;
  var nombre = document.querySelector('#txtNombre').value;
  var apellido= document.querySelector('#txtApellido').value;
  var telefono = document.querySelector('#txtTelefono').value;

 // if (foto !== null) {
     var persona1 = new Persona(cedula, nombre, apellido, telefono, foto);
 /* }
    else{ 
      photo.setAttribute('src','desconocido.png');
    }*/
  
 personas.push(persona1);

 localStorage.setItem('persona', JSON.stringify(personas));

 LlenarTabla();
}
}

function LlenarTabla() {
  // body...
 var tBodyTabla = document.querySelector('#tablaRegistros tbody');

   tBodyTabla.innerHTML = '';

     video.hidden = true;
    
    for (var i = 0; i < personas.length; i++) {

      var fila = document.createElement('tr');
      var celdaCedula = document.createElement('td');
      var celdaNombre = document.createElement('td');
      var celdaApellido = document.createElement('td');
      var celdaTelefono = document.createElement('td');
      var celdaAction= document.createElement('td');
      var celdaFoto = document.createElement('td');

      celdaCedula.innerHTML= personas[i].cedula;
      celdaNombre.innerHTML= personas[i].nombre;
      celdaApellido.innerHTML= personas[i].apellido;
      celdaTelefono.innerHTML=personas[i].telefono;
      celdaAction.innerHTML= "<img src='edit.png' onClick= 'llenarFormularios("+i+")'' class='btnEdit' alt='Edit" + i + "'/>&nbsp &nbsp<img src='delete.png'  onClick='eliminar("+i+")'' class='btnDelete'/>"     
      

  fila.appendChild(celdaCedula);
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaApellido);
      fila.appendChild(celdaTelefono);
     

if (personas[i].foto) {
   var img = document.createElement('img');
    img.setAttribute('width','50');
    img.setAttribute('height','50');
    img.setAttribute('src', personas[i].foto);
    celdaFoto.appendChild(img);
    fila.appendChild(celdaFoto);
  }else{
    console.log('entre aqui pendeja');
    var img = document.createElement('img');
    img.setAttribute('width','50');
    img.setAttribute('height','50');
    img.setAttribute('src','desconocido.png');
    celdaFoto.appendChild(img);
    fila.appendChild(celdaFoto);
  }

  fila.appendChild(celdaAction);
  tBodyTabla.appendChild(fila);
  foto = "";
       }
document.querySelector("form").reset();
    photo.removeAttribute('src');
        // LimpiarColumnas();
}


function eliminar(indice) {
  // body...
     personas.splice(indice, 1);
     localStorage.setItem('persona', JSON.stringify(personas));

     LlenarTabla();
}

function llenarFormularios(indice){
   
    index= indice;
  var persona1= personas[indice];
//body
   document.querySelector('#txtCedula').value = persona1.cedula;
   document.querySelector('#txtNombre').value = persona1.nombre;
   document.querySelector('#txtApellido').value= persona1.apellido;
   document.querySelector('#txtTelefono').value = persona1.telefono;
   photo.setAttribute('src',persona1.foto);
    
 estado= 2;
}


function modificar() {
  // body...

 if(document.querySelector('#txtCedula ').value == "" || document.querySelector('#txtNombre').value == "" || document.querySelector('#txtApellido').value == ""){
 alert("llene todos los campos");
  
}
else{
  var cedula = document.querySelector('#txtCedula ').value;
  var nombre = document.querySelector('#txtNombre').value;
  var apellido = document.querySelector('#txtApellido').value;
  var telefono = document.querySelector('#txtTelefono').value;

if (foto) {
 var persona2 = new Persona(cedula,nombre,apellido, telefono, foto);

}
else{
  var persona2 = new Persona(cedula,nombre,apellido, telefono, personas[index].foto);
}

   personas[index] = (persona2);

    localStorage.setItem('persona', JSON.stringify(personas));    

    estado= 1;
    LlenarTabla();
  
}
}

btnFoto.addEventListener('click', Camara);
