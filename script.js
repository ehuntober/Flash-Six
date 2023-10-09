document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const instructionBox = document.getElementById('instruction-box');
    const startBox = document.getElementById('start-box');
    const gameContainer = document.getElementById('game-container');
    const heartsContainer = document.getElementById('hearts');
    const levelDisplay = document.getElementById('level');
    const countdownDisplay = document.getElementById('countdown');
    const colorCircle = document.getElementById('color-circle');
    const scoreValue = document.getElementById('score-value');
    const colorBoxes = document.getElementById('color-boxes');
  
    let score = 0;
    let lives = 3;
    let level = 1;
    let countdown;
  
    preloader.addEventListener('click', function () {
      preloader.style.display = 'none';
      instructionBox.style.display = 'block';
    });
  
    instructionBox.addEventListener('click', function () {
      instructionBox.style.display = 'none';
      startBox.style.display = 'block';
    });
  
    startBox.addEventListener('click', startGame);
  
    function startGame() {
      startBox.style.display = 'none';
      gameContainer.style.display = 'block';
      resetGame();
      nextRound();
    }
  
    function nextRound() {
      const colors = ['red', 'green', 'yellow', 'blue'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      const currentColor = colors[randomIndex];
  
      colorCircle.style.backgroundColor = currentColor;
      shuffleColors(colors);
  
      for (let i = 0; i < colors.length; i++) {
        const colorBox = document.getElementById(colors[i]);
        colorBoxes.appendChild(colorBox);
      }
  
      countdown = 5 - level;
      levelDisplay.textContent = 'Level ' + level;
      startCountdown();
    }
  
    function shuffleColors(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    colorBoxes.addEventListener('click', function (event) {
      const selectedColor = event.target.id;
  
      if (selectedColor === getOppositeColor(colorCircle.style.backgroundColor)) {
        score += 20;
        scoreValue.textContent = score;
  
        if (score % 100 === 0) {
          level++;
          nextRound();
        } else {
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
        nextRound();
      }
    }
  
    function startCountdown() {
      countdownDisplay.textContent = countdown;
  
      const countdownInterval = setInterval(function () {
        countdown--;
  
        if (countdown <= 0) {
          clearInterval(countdownInterval);
          gameOver();
        } else {
          countdownDisplay.textContent = countdown;
        }
      }, 1000);
    }
  
    function updateHearts() {
      heartsContainer.innerHTML = '';
  
      for (let i = 0; i < lives; i++) {
        const heartIcon = document.createElement('span');
        heartIcon.className = 'heart-icon';
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
  
    function gameOver() {
      alert('Game Over! Your final score is ' + score);
      resetGame();
    }
  
    function resetGame() {
      score = 0;
      lives = 3;
      level = 1;
      levelDisplay.textContent = '';
      countdownDisplay.textContent = '';
      updateHearts();
    }
  });
  