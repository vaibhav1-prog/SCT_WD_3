const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-cell-index');

    // Prevent actions if the cell is already filled or the game is inactive
    if (board[index] !== '' || !isGameActive) {
        return;
    }

    // Update the board and display the current player's symbol
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    // Add filled class for animation
    cell.classList.add('filled');

    // Play click sound
    clickSound.play();

    checkResult();
}

// Function to check the result of the game
function checkResult() {
    let roundWon = false;

    // Check all winning conditions
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultDisplay.innerText = `Player ${currentPlayer} wins!`;
        winSound.play();  // Play win sound
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        resultDisplay.innerText = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to restart the game
function restartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    resultDisplay.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('filled');  // Remove animation class
    });
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
