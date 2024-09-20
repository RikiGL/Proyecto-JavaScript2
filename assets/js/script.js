// Manejo de Arreglos, se usa para no estar creando infinitas variables
// para cada gasto. Los arreglos permiten registrar múltiples gastos

// Arreglo para almacenar los nombres de los gastos, precios y descripcion (** Desafio 2)
let listaNombresGastos = [];  
let listaValoresGasto = [];   
let listaDescripcion = []; 
let enModoEdicion = false; // Variable indica si se está editando un gasto

// Funcion ejecuta cuando el usuario hace click al boton de "Agregar Gasto": Registra un nuevo gasto
function clickBoton(){

    if (enModoEdicion) {
        alert('Por favor complete la edición antes de agregar un nuevo gasto.');
        return; // Detiene ejecucion si esta en modo Reemplazar
    }
    // Captura informacion ingresada en los campos del HTML: Usa metodo 'getElementById' para obtener el valor del input 
    // Captura el nombre, valor y descripcion del gasto, obteniendo el valor del input con el id 'nombreGasto', id 'valorGasto', id 'descripcionGasto'
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value; 
    let descripcionGasto = document.getElementById('descripcionGasto').value; 

    let valorNumericoGasto = Number(valorGasto);// ** Desafio 1: Da un mensaje de advertencia si el valor ingresado es mayor a 150
    if (valorNumericoGasto > 150){
        alert(' Gasto considerablemente alto ')
    } 

    if (nombreGasto == ''|| valorGasto == '' ||descripcionGasto ==  ''){
        alert('Por favor ingrese todo los campos')
        return;
    }
    // Agregamos el nombre, valor y descripcion (** Desafio 2) del gasto a los arreglos respectivos
    // Añade nombre, valor, descripcion (** Desafio 2) del gasto al final del arreglo
    listaNombresGastos.push(nombreGasto);  
    listaValoresGasto.push(valorGasto);    
    listaDescripcion.push(descripcionGasto); 
    // Llamamos a funcion actualizarListaGastos para que se actualice la lista de gastos mostrada en la interfaz
    actualizarListaGastos();
}
// Funcion que actualiza la lista de gastos y el total en la interfaz
function actualizarListaGastos(){
    // Obtenemos el elemento HTML donde se mostrará la lista de gastos y el total de los gastos
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    
    // Inicializamos una cadena vacía que contendrá el HTML para la lista de gastos
    let htmlLista = '';
    // Inicializamos una variable para almacenar el total de los gastos
    let totalGastos = 0;

    // Usamos un bucle forEach para recorrer todos los elementos del arreglo 'listaNombresGastos'
    // Por cada elemento, tambien obtenemos su posicion en el arreglo
    listaNombresGastos.forEach((elemento, posicion) => {
        // Convertimos el valor del gasto de la posicion actual a un numero (ya que se captura como texto)
        const valorGasto = Number(listaValoresGasto[posicion]);
        //** Obtenemos la descripcion correspondientes
        const descripcionGasto = listaDescripcion[posicion];

        // Añadimos a la cadena HTML el nombre del gasto, su valor, descripcion y dos botones
        // Metodo 'toFixed(2)' se usa para mostrar el valor con dos decimales
        htmlLista += `<li> 
                <strong>${elemento}</strong> USD ${valorGasto.toFixed(2)} 
                <strong>${descripcionGasto}</strong>
                <button style="color: white; background-color: red;" onclick="eliminarGasto(${posicion});">Eliminar</button>
                <button style="color: white; background-color: green;" onclick="prepararReemplazo(${posicion}, this);">Reemplazar</button>
            </li>`;
        totalGastos += Number(valorGasto); // Calculamos el total de los gastos sumando el valor actual al acumulador
    });

    // Una vez construido el HTML para la lista, lo asignamos al elemento HTML correspondiente
    listaElementos.innerHTML = htmlLista;
    // Actualizamos el valor total de los gastos en el elemento correspondiente
    totalElementos.innerHTML = totalGastos.toFixed(2);
    // Limpiamos los campos de texto para que el usuario pueda ingresar nuevos gastos
    limpiar();
}

// Funcion para limpiar los campos de texto de la interfaz despues de agregar un gasto
function limpiar(){
    // Borramos el valor del campo de texto para el nombre, valor y descripcion (** Desafio 2) del gasto 
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = ''; 
    document.getElementById('descripcionGasto').value = ''; 
}

// Funcion para eliminar un gasto de la lista: Recibe como parametro la posicion del gasto que se desea eliminar
function eliminarGasto(posicion){
    // Usamos 'splice' para eliminar el nombre, valor y descripcion del gastoen la posición indicada
    listaNombresGastos.splice(posicion, 1);
    listaValoresGasto.splice(posicion, 1);
    listaDescripcion.splice(posicion, 1); 

    actualizarListaGastos();
}

// Desafio 3
function prepararReemplazo(posicion, boton) {

    enModoEdicion = true; // Cambia el estado a modo de ediciOn

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
        
        // Restaura el texto del botOn a "Reemplazar"
        boton.innerText = 'Reemplazar';
        boton.onclick = function() {
            prepararReemplazo(posicion, boton);
        };
        enModoEdicion = false; // Cambia el estado de vuelta a falso
    };
}

// Desafio 2
// ** Función para validar el valor del gasto
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



/*
Desafio 2: PRIMERA SOLUCION
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
