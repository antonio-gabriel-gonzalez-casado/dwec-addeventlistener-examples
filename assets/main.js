//Inicializamos los listeners al cargar la página
window.onload = initListeners;

//El controlador de abortado de un listener debe estar accesible para las distintas funciones que lo invocan
const controller = new AbortController();

/**
 * Inicializa todos los listeners de los ejemplos
 */
function initListeners(){
    console.log("Entrando al método initListeners() sin parámetros");
    // Listener simple que invoca a una función sin parámetros
    const element1 = document.getElementById("example1");
    element1.addEventListener("click", example1, false);
    console.log("Saliendo del método initListeners()");

    // Listener abortable
    const element2 = document.getElementById("example2");
    element2.addEventListener("click", example2, { signal: controller.signal });
    console.log("Saliendo del método initListeners()");
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
    const element = document.getElementById("example1");
    // Se incrementa a 1 el texto númerico que haya contenido en el span
    let currentNumberStr = addOne(element.innerText);
    // se sobreescribe el valor del span con el nuevo número
    element.innerText = currentNumberStr;
    console.log("Saliendo del método example2 con el resultado: "+currentNumberStr);
}


/************ EJEMPLO DE LISTENER CON INTERRUPCIÓN ************/
/**
 * Funcion para realizar las operaciones del ejemplo 2 donde se incrementa 1 al valor de un span numérico hasta que llega a 3 y entonces el listner es abortado. 
 */
function example2() {
    console.log("Entrando al método example1 sin parámetros");
    // Se recupera el elemento span
    const element = document.getElementById("example2");
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






  





