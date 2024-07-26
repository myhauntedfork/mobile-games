let playerTwoState = 'O';
const player2 = document.getElementById('player2');
player2.addEventListener('change', function (e) {
    playerTwoState = e.target.value;
});

let playerOneState = 'X';
const player1 = document.getElementById('player1');
player1.addEventListener('change', function (e) {
    playerOneState = e.target.value;
});

const playerChecker = document.getElementById('check-players');

const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = playerOneState;

let gameState = ['', '', '', '', '', '', '', '', ''];

const winningMessage = () => `${currentPlayer} won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `it's ${currentPlayer}'s turn.`;

statusDisplay.innerHTML = currentPlayerTurn() || '';

function handleCellPlayed(clickedCell, clickedCellIndex) {
    console.log(playerOneState, currentPlayer);

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer =
        currentPlayer === playerTwoState ? playerOneState : playerTwoState;
    statusDisplay.innerHTML = currentPlayerTurn();
}

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

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index'),
    );

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    if (playerOneState === playerTwoState) {
        playerChecker.innerHTML = '';
        return;
    } else if (playerOneState !== playerTwoState) {
        playerChecker.innerHTML = '';
    }

    gameActive = true;
    currentPlayer = playerOneState;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
}

handleRestartGame();

document
    .querySelectorAll('.cell')
    .forEach((cell) => cell.addEventListener('click', handleCellClick));
document
    .querySelector('.game-restart')
    .addEventListener('click', handleRestartGame);
