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
    TIEMPO_TRANSCURRIDO.innerText = '';

    // Definimos el elemento textbox
    // Vaciamos el elemento textbox
    INPUT_TEXTO.value = '';
    // Definimos el foco en el elemento
    INPUT_TEXTO.focus();
    // Establecemos el manejador de eventos

    // Iniciamos el contador de tiempo
    startTime = new Date().getTime();
});

// al final de nuestro archivo script.js

document.getElementById('playButton').addEventListener('click', () => {
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

function reestablecerTodo(){
    // TIEMPO_TRANSCURRIDO.innerText = message;
    INPUT_TEXTO.disabled = true;
    INPUT_TEXTO.value = '';
    INPUT_TEXTO.setAttribute('placeholder', 'Pon a prueba tu destreza con el teclado!');
}

//Funcion que anima el texto y modifica ciertos parametros del CSS
function animarTexto() {
    document.getElementById('playButton').innerHTML = 'Siguiente';
    INPUT_TEXTO.setAttribute('placeholder', '');
    FRASE_JUEGO.style.animation = '';
    INPUT_TEXTO.disabled = false;
    INPUT_TEXTO.focus();
    FRASE_JUEGO.style.animation = 'fraseAnimar 600ms ease-out';
    FRASE_JUEGO.style.fontSize = '25px';
};

//Funcion que escribe los segundos transcurridos una vez ejecutado el juego
function iniciarCronometro() {
    let minTranscurrido, segTranscurrido, mlsegTranscurrido;
    milisegundos++;

    if (milisegundos > 99) {
        segundos++;
        milisegundos = 0;
    }
    if (segundos > 59) {
        minutos++;
        segundos = 0;
    }

    mlsegTranscurrido = milisegundos;
    segTranscurrido = segundos;
    minTranscurrido = minutos;

    document.getElementById('tiempoTranscurrido').innerHTML = `${minTranscurrido}:${segTranscurrido}`;
    document.getElementById('miliSegundos').innerHTML = `.${mlsegTranscurrido}`;
}

//Funcion que se ejecuta una vez que iniciamos el cronometro
function empezarContador() {
    iniciarCronometro();
    tiempoInicial = setInterval(iniciarCronometro, 10);
    CRON_CLICK.removeEventListener("click", empezarContador);
}

//Variables para cronometro
let h = 0;
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let tiempoInicial = 0;
const CRON_CLICK = document.getElementById("playButton");
CRON_CLICK.addEventListener("click", empezarContador);