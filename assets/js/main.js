//Inicializamos los listeners al cargar la página
window.onload = initListeners;

/*Constantes reutilizables */
//El controlador de abortado de un listener debe estar accesible para las distintas funciones que lo invocan
const controller = new AbortController();
const element1 = document.getElementById("example1");
const element2 = document.getElementById("example2");
const element3 = document.getElementById("example3");
const element4 = document.getElementById("example4");
const element5 = document.getElementById("example5");
const button5 = document.getElementById("example5-desactivate");
const tableExample6 = document.getElementById("table-example6");
const element7Div = document.getElementById("example7-div");
const element7P = document.getElementById("example7-p");
const element7Span = document.getElementById("example7-span");
const element8Div = document.getElementById("example8-div");
const element8P = document.getElementById("example8-p");
const element8Span = document.getElementById("example8-span");
const element9Div = document.getElementById("example9-div");
const element9P = document.getElementById("example9-p");
const element9Span = document.getElementById("example9-span");


/**
 * Inicializa todos los listeners de los ejemplos
 */
function initListeners(){
    console.log("Entrando al método initListeners() sin parámetros");
    // Listener simple que invoca a una función sin parámetros
    element1.addEventListener("click", example1, false);

    // Listener abortable
    element2.addEventListener("click", example2, { signal: controller.signal });

    // Desactivar Listener 
    element3.addEventListener("click", example3, false);

    // Desactivar Listener trabajando con el evento
    element4.addEventListener("click", example4, false);

    /* Desactivar Listener con función anónima o flecha
    * NO FUNCIONA EL DESACTIVADO porque las funciones que se especifican en 
    * add y remove son distintas
    */
    element5.addEventListener("click", () => { 
        example5(element5.innerText);
    }, false);
    // Desactivación del listener del ejercicio 5
    button5.addEventListener("click", desactivateExample5, false);

    // Activar un listener en cada td de la tabla del ejemplo 6
    let rows = tableExample6.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let columns = row.getElementsByTagName("td");
        for (let j = 0; j < columns.length; j++) {
            let cell = columns[j];
            cell.addEventListener("click", example6, false);
        }
    }

    //Ejemplos de captura
    element7Div.addEventListener("click", messageDiv, false);
    element7P.addEventListener("click", messageP, false);
    element7Span.addEventListener("click", messageSpan, false);

    //Ejemplos de burbujeo
    element8Div.addEventListener("click", messageDiv, true);
    element8P.addEventListener("click", messageP, true);
    element8Span.addEventListener("click", messageSpan, true);

    //Ejemplos de burbujeo y captura mezclado
    element9Div.addEventListener("click", messageDiv, true);
    element9P.addEventListener("click", messageP, false);
    element9Span.addEventListener("click", messageSpan, true);

}

/**
 * Funcion que convierte una cadena a número, y le incrementa 1 si es un valor númerico. 
 * @param {String} numberStr   String que se quiere convertir a número e incrementar en 1
 * @return {String} Número incrementado convertido en cadena
 */
 function addOne(numberStr) {
    console.log("Entrando al método addOne recibiendo el parámetro numberStr:"+ numberStr);
    // Se convierte a número el texto
    let currentNumber = new Number(numberStr);
    // Se comprueba que sea un valor númerico 
    if (!isNaN(currentNumber)){
        currentNumber +=1;
    }
    // Se devuelve a cadena de texto
    console.log("Saliendo del método addOne con el resultado:"+ currentNumber);
    return currentNumber.toString();
}

/************ EJEMPLO SIN PARAMETROS ************/
/**
 * Funcion para realizar las operaciones del ejemplo 1 donde se incrementa 1 al valor de un span numérico. 
 */
function example1() {
    console.log("Entrando al método example1 sin parámetros");
    // Se recupera el elemento span
    const element = element1;
    // Se incrementa a 1 el texto númerico que haya contenido en el span
    let currentNumberStr = addOne(element.innerText);
    // se sobreescribe el valor del span con el nuevo número
    element.innerText = currentNumberStr;
    console.log("Saliendo del método example1 con el resultado: "+currentNumberStr);
}


/************ EJEMPLO DE LISTENER CON INTERRUPCIÓN ************/
/**
 * Funcion para realizar las operaciones del ejemplo 2 donde se incrementa 1 al valor de un span numérico 
 * hasta que llega a 3 y entonces el listener es abortado. 
 */
function example2() {
    console.log("Entrando al método example2 sin parámetros");
    // Se recupera el elemento span
    const element = element2;
    // Se incrementa a 1 el texto númerico que haya contenido en el span
    let currentNumberStr = addOne(element.innerText);
    // se sobreescribe el valor del span con el nuevo número
    element.innerText = currentNumberStr;
    if (currentNumberStr === "3"){
        controller.abort();
        console.log("Listener abortado");
    }
    console.log("Saliendo del método example2 con el resultado: "+currentNumberStr);
}

/************ EJEMPLO DE DESACTIVACIÓN DE LISTENER ************/
/**
 * Funcion para realizar las operaciones del ejemplo 3 donde se incrementa 1 al valor de un span numérico 
 * hasta que llega a 3 y entonces el listener es desactivado. 
 */
 function example3() {
    console.log("Entrando al método example3 sin parámetros");
    // Se recupera el elemento span
    const element = element3;
    // Se incrementa a 1 el texto númerico que haya contenido en el span
    let currentNumberStr = addOne(element.innerText);
    // se sobreescribe el valor del span con el nuevo número
    element.innerText = currentNumberStr;
    if (currentNumberStr === "3"){
        element3.removeEventListener("click", example3, false);
        console.log("Listener desactivado");
    }
    console.log("Saliendo del método example3 con el resultado: "+currentNumberStr);
}


/************ EJEMPLO DE DESACTIVACIÓN DE LISTENER TRABAJANDO CON LA INTERFAZ EVENT ************/
/**
 * Funcion para realizar las operaciones del ejemplo 4 donde se incrementa 1 al valor de un span numérico 
 * hasta que llega a 3 y entonces el listener es desactivado. 
 * @param {Event} e Interfaz del evento que ha desencadenado el listener.
 */
 function example4(e) {
    console.log("Entrando al método example4 con parámetro event:"+e);
    // Se recupera el elemento a través de currenTarget que contiene la referencia al elemento
    // que ha invocado el evento.
    const element = e.currentTarget;
    // Se incrementa a 1 el texto númerico que haya contenido en el span
    let currentNumberStr = addOne(element.innerText);
    // se sobreescribe el valor del span con el nuevo número
    element.innerText = currentNumberStr;
    if (currentNumberStr === "3"){
        element.removeEventListener("click", example4, false);
        console.log("Listener desactivado");
    }
    console.log("Saliendo del método example4 con el resultado: "+currentNumberStr);
}


/************ EJEMPLO DE DESACTIVACIÓN DE LISTENER TRABAJANDO CON LA INTERFAZ EVENT ************/
/**
 * Funcion para realizar las operaciones del ejemplo 5 donde se incrementa 1 al valor de un span numérico 
 * hasta que llega a 3 y entonces el listener es desactivado. 
 * @param {String} currentNumberStr Valor en cadena del número actual del span
 */
 function example5(currentNumberStr) {
    console.log("Entrando al método example5 con parámetro currentNumberStr:"+currentNumberStr);

    // Se incrementa a 1 el texto númerico que haya contenido en el span
    let newNumberStr = addOne(currentNumberStr);
    // se sobreescribe el valor del span con el nuevo número
    element5.innerText =  newNumberStr;

    console.log("Saliendo del método example4 con el resultado: "+currentNumberStr);
}

/**
 * Funcion para desactivar el listener
 * NO FUNCIONA PORQUE LA FUNCIÓN FLECHA QUE SE DECLARA AQUÍ ES OTRA INSTACIA. 
 */
function desactivateExample5(){
    console.log("Entrando al metodo desactivateExample5");
    element5.removeEventListener("click", () => { 
        example5(element5.innerText);
    }, false);
    console.log("Saliendo del metodo desactivateExample5");
}



/************ EJEMPLO CREACIÓN DE LISTENER POR CADA TD Y DESACTIVARLO SI SE CUMPLE CONDICIÓN ************/
/**
 * Funcion para realizar las operaciones del ejemplo 6 donde se incrementa 1 al valor de un td numérico 
 * hasta que llega a 3 y entonces el listener es desactivado. 
 */
 function example6(e) {
    console.log("Entrando al método example6 con parámetros e"+e);
    // Se recupera el elemento a través de currenTarget que contiene la referencia al elemento
    // que ha invocado el evento.
    const element = e.currentTarget;
    // Se incrementa a 1 el texto númerico que haya contenido en el span
    let currentNumberStr = addOne(element.innerText);
    // se sobreescribe el valor del span con el nuevo número
    element.innerText = currentNumberStr;
    if (currentNumberStr === "3"){
        element.removeEventListener("click", example6, false);
        console.log("Listener desactivado");
    }
    console.log("Saliendo del método example6 sin resultados");
}

/************ EJEMPLOS CAPTURA Y BURBUJEO ************/
/**
 * Funciones para realizar las operaciones del ejemplo 7 para simular la captura. 
 */
function messageDiv() {
    alert("Evento del <div>");
}

function messageP() {
    alert("Evento del <p>");
}

function messageSpan() {
    alert("Evento del <span>");
}






  





