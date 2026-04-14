//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1, player2;
let currentPlayer;
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

submitBtn.addEventListener('click', () => {
    player1 = document.getElementById('player-1').value || "Player 1";
    player2 = document.getElementById('player-2').value || "Player 2";
    
    currentPlayer = player1;
    setupDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const clickedCell = e.target;
        const cellIndex = parseInt(clickedCell.id) - 1;

        if (gameState[cellIndex] !== "" || !gameActive) return;

        gameState[cellIndex] = (currentPlayer === player1) ? "x" : "o";
        clickedCell.innerText = gameState[cellIndex];

        checkResult();
    });
});

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            // Highlight winning cells
            [a, b, c].forEach(index => {
                document.getElementById((index + 1).toString()).classList.add('winner');
            });
            break;
        }
    }

    if (roundWon) {
        messageDiv.innerText = `${currentPlayer} congratulations you won!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        messageDiv.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch Player
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    messageDiv.innerText = `${currentPlayer}, you're up`;
}