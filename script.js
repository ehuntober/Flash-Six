// document.addEventListener('DOMContentLoaded', function () {
//     const preloader = document.getElementById('preloader');
//     const instructionBox = document.getElementById('instruction-box');
//     const okButton = document.getElementById('ok-button');
//     const startBox = document.getElementById('start-box');
//     const gameContainer = document.getElementById('game-container');
//     const heartsContainer = document.getElementById('hearts');
//     const levelDisplay = document.getElementById('level');
//     const countdownContainer = document.getElementById('countdown-container');
//     const countdownDisplay = document.getElementById('countdown');
//     const colorCircle = document.getElementById('color-circle');
//     const scoreValue = document.getElementById('score-value');
//     const colorBoxes = document.getElementById('color-boxes');
  
//     let score, lives, level, startTime, countdown, countdownInterval;
  
//     function initializeGame() {
//       score = 0;
//       lives = 3;
//       level = 1;
//       startTime = 0;
//       resetGame();
//     }
  
//     function startGame() {
//       startBox.style.display = 'none';
//       gameContainer.style.display = 'block';
//       initializeGame();
//       startTime = new Date();
//       nextRound();
//     }
  
//     function nextRound() {
//       clearInterval(countdownInterval);
  
//       const colors = ['red', 'green', 'yellow', 'blue'];
//       const randomIndex = Math.floor(Math.random() * colors.length);
//       const currentColor = colors[randomIndex];
  
//       colorCircle.style.backgroundColor = currentColor;
//       shuffleColors(colors);
  
//       for (let i = 0; i < colors.length; i++) {
//         const colorBox = document.getElementById(colors[i]);
//         colorBoxes.appendChild(colorBox);
//       }
  
//       countdown = 8;
//       levelDisplay.textContent = 'Level ' + level;
//       startCountdown();
//     }
  
//     function shuffleColors(array) {
//       for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//     }
  
//     colorBoxes.addEventListener('click', function (event) {
//       const selectedColor = event.target.id;
  
//       if (selectedColor === getOppositeColor(colorCircle.style.backgroundColor)) {
//         score += 20;
//         scoreValue.textContent = score;
  
//         if (score % 100 === 0) {
//           level++;
//           showFeedback('Correct! Level Up!', 'green');
//           nextRound();
//         } else {
//           showFeedback('Correct!', 'green');
//           nextRound();
//         }
//       } else {
//         loseLife();
//       }
//     });
  
//     function loseLife() {
//       lives--;
  
//       if (lives === 0) {
//         gameOver();
//       } else {
//         updateHearts();
//         showFeedback('Incorrect! Lose a Life!', 'red');
//         nextRound();
//       }
//     }
  
//     function startCountdown() {
//       countdownDisplay.textContent = countdown;
  
//       countdownInterval = setInterval(function () {
//         countdown--;
  
//         if (countdown <= 0) {
//           clearInterval(countdownInterval);
//           loseLife();
//         } else {
//           countdownDisplay.textContent = countdown;
//         }
//       }, 1000);
//     }
  
//     function updateHearts() {
//       heartsContainer.innerHTML = '';
  
//       for (let i = 0; i < lives; i++) {
//         const heartIcon = document.createElement('i');
//         heartIcon.className = 'fa-solid fa-heart';
//         heartIcon.style.fontSize = '20px';
//         heartIcon.style.color = '#ff0000'; // Adjust color as needed
//         heartsContainer.appendChild(heartIcon);
//       }
//     }
  
//     function getOppositeColor(color) {
//       switch (color) {
//         case 'red':
//           return 'green';
//         case 'green':
//           return 'red';
//         case 'yellow':
//           return 'blue';
//         case 'blue':
//           return 'yellow';
//         default:
//           return '';
//       }
//     }
  
//     function gameOver() {
//       clearInterval(countdownInterval);
  
//       const endTime = new Date();
//       const totalGameTime = (endTime - startTime) / 1000;
  
//       showFeedback('Game Over!', 'red');
  
//       if (level > 1) {
//         countdown -= Math.floor(level / 3);
//       }
  
//       if (score > 200 && level > 5) {
//         countdown -= 1;
//       }
  
//       setTimeout(function () {
//         const popupBox = document.createElement('div');
//         popupBox.className = 'popup-box';
//         popupBox.innerHTML = `
//           <p>Time: ${totalGameTime.toFixed(2)} seconds</p>
//           <p>Level: ${level}</p>
//           <p>Score: ${score}</p>
//           <button id="play-again-button">Play Again</button>
//         `;
//         document.body.appendChild(popupBox);
  
//         const playAgainButton = document.getElementById('play-again-button');
//         playAgainButton.addEventListener('click', function () {
//           document.body.removeChild(popupBox);
//           startGame();
//         });
//       }, 1000);
//     }
  
//     function resetGame() {
//       countdownContainer.style.animation = 'easeOut 1s infinite';
//       scoreValue.textContent = score;
//       updateHearts();
//     }
  
//     function showFeedback(message, color) {
//       const feedbackElement = document.createElement('div');
//       feedbackElement.className = 'feedback';
//       feedbackElement.textContent = message;
//       feedbackElement.style.color = color;
  
//       document.body.appendChild(feedbackElement);
  
//       setTimeout(function () {
//         document.body.removeChild(feedbackElement);
//       }, 1000);
//     }
  
//     initializeGame();
  
//     setTimeout(function () {
//       preloader.style.display = 'none';
//       instructionBox.style.display = 'block';
//     }, 3000);
  
//     okButton.addEventListener('click', function () {
//       instructionBox.style.display = 'none';
//       startBox.style.display = 'block';
//     });
  
//     startBox.addEventListener('click', startGame);
//   });
  



document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const instructionBox = document.getElementById('instruction-box');
    const okButton = document.getElementById('ok-button');
    const startBox = document.getElementById('start-box');
    const gameContainer = document.getElementById('game-container');
    const heartsContainer = document.getElementById('hearts');
    const levelDisplay = document.getElementById('level');
    const countdownContainer = document.getElementById('countdown-container');
    const countdownDisplay = document.getElementById('countdown');
    const colorCircle = document.getElementById('color-circle');
    const scoreValue = document.getElementById('score-value');
    const colorBoxes = document.getElementById('color-boxes');
    const levelSelection = document.getElementById('level-selection');
  
    let score, lives, level, startTime, countdown, countdownInterval, levelTimeout;
  
    function initializeGame() {
      score = 0;
      lives = 3;
      level = 1;
      startTime = 0;
      resetGame();
    }
  
    function startGame() {
      startBox.style.display = 'none';
      gameContainer.style.display = 'block';
      initializeGame();
      startTime = new Date();
      nextRound();
    }
  
    function nextRound() {
      clearInterval(countdownInterval);
      clearTimeout(levelTimeout);
  
      const colors = ['red', 'green', 'yellow', 'blue'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      const currentColor = colors[randomIndex];
  
      colorCircle.style.backgroundColor = currentColor;
      shuffleColors(colors);
  
      for (let i = 0; i < colors.length; i++) {
        const colorBox = document.getElementById(colors[i]);
        colorBoxes.appendChild(colorBox);
      }
  
      countdown = getLevelTimeout(level);
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
  
    function gameOver() {
      clearInterval(countdownInterval);
  
      const endTime = new Date();
      const totalGameTime = (endTime - startTime) / 1000;
  
      showFeedback('Game Over!', 'red');
  
      if (level > 1) {
        countdown -= Math.floor(level / 3);
      }
  
      if (score > 200 && level > 5) {
        countdown -= 1;
      }
  
      setTimeout(function () {
        const popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        popupBox.innerHTML = `
            <p>Time: ${totalGameTime.toFixed(2)} seconds</p>
            <p>Level: ${level}</p>
            <p>Score: ${score}</p>
            <button id="play-again-button">Play Again</button>
          `;
        document.body.appendChild(popupBox);
  
        const playAgainButton = document.getElementById('play-again-button');
        playAgainButton.addEventListener('click', function () {
          document.body.removeChild(popupBox);
          startGame();
        });
      }, 1000);
    }
  
    function resetGame() {
      countdownContainer.style.animation = 'easeOut 1s infinite';
      scoreValue.textContent = score;
      updateHearts();
    }
  
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
          return 8 - Math.floor(level / 3); // Default to easy if not selected
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
      // Update countdown timeout when the level selection changes
      countdown = getLevelTimeout(level);
      clearTimeout(levelTimeout);
      levelTimeout = setTimeout(loseLife, countdown * 1000);
    });
  });
  
