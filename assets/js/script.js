// Manejo de Arreglos, se usa para no estar creando infinitas variables
// para cada gasto. Los arreglos permiten registrar múltiples gastos.
let listaNombresGastos = [];  // Arreglo para almacenar los nombres de los gastos
let listaValoresGasto = [];   // Arreglo para almacenar los valores correspondientes a cada gasto
let listaDescripcion = []; // ** Segunndo Desafio

let enModoEdicion = false; // Variable para indicar si se está editando un gasto


// Esta función se ejecuta cuando el usuario hace clic en un botón en la interfaz.
// Se encarga de registrar un nuevo gasto.
function clickBoton(){

    if (enModoEdicion) {
        alert('Por favor complete la edición antes de agregar un nuevo gasto.');
        return; // Detiene la ejecución si está en modo de edición
    }


    // Capturamos la información ingresada por el usuario en los campos de texto del HTML.
    // Usamos el método 'getElementById' para obtener el valor del input con el id 'nombreGasto'.
    let nombreGasto = document.getElementById('nombreGasto').value;
    // Capturamos el valor del gasto, de la misma manera, obteniendo el valor del input con el id 'valorGasto'.
    let valorGasto = document.getElementById('valorGasto').value; 
    // ** Capturamos la informacion ingresada por el usuario, obteniendo el valor del input con el id 'descripcionGasto'.
    let descripcionGasto = document.getElementById('descripcionGasto').value; 

    // ** Ejercicio 1
    let valorNumericoGasto = Number(valorGasto);

    if (valorNumericoGasto > 150){
        alert(' Gasto considerablemente alto ')
    } 

    if (nombreGasto == ''|| valorGasto == '' ||descripcionGasto ==  ''){
        alert('Por favor ingrese todo los campos')
        return;

    }

    // Agregamos el nombre y el valor del gasto a los arreglos respectivos.
    listaNombresGastos.push(nombreGasto);  // Añade el nombre del gasto al final del arreglo.
    listaValoresGasto.push(valorGasto);    // Añade el valor del gasto al final del arreglo.
    listaDescripcion.push(descripcionGasto); // ** Añade la descripcion del gasto

    // Llamamos a la función actualizarListaGastos para que se actualice la lista de gastos mostrada en la interfaz.
    actualizarListaGastos();
}

// Función que actualiza la lista de gastos y el total en la interfaz.
function actualizarListaGastos(){
    // Obtenemos el elemento HTML donde se mostrará la lista de gastos.
    const listaElementos = document.getElementById('listaDeGastos');
    // Obtenemos el elemento HTML donde se mostrará el total de los gastos.
    const totalElementos = document.getElementById('totalGastos');
    

    // Inicializamos una cadena vacía que contendrá el HTML para la lista de gastos.
    let htmlLista = '';
    // Inicializamos una variable para almacenar el total de los gastos.
    let totalGastos = 0;

    // Usamos un bucle forEach para recorrer todos los elementos del arreglo 'listaNombresGastos'.
    // Por cada elemento, también obtenemos su posición en el arreglo.
    listaNombresGastos.forEach((elemento, posicion) => {
        // Convertimos el valor del gasto de la posición actual a un número (ya que se captura como texto).
        const valorGasto = Number(listaValoresGasto[posicion]);
        //** Obtenemos la descripcion correspondientes
        const descripcionGasto = listaDescripcion[posicion];

        // Añadimos a la cadena HTML el nombre del gasto, su valor y un botón para eliminarlo.
        // El método 'toFixed(2)' se usa para mostrar el valor con dos decimales.
        htmlLista += `<li> 
                <strong>${elemento}</strong> USD ${valorGasto.toFixed(2)} 
                <strong>${descripcionGasto}</strong>
                <button style="color: white; background-color: red;" onclick="eliminarGasto(${posicion});">Eliminar</button>
                <button style="color: white; background-color: green;" onclick="prepararReemplazo(${posicion}, this);">Reemplazar</button>
            </li>`;


        // Calculamos el total de los gastos sumando el valor actual al acumulador.
        totalGastos += Number(valorGasto);
    });

    // Una vez construido el HTML para la lista, lo asignamos al elemento HTML correspondiente.
    listaElementos.innerHTML = htmlLista;

    // Actualizamos el valor total de los gastos en el elemento correspondiente.
    totalElementos.innerHTML = totalGastos.toFixed(2);

    // Limpiamos los campos de texto para que el usuario pueda ingresar nuevos gastos.
    limpiar();
}

// Función para limpiar los campos de texto de la interfaz después de agregar un gasto.
function limpiar(){
    // Borramos el valor del campo de texto para el nombre del gasto.
    document.getElementById('nombreGasto').value = '';
    // Borramos el valor del campo de texto para el valor del gasto.
    document.getElementById('valorGasto').value = ''; 
    // ** Borra el valor de campo de descripcion del gasto
    document.getElementById('descripcionGasto').value = ''; 
}

// Función para eliminar un gasto de la lista.
// Recibe como parámetro la posición del gasto que se desea eliminar.
function eliminarGasto(posicion){
    // Usamos 'splice' para eliminar el nombre del gasto en la posición indicada.
    listaNombresGastos.splice(posicion, 1);
    // También eliminamos el valor correspondiente en la misma posición.
    listaValoresGasto.splice(posicion, 1);
    //** 
    listaDescripcion.splice(posicion, 1); 
    // Actualizamos la lista de gastos después de eliminar el elemento.
    actualizarListaGastos();
}


/*
function reemplazar (posicion){

    // Capturamos los valores actuales ingresados en los campos de texto
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value; 
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    listaNombresGastos.splice(posicion, 1, nombreGasto );
   
    listaValoresGasto.splice(posicion, 1, valorGasto);
    //** 
    listaDescripcion.splice(posicion, 1, descripcionGasto); 
    
    actualizarListaGastos();

    
}

*/

function prepararReemplazo(posicion, boton) {

    enModoEdicion = true; // Cambia el estado a modo de edición

    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGasto[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcion[posicion];

    // Cambia el texto del botón a "Guardar Cambios"
    boton.innerText = 'Guardar Cambios';
    
    // Al hacer clic en el botón, se guardan los cambios y se restaura el texto original
    boton.onclick = function() {
        let nuevoNombreGasto = document.getElementById('nombreGasto').value;
        let nuevoValorGasto = document.getElementById('valorGasto').value;
        let nuevaDescripcionGasto = document.getElementById('descripcionGasto').value;

        listaNombresGastos[posicion] = nuevoNombreGasto;
        listaValoresGasto[posicion] = nuevoValorGasto;
        listaDescripcion[posicion] = nuevaDescripcionGasto;

        actualizarListaGastos();
        
        // Restaura el texto del botón a "Reemplazar"
        boton.innerText = 'Reemplazar';
        boton.onclick = function() {
            prepararReemplazo(posicion, boton);
        };
        enModoEdicion = false; // Cambia el estado de vuelta a falso
    };
}






// Segundo Desafio
// ** Función para validar el valor del gasto
// Función para validar el valor del gasto
// Función para validar el valor del gasto
function validarValorGasto() {
    let valorGastoInput = document.getElementById('valorGasto');
    let valorGasto = valorGastoInput.value;

    // Permitir solo números y limitar a 5 dígitos
    if (valorGasto.length > 3) {
        valorGastoInput.value = valorGasto.slice(0, 3);
    }
}

// Añadir el evento de 'input' al campo de valor del gasto
document.getElementById('valorGasto').addEventListener('input', validarValorGasto);



