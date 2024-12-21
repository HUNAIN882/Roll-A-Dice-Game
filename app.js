// Player DOM elements
const player1 = document.querySelector('.playerOne');
const player2 = document.querySelector('.playerTwo');

// Player scores (displayed on the UI)
const player1Score = document.querySelector('#Player1Score');
const player2Score = document.querySelector('#player2Score');
const player1DiceScore = document.querySelector('#player1DiceScore');
const player2DiceScore = document.querySelector('#player2DiceScore');

// Control buttons and dice image
const rollDice = document.querySelector('#rollDice');
const newGame = document.querySelector('#newGame');
const holdScore = document.querySelector('#holdScore');
const diceImg = document.querySelector('.buttons > img');

// Game state variables
let currentPlayer = 1; // Tracks which player's turn it is (1 or 2)
let player1TotalScore = 0; // Player 1's running score for the current round
let player2TotalScore = 0; // Player 2's running score for the current round

// Highlight Player 1 as the active player
const activePlayer1 = () => {
    player1.classList.add('activePlayer');
    player2.classList.remove('activePlayer');
};

// Highlight Player 2 as the active player
const activePlayer2 = () => {
    player2.classList.add('activePlayer');
    player1.classList.remove('activePlayer');
};

// Reset Player 1's round score (used when rolling a 1)
const resetPlayer1 = () => {
    player1TotalScore = 0;
    player1DiceScore.textContent = 0;
};

// Reset Player 2's round score (used when rolling a 1)
const resetPlayer2 = () => {
    player2TotalScore = 0;
    player2DiceScore.textContent = 0;
};

// Disable or Enable Buttons
const updateButtonState = (holdDisable, rollDisable, newGameDisable) => {
    holdScore.disabled = holdDisable;
    rollDice.disabled = rollDisable;
    newGame.disabled = newGameDisable;
};

// Start a new game: Reset scores, UI, and set Player 1 as active
newGame.addEventListener('click', () => {
    // Reset scores and game state
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player1TotalScore = 0;
    player2TotalScore = 0;
    player1DiceScore.textContent = 0;
    player2DiceScore.textContent = 0;

    // Reset game state
    currentPlayer = 1;
    activePlayer1();

    // Reset buttons and dice image
    updateButtonState(true, false, true); // Disable "Hold", enable "Roll Dice", disable "New Game"
    diceImg.src = './assets/1.png'; // Reset dice image
    diceImg.classList.add('diceImg'); // Hide the dice initially
});

// Roll the dice and update the current player's score
rollDice.addEventListener('click', () => {
    // Generate a random dice number (1 to 6)
    const diceNumber = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `./assets/${diceNumber}.png`;
    diceImg.classList.remove('diceImg'); // Show dice image

    if (currentPlayer === 2) {
        activePlayer2();
        player2TotalScore += diceNumber;
        player2DiceScore.textContent = player2TotalScore;
    } else {
        activePlayer1();
        player1TotalScore += diceNumber;
        player1DiceScore.textContent = player1TotalScore;
    }

    // If dice rolls a 1, reset score and switch player, disable "Hold"
    if (diceNumber === 1) {
        if (currentPlayer === 1) {
            resetPlayer1();
            activePlayer2()
        } else {
            resetPlayer2();
            activePlayer1()
        }
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateButtonState(true, false, false); // Disable "Hold", enable "Roll Dice", disable "New Game"
    } else {
        updateButtonState(false, false, false); // Enable "Hold", enable "Roll Dice", disable "New Game"
    }

});

// Hold the score: Add the current player's round score to their total score and switch turns
holdScore.addEventListener('click', () => {
    if (currentPlayer === 2) {
        player2Score.textContent = parseInt(player2Score.textContent || 0) + player2TotalScore;
        player2TotalScore = 0;
        player2DiceScore.textContent = player2TotalScore;

        if (parseInt(player2Score.textContent) >= 100) {
            alert('Player 2 wins the game!');
            updateButtonState(true, true, false); // Disable "Hold" and "Roll Dice", enable "New Game"
            return;
        }

        activePlayer1();
        currentPlayer = 1;
    } else {
        player1Score.textContent = parseInt(player1Score.textContent || 0) + player1TotalScore;
        player1TotalScore = 0;
        player1DiceScore.textContent = player1TotalScore;

        if (parseInt(player1Score.textContent) >= 100) {
            alert('Player 1 wins the game!');
            updateButtonState(true, true, false); // Disable "Hold" and "Roll Dice", enable "New Game"
            return;
        }

        activePlayer2();
        currentPlayer = 2;
    }

    // After holding, disable "Hold" and enable "Roll Dice"
    updateButtonState(true, false, false);
});
