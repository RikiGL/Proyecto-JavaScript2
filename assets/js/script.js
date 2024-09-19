// Manejo de Arreglos, se usa para no estar creando infinitas variables
// para cada gasto. Los arreglos permiten registrar múltiples gastos.
let listaNombresGastos = [];  // Arreglo para almacenar los nombres de los gastos
let listaValoresGasto = [];   // Arreglo para almacenar los valores correspondientes a cada gasto

// Esta función se ejecuta cuando el usuario hace clic en un botón en la interfaz.
// Se encarga de registrar un nuevo gasto.
function clickBoton(){
    // Capturamos la información ingresada por el usuario en los campos de texto del HTML.
    // Usamos el método 'getElementById' para obtener el valor del input con el id 'nombreGasto'.
    let nombreGasto = document.getElementById('nombreGasto').value;
    // Capturamos el valor del gasto, de la misma manera, obteniendo el valor del input con el id 'valorGasto'.
    let valorGasto = document.getElementById('valorGasto').value; 


    // Ejercicio 1
    let valorNumericoGasto = Number(valorGasto);

    if (valorNumericoGasto > 150){
        alert(' Gasto considerablemente alto ')
    }


    // Agregamos el nombre y el valor del gasto a los arreglos respectivos.
    listaNombresGastos.push(nombreGasto);  // Añade el nombre del gasto al final del arreglo.
    listaValoresGasto.push(valorGasto);    // Añade el valor del gasto al final del arreglo.

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

        // Añadimos a la cadena HTML el nombre del gasto, su valor y un botón para eliminarlo.
        // El método 'toFixed(2)' se usa para mostrar el valor con dos decimales.
        htmlLista += `<li> ${elemento} - USD ${valorGasto.toFixed(2)} 
                    <button onclick="eliminarGasto(${posicion}); ">Eliminar</button>
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
}

// Función para eliminar un gasto de la lista.
// Recibe como parámetro la posición del gasto que se desea eliminar.
function eliminarGasto(posicion){
    // Usamos 'splice' para eliminar el nombre del gasto en la posición indicada.
    listaNombresGastos.splice(posicion, 1);
    // También eliminamos el valor correspondiente en la misma posición.
    listaValoresGasto.splice(posicion, 1);
    
    // Actualizamos la lista de gastos después de eliminar el elemento.
    actualizarListaGastos();
}
