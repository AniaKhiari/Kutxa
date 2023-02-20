//Variables:
const botones=document.getElementById('botones');
const entrarB=document.getElementById('button');
const inputClave=document.getElementById('pass');
//Eventos

var arrayNumerosCreados = new Array(10);
obtenerDatosJson();
entrarB.addEventListener('click',enviarFormulario);

function redirigir(datosValidos) {
  if (datosValidos) {
    window.location.href = "./titulares.html";
  };
};
function enviarFormulario(e){
  e.preventDefault();
  try {
      let datosGuardados=JSON.parse(localStorage.getItem('datosJSON'));
     if (validarDatos(datosGuardados)) {
      redirigir(true);
     }   
  } catch (error) {
      throw 'No se puede enviar el formulario';
  }
};

function validarDatos(datosGuardados) {
  try {
    const iDni = document.getElementById('dni');
    inputClave.value;
    //Expresiones regulares:
    let regExpDNI = new RegExp("^[0-9]{8}[A-Z]$");
    let regPASS = /^\d{6}$/;

    if (iDni.value === '') {
      throw 'El DNI es un campo obligatorio';
    } else if (!regExpDNI.test(iDni.value)) {
      throw 'El DNI no tiene un formato correcto';
    };
    if (inputClave.value === '') {
      throw 'La clave es un campo obligatorio';
    } else if (!regPASS.test(inputClave.value)) {
      throw 'La clave no tiene un formato correcto';
    };
    //Validamos qué sean el usuario Pepe o Nieves:
    let usuarioValido = false;
    
    /*for (let i = 0; i < datosGuardados.titulares.length; i++) {
      if (datosGuardados.titulares[i].dni == iDni.value && datosGuardados.titulares[i].clave == inputClave.value) {
       alert('Bienvenido ' + datosGuardados.titulares[i].nombre);
        usuarioValido = true;
      }
    };*/
    const resultadoFiltro = datosGuardados.titulares.filter(function(datoGuardado) {
      if (datoGuardado.dni == iDni.value && datoGuardado.clave == inputClave.value) {
        localStorage.setItem('nombreUsuario',datoGuardado.nombre);
        alert('Bienvenido ' + datoGuardado.nombre);
        return true; // El elemento cumple la condición y se añade al resultado
      }
      return false; // El elemento no cumple la condición y se descarta
    });
    
    if (resultadoFiltro.length > 0) {
      // Al menos un elemento cumple la condición
      usuarioValido = true;
    } else {
      // Ningún elemento cumple la condición
      usuarioValido = false;
    };
    
    if (!usuarioValido) {
      throw 'No existe ese usuario';
    }
    return true; // Validación pasada correctamente
  
  }catch (error) {
    alert('ERROR: ' + error);
    return false; // Validación no pasada correctamente
  }
};


  

inputClave.addEventListener('click',()=>{
    botones.textContent = '';
    arrayNumerosCreados = [];
    const botonera=document.createElement('div');
    botonera.classList.add('botones-container');
    for(let i=0; i<10 ;i++){ //!esto es para que genere LA CANTIDAD de 10 botones, no los numeros , cuidado.
        let boton=document.createElement('button');
        let numAle = generarNumeros();
        boton.value = numAle;
        boton.appendChild(document.createTextNode(numAle));
        botonera.appendChild(boton); 
    };
    botones.appendChild(botonera);
});



botones.addEventListener('click', (event) => {
    const boton = event.target;
    if (boton.tagName === 'BUTTON') {
      const numero = boton.value;
      const valorActual = inputClave.value;
      inputClave.value = valorActual + numero;
    }
  });
  

function generarNumeros(){
  let min = 0;
  let max = 9;
  let numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * (max - min + 1) + min);
    } while(arrayNumerosCreados.includes(numeroAleatorio));
  arrayNumerosCreados.push(numeroAleatorio);
  return numeroAleatorio;
};

async function obtenerDatosJson(){
    const respuesta = await fetch('datos.json');
    if (respuesta.ok){
        const datos= await respuesta.json();
        const datosJSON=JSON.stringify(datos);
        //Guardamos en localstorage los datos:
        localStorage.setItem('datosJSON',datosJSON);
    };
};