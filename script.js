let cells = document.querySelectorAll('.cell');
let currentPlayer;
let playerX = '';
let playerO = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function startGame() {
    playerX = document.getElementById('playerX').value || 'Giocatore X';
    playerO = document.getElementById('playerO').value || 'Giocatore O';
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    gameActive = true;
    document.getElementById('players').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('winner').classList.add('hidden');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id.split('-')[1]);

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        document.getElementById('winner').textContent = `Vince ${currentPlayer === 'X' ? playerX : playerO}!`;
        document.getElementById('winner').classList.remove('hidden');
        return;
    }

    if (board.every(cell => cell !== '')) {
        document.getElementById('winner').textContent = 'Pareggio!';
        document.getElementById('winner').classList.remove('hidden');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}
