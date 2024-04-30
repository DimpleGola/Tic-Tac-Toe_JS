const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
const board = Array(9).fill(null);

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick, { once: true });
});

function handleCellClick(e) {
  const cellIndex = e.target.getAttribute('data-cell-index');
  if (!board[cellIndex]) {
    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      document.getElementById('statusText').textContent = `${currentPlayer} Wins!`;
      return;
    }
    if (!board.includes(null)) {
      document.getElementById('statusText').textContent = 'Draw!';
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === player;
    });
  });
}

document.getElementById('restartButton').addEventListener('click', restartGame);

function restartGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick, { once: true });
  });
  currentPlayer = 'X';
  document.getElementById('statusText').textContent = '';
}
