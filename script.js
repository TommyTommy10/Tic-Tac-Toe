let cells = document.querySelectorAll('.cell');
let currentPlayer;
let playerX = '';
let playerO = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let moveHistory = [];
let score = { X: 0, O: 0 };

function startGame() {
    playerX = document.getElementById('playerX').value || 'Giocatore X';
    playerO = document.getElementById('playerO').value || 'Giocatore O';
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    moveHistory = [];
    document.getElementById('players').classList.add('hidden');
    document.getElementById('scoreboard').classList.remove('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('controls').classList.remove('hidden');
    document.getElementById('winner').classList.add('hidden');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
    updateScoreboardNames();
    updateScoreboard();
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id.split('-')[1]);

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    moveHistory.push(cellIndex);

    if (checkWinner()) {
        gameActive = false;
        document.getElementById('winner').textContent = `Vince ${currentPlayer === 'X' ? playerX : playerO}!`;
        document.getElementById('winner').classList.remove('hidden');
        updateScore();
        setTimeout(startGame, 2000); // Avvia nuova partita automaticamente dopo 2 secondi
        return;
    }

    if (board.every(cell => cell !== '')) {
        document.getElementById('winner').textContent = 'Pareggio!';
        document.getElementById('winner').classList.remove('hidden');
        setTimeout(startGame, 2000); // Avvia nuova partita automaticamente dopo 2 secondi
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

function updateScore() {
    score[currentPlayer]++;
    document.getElementById(`score${currentPlayer}-value`).textContent = score[currentPlayer];
}

function undoMove() {
    if (moveHistory.length > 0 && gameActive) {
        const lastMove = moveHistory.pop();
        board[lastMove] = '';
        document.getElementById(`cell-${lastMove}`).textContent = '';
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function restartGame() {
    startGame();
}

function resetScores() {
    score = { X: 0, O: 0 };
    updateScoreboard();
}

function updateScoreboard() {
    document.getElementById('scoreX-value').textContent = score.X;
    document.getElementById('scoreO-value').textContent = score.O;
}

function updateScoreboardNames() {
    document.getElementById('nameX').textContent = playerX;
    document.getElementById('nameO').textContent = playerO;
}
