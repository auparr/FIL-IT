let currentQuestion = {};
let mathQuestionActive = false;
let currentCollidingMonster = null; // Track which monster triggered the question
let playerHP = 3; // Health Point system - starts with 3 HP

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

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById("answerInput").value);

  if (userAnswer === currentQuestion.answer) {
    if (window.innerWidth <= 1300) {
      document.getElementById("joystick").style.display = "block";
    }
    // Correct answer - remove the monster and continue game
    if (currentCollidingMonster) {
      // Remove the monster and its vision cone from DOM
      currentCollidingMonster.el.remove();
      currentCollidingMonster.vision.remove();

      // Remove from monsterData array
      const index = monsterData.indexOf(currentCollidingMonster);
      if (index > -1) {
        monsterData.splice(index, 1);
      }

      currentCollidingMonster = null;
    }

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
  } else {
    // Wrong answer - decrease HP but keep the question open
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
