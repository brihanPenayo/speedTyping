// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
    'Cuando hayas eliminado lo imposible, lo que quede, por improbable que sea, debe ser la verdad.',
    'No hay nada más engañoso que un hecho evidente.',
    'A estas alturas debería saber que cuando un hecho parece oponerse a una larga serie de deducciones, invariablemente demuestra ser capaz de soportar alguna otra interpretación.',
    'Nunca hago excepciones. Una excepción refuta la regla.',
    'Lo que un hombre puede inventar, otro puede descubrirlo.',
    'Nada aclara tanto un caso como explicárselo a otra persona.',
    'La educación nunca termina, Watson. Es una serie de lecciones, con la mayor para la última.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const FRASE_JUEGO = document.getElementById('fraseJuego');
const TIEMPO_TRANSCURRIDO = document.getElementById('tiempoTranscurrido');
const INPUT_TEXTO = document.getElementById('inputTexto');

// en el final de nuestro archivo script.js
document.getElementById('playButton').addEventListener('click', () => {
    // elegimos el texto de ejemplo a mostrar
    const textoIndice = Math.floor(Math.random() * textos.length);
    const texto = textos[textoIndice];
    // separamos el texto en un array de palabras
    palabras = texto.split(' ');
    // reestablemos el idice de palabras para el seguimiento
    palabraIndice = 0;

    // Actualizamos la interfaz de usuario
    // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
    const spanPalabras = palabras.map(function (palabra) { return `<span>${palabra} </span>` });
    // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
    FRASE_JUEGO.innerHTML = spanPalabras.join('');
    // Resaltamos la primer palabra
    FRASE_JUEGO.childNodes[0].className = 'highlight';
    // Borramos los mensajes previos
    // TIEMPO_TRANSCURRIDO.innerText = '';

    // Definimos el elemento textbox
    // Vaciamos el elemento textbox
    INPUT_TEXTO.value = '';
    // Definimos el foco en el elemento
    INPUT_TEXTO.focus();
    // Establecemos el manejador de eventos

    // Iniciamos el contador de tiempo
    startTime = new Date().getTime();
});

let tiempoC;
// al final de nuestro archivo script.js
document.getElementById('playButton').addEventListener('click', () => {
    // clearTiempo(tiempoC);
    animarTexto();
    iniciarCronometro();


    INPUT_TEXTO.addEventListener('input', () => {
        // tomamos la palabra actual

        const currentWord = palabras[palabraIndice];
        // tomamos el valor actual
        const typedValue = INPUT_TEXTO.value;
        if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
            // fin de la sentencia
            // Definimos el mensaje de éxito
            reestablecerTodo();
            detenerCronometro();
        } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
            // fin de la palabra
            // vaciamos el valor typedValueElement para la siguiente palabra
            INPUT_TEXTO.value = '';
            // movemos a la palabra siguiente
            palabraIndice++;
            // reiniciamos el estado de todas las clases para los textos
            for (const palabraElement of FRASE_JUEGO.childNodes) {
                palabraElement.className = '';
            }
            // resaltamos la palabra actual
            FRASE_JUEGO.childNodes[palabraIndice].className = 'highlight';
        } else if (currentWord.startsWith(typedValue)) {
            // correcta actual
            // resaltar la siguiente palabra
            INPUT_TEXTO.className = 'classTexto';
        } else {
            // estado error
            INPUT_TEXTO.className = 'error';
        }
    });
});

// ************************************************
//          FUNCION PARA REESTABLECER
// ************************************************
// Aqui volvemos a setear todo como era al principio de la pagina
function reestablecerTodo() {
    INPUT_TEXTO.disabled = true;
    INPUT_TEXTO.value = '';
    INPUT_TEXTO.setAttribute('placeholder', 'Pon a prueba tu destreza con el teclado!');
    detenerCronometro();
}

// ************************************************
//              ANIMACIONES DEL TEXTO
// ************************************************
//Funcion que anima el texto y modifica ciertos parametros del CSS
function animarTexto() {
    document.getElementById('playButton').innerHTML = 'Siguiente';
    INPUT_TEXTO.setAttribute('placeholder', '');
    FRASE_JUEGO.style.animation = '';
    INPUT_TEXTO.disabled = false;
    INPUT_TEXTO.focus();
    FRASE_JUEGO.style.animation = 'fraseAnimar 600ms ease';
    FRASE_JUEGO.style.fontSize = '25px';
};

// ************************************************
//                C R O N O M E T R O              
// ************************************************ 
// Creamos la variable cronometro
let cronometro;

// Funcion detenerCronometro, que limpia el valor del setInterval
function detenerCronometro() {
    clearInterval(cronometro);
}

// Funcion IniciarCronometro, declaramos variables auxiliares para Milisegundos, segundos y minutos
// y lo vamos sumando mediante la funcion setInterval
function iniciarCronometro() {
    detenerCronometro();
    miliseg = 0;
    seg = 0;
    min = 0;
    ms = document.getElementById('milisegundos');
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");
    cronometro = setInterval(
        function () {
            if (miliseg > 99) {
                seg++;
                miliseg = 0;
            }
            if (seg == 60) {
                min++;
                seg = 0;
            }
            miliseg++;
            m.innerHTML = `${min}` + ':';
            s.innerHTML = `${seg}` + ':';
            ms.innerHTML = `${miliseg}`;
        }, 10);
}
