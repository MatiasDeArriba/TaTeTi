/* 
  ====================================================
  Ta-Te-Ti en JavaScript puro
  Autor: Matías De Arriba
  Objetivo: práctica de lógica + proyecto para portfolio QA/Dev
  ====================================================
*/

// Seleccionamos elementos del DOM una sola vez
const cells = document.querySelectorAll(".cell"); // celdas del tablero
const statusText = document.getElementById("game-status"); // texto de estado
const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");
const scoreDrawEl = document.getElementById("score-draw");
const resetRoundBtn = document.getElementById("reset-round");
const resetGameBtn = document.getElementById("reset-game");

// Estado del juego en memoria
let board; // array con 9 posiciones: ["X", "O" o null]
let currentPlayer; // "X" o "O"
let isRoundActive; // indica si la ronda sigue en juego (no hay ganador ni empate)

// Marcador total (se mantiene entre rondas)
const score = {
  X: 0,
  O: 0,
  draw: 0,
};

// Todas las combinaciones ganadoras posibles por índice del array board
const WINNING_COMBINATIONS = [
  [0, 1, 2], // fila superior
  [3, 4, 5], // fila del medio
  [6, 7, 8], // fila inferior
  [0, 3, 6], // columna izquierda
  [1, 4, 7], // columna central
  [2, 5, 8], // columna derecha
  [0, 4, 8], // diagonal principal
  [2, 4, 6], // diagonal secundaria
];

/**
 * Inicializa una nueva ronda del juego:
 * - Tablero vacío
 * - Jugador X siempre comienza
 * - Se limpian las celdas en la interfaz
 */
function startNewRound() {
  // Creamos un array de 9 posiciones con null
  board = Array(9).fill(null);
  currentPlayer = "X";
  isRoundActive = true;

  // Limpiar contenido y clases visuales de las celdas
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning", "disabled");
  });

  updateStatusMessage();
}

/**
 * Actualiza el texto que indica el estado del juego.
 * Si la ronda está activa, muestra de quién es el turno.
 */
function updateStatusMessage(message) {
  if (message) {
    statusText.innerHTML = message;
    return;
  }

  statusText.innerHTML = `Turno de <span class="player-label">${currentPlayer}</span>`;
}

/**
 * Maneja el clic en una celda:
 * - Valida que la ronda siga activa
 * - Valida que la celda no esté ocupada
 * - Registra el movimiento y valida*
