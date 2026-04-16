//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let p1Name, p2Name;
let currentPlayer;
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

submitBtn.addEventListener('click', () => {
    p1Name = document.getElementById('player1').value || "Player1";
	p2Name = document.getElementById('player2').value || "Player2";

    currentPlayer = p1Name;

    setupDiv.style.display = 'none';
    gameDiv.style.display = 'block';

    messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        const index = parseInt(this.id) - 1;

        if (gameState[index] !== "" || !gameActive) return;

        const symbol = (currentPlayer === p1Name) ? "x" : "o";
        gameState[index] = symbol;
        this.innerText = symbol;

        const winCombo = checkWin();

        if (winCombo) {
            messageDiv.innerText = `${currentPlayer} congratulations you won!`;
            gameActive = false;

            winCombo.forEach(i => {
                cells[i].classList.add('winner');
            });

        } else if (!gameState.includes("")) {
            messageDiv.innerText = "Draw!";
            gameActive = false;
        } else {
            currentPlayer = (currentPlayer === p1Name) ? p2Name : p1Name;
            messageDiv.innerText = `${currentPlayer}, you're up`;
        }
    });
});

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            return condition; //
        }
    }
    return null;
}