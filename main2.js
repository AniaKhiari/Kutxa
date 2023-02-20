const nombreUsuario = localStorage.getItem('nombreUsuario');
const contenedor = document.getElementById('contenedor');

if (nombreUsuario) {
  // Obtener el nombre del primer titular
  const mensajeBienvenida = document.createElement('p');
  const tituloBienvenida = document.getElementById('tituloUsuario');
  //document.body.appendChild(mensajeBienvenida);
  mensajeBienvenida.textContent = 'Bienvenido, ' + nombreUsuario;
  tituloBienvenida.appendChild(mensajeBienvenida);
 };


 //Añadir ENTIDAD, IBAN Y NUM.CUENTA:
 const objetoEntidad = [
  {
    entidad: 'BANCO CAM S.A',
    iban: 'ES12',
    numCuenta1: 2009090909202921,
  },
  {
    entidad: 'KutxaBank',
    iban: 'ES52',
    numCuenta1: 3009090909202921,
  },
  {
    entidad: 'Abanca',
    iban: 'ES73',
    numCuenta1: 4009090909202921,
  }
];

// Obtener la tabla por su ID
const table = document.getElementById('miTabla');

const filas = objetoEntidad.map((index) => {
  // Crear una nueva fila
  const nuevaFila = document.createElement('tr');

  const celdaEntidad = document.createElement('td');
  celdaEntidad.textContent = index.entidad;
  nuevaFila.appendChild(celdaEntidad);

  const ibanCelda = document.createElement('td');
  ibanCelda.textContent = index.iban;
  nuevaFila.appendChild(ibanCelda);

  const numCuenta1Cell = document.createElement('td');
  numCuenta1Cell.textContent = index.numCuenta1;
  nuevaFila.appendChild(numCuenta1Cell);
  celdaEntidad.classList.add('b-celda');
  celdaEntidad.addEventListener('click', () => {
      listarMovimientos();
  });
  return nuevaFila;
});

filas.forEach((row) => {
  table.appendChild(row);
});

//Funcionalidad de la celdaEntidad:
function listarMovimientos() {
  let datosGuardados = JSON.parse(localStorage.getItem('datosJSON'));
  // Obtener la tabla por su ID
  const table = document.getElementById('miTabla2');

  datosGuardados.titulares.forEach((titular) => {
    
    const nombreUsuario = titular.nombre;

    titular.cuentas.forEach((cuenta) => {
      cuenta.movimientos.forEach((movimiento) => {
       
        const nuevaFila2 = document.createElement('tr');

        const celdaTipo = document.createElement('td');
        celdaTipo.textContent = movimiento.tipo;
        nuevaFila2.appendChild(celdaTipo);

        const celdaImporte = document.createElement('td');
        celdaImporte.textContent = movimiento.importe;
        nuevaFila2.appendChild(celdaImporte);

        const celdaFecha = document.createElement('td');
        celdaFecha.textContent = movimiento.fecha;
        nuevaFila2.appendChild(celdaFecha);

        // Agregar la fila a la tabla
        table.appendChild(nuevaFila2);
      });
    });
  });
};

//Ordenadr por Fecha o Importe:
let radioSeleccionado;
const radios = document.getElementsByName("ordenamiento");
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", () => {
    if (radios[i].checked) {
      radioSeleccionado = radios[i].value;
      for (let j = 0; j < radios.length; j++) {
        if (i !== j) {
          radios[j].checked = false;
        }
      }
      if (radioSeleccionado === "fecha") {
        ordenarPorFecha(table);
      } else if (radioSeleccionado === "importe") {
        ordenarPorImporte(table);
      }
    }
  });
}

function ordenarPorFecha(table) {
  const rows = Array.from(table.querySelectorAll('tr')).slice(1);
  rows.sort((a, b) => {
    const fechaA = new Date(a.cells[2].textContent);
    const fechaB = new Date(b.cells[2].textContent);
    const importeA = parseFloat(a.cells[1].textContent);
    const importeB = parseFloat(b.cells[1].textContent);
    if (fechaA > fechaB) {
      return 1;
    } else if (fechaA < fechaB) {
      return -1;
    } else {
      return importeB - importeA;
    }
  });
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  rows.forEach(row => {
    table.appendChild(row);
  });
}

function ordenarPorImporte(table) {
  const rows = Array.from(table.querySelectorAll('tr')).slice(1);
  rows.sort((a, b) => {
    const importeA = parseFloat(a.cells[1].textContent);
    const importeB = parseFloat(b.cells[1].textContent);
    const fechaA = new Date(a.cells[2].textContent);
    const fechaB = new Date(b.cells[2].textContent);
    if (importeA > importeB) {
      return -1;
    } else if (importeA < importeB) {
      return 1;
    } else {
      return fechaA - fechaB;
    }
  });
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  rows.forEach(row => {
    table.appendChild(row);
  });
}

 //Boton de cerrar sesión:
const bCerrar=document.getElementById('cerrarSesion');
bCerrar.addEventListener('click',(e)=>{
  const item=e.target;
  if(item){
    window.location.href = "./index.html";
  }
});











