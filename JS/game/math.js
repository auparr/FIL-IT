let currentQuestion = {};
let mathQuestionActive = false;
let currentCollidingMonster = null; // Track which monster triggered the question
let playerHP = 3; // Health Point system - starts with 3 HP

// MATH 1
function generateMathQuestion() {
  const operations = ["+", "-", "*", "/"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let num1, num2, answer;

  switch (operation) {
    case "+":
      num1 = Math.floor(Math.random() * 200) + 50; // range lebih besar
      num2 = Math.floor(Math.random() * 200) + 50;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 200) + 100;
      num2 = Math.floor(Math.random() * (num1 - 50)) + 50; // pastikan hasil positif
      answer = num1 - num2;
      break;
    case "*":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 * num2;
      break;
    case "/":
      num2 = Math.floor(Math.random() * 12) + 1; // pembagi
      answer = Math.floor(Math.random() * 12) + 1;
      num1 = answer * num2; // pastikan hasil bagi bulat
      break;
  }

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer: answer,
  };
}

// MATH COLLIDE WITH MONSTER
function showMathQuestion(monsterData) {
  if (mathQuestionActive) return;

  mathQuestionActive = true;
  gameRunning = false; // Pause the game
  currentCollidingMonster = monsterData; // Store reference to the colliding monster

  currentQuestion = generateMathQuestion();

  // Show math question modal
  const mathModal = document.getElementById("mathQuestion");
  const questionText = document.getElementById("questionText");
  const answerInput = document.getElementById("answerInput");
  document.getElementById("joystick").style.display = "none";

  questionText.textContent = currentQuestion.question;
  answerInput.value = "";
  mathModal.style.display = "flex";

  // Focus on input for immediate typing
  setTimeout(() => answerInput.focus(), 100);
}

//
function checkAnswer() {
  console.log("checkAnswer dipanggil");
  const userAnswer = parseInt(document.getElementById("answerInput").value);

  if (userAnswer === currentQuestion.answer) {
    if (window.innerWidth <= 1300) {
      document.getElementById("joystick").style.display = "block";
    }
    if (window.isQuestBoxQuestion) {
      // Victory!
      victory();
    } else {
      // Correct answer - remove the monster and continue game

      // Remove the monster and its vision cone from DOM
      currentCollidingMonster.el.remove();
      currentCollidingMonster.vision.remove();

      // Remove from monsterData array
      const index = monsterData.indexOf(currentCollidingMonster);
      if (index > -1) {
        monsterData.splice(index, 1);
      }

      currentCollidingMonster = null;

      hideMathQuestion();
      mathQuestionActive = false;
      gameRunning = true;

      // Move player to a safe position
      const safeDistance = 80;
      posX = Math.max(
        safeDistance,
        Math.min(
          posX + (Math.random() - 0.5) * safeDistance * 2,
          gameArea.offsetWidth - player.offsetWidth - safeDistance
        )
      );
      posY = Math.max(
        safeDistance,
        Math.min(
          posY + (Math.random() - 0.5) * safeDistance * 2,
          gameArea.offsetHeight - player.offsetHeight - safeDistance
        )
      );

      player.style.left = posX + "px";
      player.style.top = posY + "px";

      // Resume game loop
      requestAnimationFrame(update);

      // Show success message briefly
      showFeedback("Correct! Monster defeated!", "success");

      // Check if all monsters are defeated
      if (monsterData.length === 0) {
        showFeedback("Amazing! You defeated all monsters!", "victory");
      }
    }
  } else {
    // Wrong answer - decrease HP but keep the question open
    if (window.isQuestBoxQuestion) {
      // For quest box, just show feedback and let them try again?
      showQuestionFeedback("Wrong! Try again!", "damage");
      // Clear input and focus
      document.getElementById("answerInput").value = "";
      document.getElementById("answerInput").focus();
    } else {
      playerHP--;
      updateHPDisplay();

      if (playerHP <= 0) {
        // Game over when HP reaches 0
        gameOver();
      } else {
        // Still have HP left - show feedback but keep question open
        const answerInput = document.getElementById("answerInput");
        answerInput.value = ""; // Clear the wrong answer
        answerInput.focus(); // Refocus for next attempt

        // Show feedback about remaining HP with a temporary overlay
        showQuestionFeedback(
          `Wrong! HP: ${playerHP}/3 remaining. Try again!`,
          "damage"
        );
      }
    }
  }
}

function hideMathQuestion() {
  document.getElementById("mathQuestion").style.display = "none";
}

function updateHPDisplay() {
  const hpDisplay = document.getElementById("hpDisplay");
  if (hpDisplay) {
    hpDisplay.textContent = `HP: ${playerHP}/3`;

    // Add visual feedback based on HP level
    hpDisplay.className = "hp-display";
    if (playerHP === 1) {
      hpDisplay.classList.add("hp-critical");
    } else if (playerHP === 2) {
      hpDisplay.classList.add("hp-warning");
    } else {
      hpDisplay.classList.add("hp-healthy");
    }
  }
}

function resetHP() {
  playerHP = 3;
  updateHPDisplay();
}

function showQuestionFeedback(message, type) {
  // Show feedback inside the math question modal
  const mathModal = document.getElementById("mathQuestion");
  const existingFeedback = mathModal.querySelector(".question-feedback");

  // Remove existing feedback if any
  if (existingFeedback) {
    existingFeedback.remove();
  }

  const feedback = document.createElement("div");
  feedback.className = "question-feedback";
  feedback.textContent = message;
  feedback.style.cssText = `
    background: ${type === "damage" ? "#f44336" : "#FF9800"};
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    margin: 10px 0;
    animation: feedbackPulse 0.5s ease-in-out;
    border: 2px solid rgba(255, 255, 255, 0.3);
  `;

  // Insert feedback after the question text
  const questionText = document.getElementById("questionText");
  questionText.insertAdjacentElement("afterend", feedback);

  // Remove feedback after 3 seconds
  setTimeout(() => {
    if (feedback && feedback.parentNode) {
      feedback.remove();
    }
  }, 3000);
}

function showFeedback(message, type) {
  const feedback = document.createElement("div");
  feedback.className = `feedback ${type}`;
  feedback.textContent = message;
  feedback.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: ${
            type === "success"
              ? "#4CAF50"
              : type === "victory"
              ? "#FF6B35"
              : type === "damage"
              ? "#FF9800"
              : "#f44336"
          };
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          font-size: 18px;
          z-index: 1001;
          animation: fadeInOut 2s ease-in-out;
        `;

  document.body.appendChild(feedback);

  setTimeout(() => {
    document.body.removeChild(feedback);
  }, 2000);
}

function showQuestBoxQuestion() {
  if (mathQuestionActive) return;

  mathQuestionActive = true;
  gameRunning = false;
  window.isQuestBoxQuestion = true; // Flag to identify quest box questions

  currentQuestion = generateMathQuestion();
  // Show math question modal with different text
  const mathModal = document.getElementById("mathQuestion");
  const questionText = document.getElementById("questionText");
  const modalTitle = mathModal.querySelector("h2");
  const modalDescription = mathModal.querySelector("p");
  const answerInput = document.getElementById("answerInput");
  document.getElementById("joystick").style.display = "none";

  // Update modal content for quest box
  modalTitle.textContent = "Final Challenge!";
  modalDescription.textContent = "Solve this to complete your quest!";
  questionText.textContent = currentQuestion.question;
  answerInput.value = "";
  mathModal.style.display = "flex";

  // Focus on input for immediate typing
  setTimeout(() => answerInput.focus(), 100);
}

function checkQuestBoxAnswer() {
  const userAnswer = parseInt(document.getElementById("answerInput").value);

  if (userAnswer === currentQuestion.answer) {
    // Player wins the game!
    victory();
  } else {
    // Wrong answer - show feedback but keep question open
    const answerInput = document.getElementById("answerInput");
    answerInput.value = ""; // Clear the wrong answer
    answerInput.focus(); // Refocus for next attempt

    // Show feedback
    showQuestionFeedback(
      "Wrong answer! Try again to complete your quest!",
      "damage"
    );
  }
}

function victory() {
  gameRunning = false;
  mathQuestionActive = false;
  hideMathQuestion();

  const questBox = document.getElementById("questBox");
  if (questBox) {
    questBox.remove();
  }

  showVictoryScreen();
}

function showVictoryScreen() {
  const victoryScreen = document.createElement("div");
  victoryScreen.id = "victoryScreen";
  victoryScreen.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: white;
    font-family: sans-serif;
    text-align: center;
  `;

  victoryScreen.innerHTML = `
    <h1 style="font-size: 48px; color: #4ecdc4; margin-bottom: 20px; text-shadow: 0 0 20px rgba(78, 205, 196, 0.8);">VICTORY!</h1>
    <p style="font-size: 24px; margin-bottom: 30px; color: #ffd93d;">You completed the quest!</p>
    <p style="font-size: 18px; margin-bottom: 40px; color: #ccc;">You defeated the monsters and solved the final challenge!</p>
    <a id="victoryRestartBtn" style="
      margin: 10px;
      padding: 15px 30px;
      background: linear-gradient(45deg, #4ecdc4, #44a08d);
      border: 2px solid #4ecdc4;
      border-radius: 50px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
    " href="play.html">Play Again</a>
    <a id="victoryMenuBtn" style="
      margin: 10px;
      padding: 15px 30px;
      background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
      border: 2px solid #ff6b6b;
      border-radius: 50px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
    " href="index.html">Back to Menu</a>
  `;

  document.body.appendChild(victoryScreen);

  document
    .getElementById("victoryRestartBtn")
    .addEventListener("pointerdown", initGame);
  document
    .getElementById("victoryMenuBtn")
    .addEventListener("pointerdown", () => {
      window.location.href = "index.html";
    });
}
