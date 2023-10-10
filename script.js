document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const instructionBox = document.getElementById('instruction-box');
    const okButton = document.getElementById('ok-button');
    const startBox = document.getElementById('start-box');
    const gameContainer = document.getElementById('game-container');
    const heartsContainer = document.getElementById('hearts');
    const levelDisplay = document.getElementById('level');
    const countdownDisplay = document.getElementById('countdown');
    const colorCircle = document.getElementById('color-circle');
    const scoreValue = document.getElementById('score-value');
    const colorBoxes = document.getElementById('color-boxes');
    const levelSelection = document.getElementById('level-selection');

    let score, lives, level, countdown, countdownInterval, levelTimeout, gameActive;
    let celebrationSound = new Audio('./celebration.mp3');
    let backgroundSound = new Audio('./background.mp3');
    let clickSound = new Audio('./click.mp3');

    // function initializeGame() {
    //     score = 0;
    //     lives = 3;
    //     level = 1;
    //     gameActive = false;
    // }


    function initializeGame() {
        score = 0;
        lives = 3;
        level = 1;
        startTime = 0;
        resetGame();
        gameActive = true;
        updateHearts(); // Add this line to ensure hearts are displayed initially
    }



    function startGame() {
        startBox.style.display = 'none';
        gameContainer.style.display = 'block';
        initializeGame();
        backgroundSound.play();
        nextRound();
        gameActive = true;
    }

    function nextRound() {
        clearInterval(countdownInterval);
        clearTimeout(levelTimeout);

        const colors = ['red', 'green', 'yellow', 'blue'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const currentColor = colors[randomIndex];

        colorCircle.style.backgroundColor = currentColor;
        shuffleColors(colors);

        colorBoxes.innerHTML = ''; // Clear previous color boxes

        for (let i = 0; i < colors.length; i++) {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.id = colors[i];
            colorBoxes.appendChild(colorBox);
        }

        countdown = getLevelTimeout(level);
        levelDisplay.textContent = `Level ${level} (${levelSelection.value})`;
        startCountdown();
    }

    function shuffleColors(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    colorBoxes.addEventListener('click', function (event) {
        if (!gameActive) {
            return;
        }

        clickSound.play();

        const selectedColor = event.target.id;

        if (selectedColor === getOppositeColor(colorCircle.style.backgroundColor)) {
            score += 20;
            scoreValue.textContent = score;

            if (score % 100 === 0) {
                level++;
                showFeedback('Correct! Level Up!', 'green');
                nextRound();
            } else {
                showFeedback('Correct!', 'green');
                nextRound();
            }
        } else {
            loseLife();
        }
    });

    function loseLife() {
        lives--;

        if (lives === 0) {
            gameOver();
        } else {
            updateHearts();
            showFeedback('Incorrect! Lose a Life!', 'red');
            nextRound();
        }
    }

    function startCountdown() {
        countdownDisplay.textContent = countdown;

        countdownInterval = setInterval(function () {
            countdown--;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                loseLife();
            } else {
                countdownDisplay.textContent = countdown;
            }
        }, 1000);
    }

    // function updateHearts() {
    //     heartsContainer.innerHTML = '';

    //     for (let i = 0; i < lives; i++) {
    //         const heartIcon = document.createElement('i');
    //         heartIcon.className = 'fa-solid fa-heart';
    //         heartIcon.style.fontSize = '20px';
    //         heartIcon.style.color = '#ff0000';
    //         heartsContainer.appendChild(heartIcon);
    //     }
    // }

    function updateHearts() {
        heartsContainer.innerHTML = '';

        for (let i = 0; i < lives; i++) {
            const heartIcon = document.createElement('i');
            heartIcon.className = 'fa-solid fa-heart';
            heartIcon.style.fontSize = '20px';
            heartIcon.style.color = '#ff0000'; // Adjust color as needed
            heartsContainer.appendChild(heartIcon);
        }
    }

    function getOppositeColor(color) {
        switch (color) {
            case 'red':
                return 'green';
            case 'green':
                return 'red';
            case 'yellow':
                return 'blue';
            case 'blue':
                return 'yellow';
            default:
                return '';
        }
    }

    // function gameOver() {
    //     clearInterval(countdownInterval);
    //     backgroundSound.pause();
    //     celebrationSound.play();

    //     const popupBox = document.createElement('div');
    //     popupBox.className = 'popup-box';
    //     popupBox.innerHTML = `
    //         <p>Time: ${countdown}s</p>
    //         <p>Level: ${level}</p>
    //         <p>Score: ${score}</p>
    //         <button id="play-again-button">Play Again</button>
    //     `;
    //     document.body.appendChild(popupBox);

    //     const playAgainButtonPopup = document.getElementById('play-again-button');
    //     playAgainButtonPopup.addEventListener('click', playAgain);
    // }


    // function gameOver() {
    //     clearInterval(countdownInterval);
    //     backgroundSound.pause();
    //     celebrationSound.play();
    
    //     const popupBox = document.createElement('div');
    //     popupBox.className = 'popup-box';
    //     popupBox.innerHTML = `
    //         <p>Time: ${countdown}s</p>
    //         <p>Level: ${level}</p>
    //         <p>Score: ${score}</p>
    //         <button id="play-again-button">Play Again</button>
    //     `;
    //     document.body.appendChild(popupBox);
    
    //     const playAgainButtonPopup = document.getElementById('play-again-button');
    //     playAgainButtonPopup.addEventListener('click', playAgain);
    
    //     function playAgain() {
    //         document.body.removeChild(popupBox);
    //         celebrationSound.pause();
    //         celebrationSound.currentTime = 0;
    //         startGame();
    //     }
    // }


    function gameOver() {
        clearInterval(countdownInterval);
        backgroundSound.pause();
        celebrationSound.play();
    
        const popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        popupBox.innerHTML = `
            <p>Time: ${countdown}s</p>
            <p>Level: ${level}</p>
            <p>Score: ${score}</p>
        `;
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.style.backgroundColor='rgb(240, 44, 240);';
        playAgainButton.id = 'play-again-button';
        playAgainButton.addEventListener('click', playAgain);
        popupBox.appendChild(playAgainButton);
    
        document.body.appendChild(popupBox);
    
        function playAgain() {
            document.body.removeChild(popupBox);
            celebrationSound.pause();
            celebrationSound.currentTime = 0;
            startGame();
        }
    }






    
    

    function resetGame() {
        countdownDisplay.textContent = '';
        scoreValue.textContent = '';
        heartsContainer.innerHTML = '';
        colorBoxes.innerHTML = '';
    }

    // function playAgain() {
    //     const popupBox = document.querySelector('.popup-box');
    //     document.body.removeChild(popupBox);
    //     celebrationSound.pause();
    //     celebrationSound.currentTime = 0;
    //     startGame();
    // }

    function showFeedback(message, color) {
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'feedback';
        feedbackElement.textContent = message;
        feedbackElement.style.color = color;
        document.body.appendChild(feedbackElement);

        setTimeout(function () {
            document.body.removeChild(feedbackElement);
        }, 1000);
    }

    function getLevelTimeout(level) {
        switch (levelSelection.value) {
            case 'easy':
                return 8 - Math.floor(level / 3);
            case 'hard':
                return 6 - Math.floor(level / 3);
            case 'difficult':
                return 4 - Math.floor(level / 3);
            default:
                return 8 - Math.floor(level / 3);
        }
    }

    initializeGame();

    setTimeout(function () {
        preloader.style.display = 'none';
        instructionBox.style.display = 'block';
    }, 3000);

    okButton.addEventListener('click', function () {
        instructionBox.style.display = 'none';
        startBox.style.display = 'block';
    });

    startBox.addEventListener('click', startGame);

    levelSelection.addEventListener('change', function () {
        countdown = getLevelTimeout(level);
        clearTimeout(levelTimeout);
        levelTimeout = setTimeout(loseLife, countdown * 1000);
    });
});
