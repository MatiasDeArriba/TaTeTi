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
let board;            // array con 9 posiciones: "X", "O" o null
let currentPlayer;    // "X" o "O"
let isRoundActive;    // indica si la ronda sigue en juego (no hay ganador ni empate)

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
 * - Registra el movimiento y valida ganador/empate
 */
function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index, 10);

  // Si la ronda no está activa o la celda ya está ocupada, no hacemos nada
  if (!isRoundActive || board[index] !== null) return;

  // Guardamos el movimiento en el estado del juego
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("disabled");

  // Verificamos si hay ganador
  const winningCombination = checkWinner();

  if (winningCombination) {
    // Marcamos las celdas ganadoras visualmente
    highlightWinningCells(winningCombination);
    updateStatusMessage(`Jugador <span class="player-label">${currentPlayer}</span> ganó 🎉`);
    isRoundActive = false;
    updateScore(currentPlayer);
    return;
  }

  // Verificamos si hay empate (no quedan celdas vacías)
  if (!board.includes(null)) {
    updateStatusMessage("Empate 😐");
    isRoundActive = false;
    updateScore("draw");
    return;
  }

  // Cambio de turno
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatusMessage();
}

/**
 * Recorre todas las combinaciones ganadoras y
 * devuelve la combinación que ganó, o null si no hay ganador.
 */
function checkWinner() {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;

    if (
      board[a] !== null &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return combination; // devolvemos la combinación ganadora
    }
  }

  return null; // nadie ganó todavía
}

/**
 * Resalta las celdas ganadoras agregando una clase CSS.
 */
function highlightWinningCells(combination) {
  combination.forEach((index) => {
    cells[index].classList.add("winning");
  });
}

/**
 * Actualiza el marcador global y refleja los valores en el DOM.
 */
function updateScore(result) {
  if (result === "X" || result === "O") {
    score[result] += 1;
  } else if (result === "draw") {
    score.draw += 1;
  }

  // Refrescamos el marcador en pantalla
  scoreXEl.textContent = score.X;
  scoreOEl.textContent = score.O;
  scoreDrawEl.textContent = score.draw;
}

/**
 * Resetea solo la ronda actual, pero mantiene el marcador.
 */
function handleResetRound() {
  startNewRound();
}

/**
 * Resetea TODO: ronda + marcador.
 */
function handleResetGame() {
  score.X = 0;
  score.O = 0;
  score.draw = 0;
  updateScore("none"); // llamamos solo para refrescar los números

  startNewRound();
}

/* --------------------------
   LISTENERS INICIALES
--------------------------- */

// Escuchamos clics en cada celda
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Botones de reinicio
resetRoundBtn.addEventListener("click", handleResetRound);
resetGameBtn.addEventListener("click", handleResetGame);

// Iniciar primera ronda al cargar la página
startNewRound();
