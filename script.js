// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const FRASE_JUEGO = document.getElementById('fraseJuego');
const messageElement = document.getElementById('message');
let INPUT_TEXTO = document.getElementById('inputTexto');

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
    messageElement.innerText = '';

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
    FRASE_JUEGO.style.animation='';
    INPUT_TEXTO.disabled = false;
    INPUT_TEXTO.focus();
    FRASE_JUEGO.style.animation='fraseAnimar 600ms ease';
    INPUT_TEXTO.addEventListener('input', () => {
        // tomamos la palabra actual
        const currentWord = palabras[palabraIndice];
        // tomamos el valor actual
        const typedValue = INPUT_TEXTO.value;
        if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
            // fin de la sentencia
            // Definimos el mensaje de éxito
            const elapsedTime = new Date().getTime() - startTime;
            const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;
            messageElement.innerText = message;
            INPUT_TEXTO.disabled = true;
            INPUT_TEXTO.value = '';
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