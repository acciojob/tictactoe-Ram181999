//your JS code here. If required.

// Global variables
let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';

// Function to handle cell click event
function handleCellClick(event) {
    const cell = event.target;

    // Check if the cell is empty
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            showMessage(`${currentPlayer === 'X' ? player1Name : player2Name} congratulations you won!`);
            disableBoard();
        } else if (checkDraw()) {
            showMessage("It's a draw!");
            disableBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            showMessage(`${currentPlayer === 'X' ? player1Name : player2Name}, you're up!`);
        }
    }
}

// Function to check for a win
function checkWin() {
    const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        const cells = document.querySelectorAll('.cell');
        if (cells[a - 1].textContent && cells[a - 1].textContent === cells[b - 1].textContent && cells[a - 1].textContent === cells[c - 1].textContent) {
            return true;
        }
    }

    return false;
}

// Function to check for a draw
function checkDraw() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        if (!cell.textContent) {
            return false;
        }
    }
    return true;
}

// Function to display a message
function showMessage(message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
}

// Function to disable the board
function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        cell.removeEventListener('click', handleCellClick);
    }
}

// Function to handle the submit button click event
function handleSubmitClick() {
    player1Name = document.getElementById('player-1').value || 'Player 1';
    player2Name = document.getElementById('player-2').value || 'Player 2';

    document.getElementById('player-info').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    showMessage(`${player1Name}, you're up!`);

    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        cell.addEventListener('click', handleCellClick);
    }
}

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', handleSubmitClick);

