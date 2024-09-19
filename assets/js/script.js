// Manejo de Arreglos, se usa para no estar creando infinitas variables
// para cada gasto, por ello con arreglos los registrara todos
let listaNombresGastos = [];
let listaValoresGasto = [];

// Esta funcion se inicia para el evento del boton (cuando se da click)
function clickBoton(){
    // Esta variable se encargara de capturar informacion
    // del recuadro del html, este tiene un id unico de ese
    // control para identificarlo y controlarlo
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value; 
  
    
    console.log(listaNombresGastos);

    listaNombresGastos.push(nombreGasto);
    listaValoresGasto.push(valorGasto);

    console.log(listaNombresGastos);

    //alert('Click del usuario')
    actualizarListaGastos(); // el forEach tiene los parametros que voy a usar


}

function actualizarListaGastos(){
    const listaElementos = document.getElementById('listaDeGastos')
    const totalElementos = document.getElementById('totalGastos')
    let htmlLista = '';
    let totalGastos = 0;
    // Parametros qe vamos a irles pasando a la funcion
    listaNombresGastos.forEach((elemento,posicion) => {
        const valorGasto = Number(listaValoresGasto[posicion]);
        htmlLista += `<li> ${elemento} - USD ${valorGasto.toFixed(2)} 
                    <button onclick="eliminarGasto(${posicion}); ">Eliminar</button>
                    </li>`;

        
        
        
        // capturar ese elemento ul, traerlo a js, alimentarlo en js y devolverlo a html
    // Calculamos el totla de gastos
    totalGastos += Number(valorGasto);
   
    });
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = ''; 
}

//argumento cuando se llama
//parametro cuando se recibe 
function eliminarGasto(posicion){
    listaNombresGastos.splice(posicion,1);
    listaValoresGasto.splice(posicion,1);
    actualizarListaGastos();

}