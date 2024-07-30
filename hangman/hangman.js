document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const guessButton = document.getElementById('guess-button');
    const secretWordInput = document.getElementById('secret-word');
    const wordDisplay = document.getElementById('word-display');
    const livesDisplay = document.getElementById('lives');
    const guessInput = document.getElementById('guess-input');
    const setupContainer = document.getElementById('setup-container');
    const gameplayContainer = document.getElementById('gameplay-container');
    const restartButton = document.getElementById('restart-button');
    const lifeSlider = document.getElementById('life-slider');
    const lifeValueDisplay = document.getElementById('life-value');

    let secretWord = '';
    let guessedLetters = new Set();
    let lives = parseInt(lifeSlider.value);

    lifeSlider.addEventListener('input', () => {
        lifeValueDisplay.textContent = lifeSlider.value;
    });

    startButton.addEventListener('click', () => {
        secretWord = secretWordInput.value.toLowerCase();
        lives = parseInt(lifeSlider.value);
        if (secretWord) {
            setupContainer.classList.add('hidden');
            gameplayContainer.classList.remove('hidden');
            restartButton.classList.remove('hidden');
            livesDisplay.innerHTML = `Lives: ${lives}`;
            guessedLetters = new Set();
            updateWordDisplay();
        }
    });

    guessButton.addEventListener('click', () => {
        const guess = guessInput.value.toLowerCase();
        if (guess && !guessedLetters.has(guess)) {
            guessedLetters.add(guess);
            if (!secretWord.includes(guess)) {
                lives--;
                livesDisplay.innerHTML = `Lives: ${lives}`;
            }
            updateWordDisplay();
            checkGameStatus();
        }
        guessInput.value = '';
    });

    function updateWordDisplay() {
        const display = Array.from(secretWord)
            .map((letter) => (guessedLetters.has(letter) ? letter : '_'))
            .join(' ');
        wordDisplay.textContent = display;
    }

    function checkGameStatus() {
        if (lives <= 0) {
            livesDisplay.innerHTML = `Out of lives. The word was<br>'${secretWord}'`;
            guessButton.disabled = true;
            guessInput.disabled = true;
        } else if (
            Array.from(secretWord).every((letter) => guessedLetters.has(letter))
        ) {
            livesDisplay.textContent = 'You guessed the secret word!';
            guessButton.disabled = true;
            guessInput.disabled = true;
        }
    }

    lifeValueDisplay.textContent = lifeSlider.value;
});
