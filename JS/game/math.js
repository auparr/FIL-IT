// =========================
// Game State
// =========================

let currentQuestion = {};
let mathQuestionActive = false;
let currentCollidingMonster = null;
let playerHP = 3;

// =========================
// Math Question Generator
// =========================

const DIFFICULTY = {
  ADDITION: { min: 50, max: 249 },
  SUBTRACTION: { min: 100, max: 299, minDiff: 50 },
  MULTIPLICATION: { min: 1, max: 20 },
  DIVISION: { min: 1, max: 12 },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathQuestion() {
  const operations = [
    { type: "+", generator: generateAddition },
    { type: "-", generator: generateSubtraction },
    { type: "*", generator: generateMultiplication },
    { type: "/", generator: generateDivision },
  ];

  const operation = operations[Math.floor(Math.random() * operations.length)];
  return operation.generator();
}

function generateAddition() {
  const num1 = getRandomInt(DIFFICULTY.ADDITION.min, DIFFICULTY.ADDITION.max);
  const num2 = getRandomInt(DIFFICULTY.ADDITION.min, DIFFICULTY.ADDITION.max);
  return {
    question: `${num1} + ${num2} = ?`,
    answer: num1 + num2,
  };
}

function generateSubtraction() {
  const num1 = getRandomInt(
    DIFFICULTY.SUBTRACTION.min,
    DIFFICULTY.SUBTRACTION.max
  );
  const num2 = getRandomInt(DIFFICULTY.SUBTRACTION.minDiff, num1 - 1);
  return {
    question: `${num1} - ${num2} = ?`,
    answer: num1 - num2,
  };
}

function generateMultiplication() {
  const num1 = getRandomInt(
    DIFFICULTY.MULTIPLICATION.min,
    DIFFICULTY.MULTIPLICATION.max
  );
  const num2 = getRandomInt(
    DIFFICULTY.MULTIPLICATION.min,
    DIFFICULTY.MULTIPLICATION.max
  );
  return {
    question: `${num1} × ${num2} = ?`,
    answer: num1 * num2,
  };
}

function generateDivision() {
  const divisor = getRandomInt(
    DIFFICULTY.DIVISION.min,
    DIFFICULTY.DIVISION.max
  );
  const answer = getRandomInt(DIFFICULTY.DIVISION.min, DIFFICULTY.DIVISION.max);
  const dividend = answer * divisor;
  return {
    question: `${dividend} ÷ ${divisor} = ?`,
    answer: answer,
  };
}

// =========================
// Modal Management
// =========================

function clearModalFeedback() {
  const mathModal = document.getElementById("mathQuestion");
  const oldFeedback = mathModal.querySelectorAll(".question-feedback");
  oldFeedback.forEach((fb) => fb.remove());
}

function resetModalToDefault() {
  const mathModal = document.getElementById("mathQuestion");
  const modalTitle = mathModal.querySelector("h2");
  const modalDescription = mathModal.querySelector("p");

  modalTitle.textContent = "Quick Math!";
  modalDescription.innerHTML = "Answer correctly to escape the monster!";
}

function showMathQuestion(monsterData) {
  if (mathQuestionActive) return;

  mathQuestionActive = true;
  gameRunning = false;
  currentCollidingMonster = monsterData;
  currentQuestion = generateMathQuestion();

  const mathModal = document.getElementById("mathQuestion");
  const questionText = document.getElementById("questionText");
  const answerInput = document.getElementById("answerInput");

  clearModalFeedback();
  resetModalToDefault();

  if (window.innerWidth <= 1300) {
    document.getElementById("joystick").style.display = "none";
  }

  questionText.textContent = currentQuestion.question;
  answerInput.value = "";
  mathModal.style.display = "flex";

  setTimeout(() => answerInput.focus(), 100);
}

function showQuestBoxQuestion() {
  if (mathQuestionActive) return;

  mathQuestionActive = true;
  gameRunning = false;
  window.isQuestBoxQuestion = true;

  currentQuestion = advancedQuestionGenerator();

  const mathModal = document.getElementById("mathQuestion");
  const questionText = document.getElementById("questionText");
  const modalTitle = mathModal.querySelector("h2");
  const modalDescription = mathModal.querySelector("p");
  const answerInput = document.getElementById("answerInput");

  clearModalFeedback();

  if (window.innerWidth <= 1300) {
    document.getElementById("joystick").style.display = "none";
  }

  modalTitle.textContent = "Final Challenge!";
  modalDescription.innerHTML =
    "Solve this to complete your quest!<br><strong>NOTE: Cukup masukkan koefisien jika soalnya berupa integral!</strong>";
  questionText.innerHTML = currentQuestion.question;
  answerInput.value = "";
  mathModal.style.display = "flex";

  if (typeof MathJax !== "undefined" && MathJax.typeset) {
    MathJax.typeset([questionText]);
  }

  setTimeout(() => answerInput.focus(), 100);
}

function hideMathQuestion() {
  const mathModal = document.getElementById("mathQuestion");
  mathModal.style.display = "none";
  clearModalFeedback();
}

// =========================
// Answer Validation & Processing
// =========================

function validateAnswer(inputValue) {
  const trimmed = inputValue.trim();
  if (trimmed === "") {
    return { valid: false, error: "Please enter a number!" };
  }

  const parsed = parseInt(trimmed);
  if (isNaN(parsed)) {
    return { valid: false, error: "Please enter a valid number!" };
  }

  return { valid: true, value: parsed };
}

function checkAnswer() {
  const answerInput = document.getElementById("answerInput");
  const validation = validateAnswer(answerInput.value);

  if (!validation.valid) {
    showQuestionFeedback(validation.error, "warning");
    return;
  }

  if (validation.value === currentQuestion.answer) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer();
  }
}

function checkQuestBoxAnswer() {
  const answerInput = document.getElementById("answerInput");
  const validation = validateAnswer(answerInput.value);

  if (!validation.valid) {
    showQuestionFeedback(validation.error, "warning");
    return;
  }

  if (validation.value === currentQuestion.answer) {
    victory();
  } else {
    handleQuestBoxWrongAnswer();
  }
}

// =========================
// Answer Handlers
// =========================

function handleCorrectAnswer() {
  if (window.innerWidth <= 1300) {
    document.getElementById("joystick").style.display = "block";
  }

  if (window.isQuestBoxQuestion) {
    victory();
    return;
  }

  removeMonster(currentCollidingMonster);
  resetGameState();
  movePlayerToSafePosition();
  requestAnimationFrame(update);

  showFeedback("Correct! Monster defeated!", "success");

  if (monsterData.length === 0) {
    showFeedback("Amazing! You defeated all monsters!", "victory");
  }
}

function handleWrongAnswer() {
  if (window.isQuestBoxQuestion) {
    handleQuestBoxWrongAnswer();
    return;
  }

  decreaseHP();

  if (playerHP <= 0) {
    gameOver();
  } else {
    resetAnswerInput();
    showQuestionFeedback(
      `Wrong! HP: ${playerHP}/3 remaining. Try again!`,
      "damage"
    );
  }
}

function handleQuestBoxWrongAnswer() {
  decreaseHP();

  if (playerHP <= 0) {
    gameOver();
  } else {
    resetAnswerInput();
    showQuestionFeedback(
      `Wrong! HP: ${playerHP}/3 remaining. Try again!`,
      "damage"
    );
  }
}

function resetAnswerInput() {
  const input = document.getElementById("answerInput");
  input.value = "";
  input.focus();
}

// =========================
// Monster Management
// =========================

function removeMonster(monster) {
  if (!monster) return;

  monster.el.remove();
  monster.vision.remove();

  const index = monsterData.indexOf(monster);
  if (index > -1) {
    monsterData.splice(index, 1);
  }
}

function resetGameState() {
  currentCollidingMonster = null;
  hideMathQuestion();
  mathQuestionActive = false;
  gameRunning = true;
}

// =========================
// Player & HP Management
// =========================

function movePlayerToSafePosition() {
  const safeDistance = 80;
  const randomOffsetX = (Math.random() - 0.5) * safeDistance * 2;
  const randomOffsetY = (Math.random() - 0.5) * safeDistance * 2;

  posX = Math.max(
    safeDistance,
    Math.min(
      posX + randomOffsetX,
      gameArea.offsetWidth - player.offsetWidth - safeDistance
    )
  );

  posY = Math.max(
    safeDistance,
    Math.min(
      posY + randomOffsetY,
      gameArea.offsetHeight - player.offsetHeight - safeDistance
    )
  );

  player.style.left = `${posX}px`;
  player.style.top = `${posY}px`;
}

function decreaseHP() {
  playerHP = Math.max(0, playerHP - 1);
  updateHPDisplay();
}

function updateHPDisplay() {
  const hpDisplay = document.getElementById("hpDisplay");
  if (!hpDisplay) return;

  hpDisplay.textContent = `HP: ${playerHP}/3`;
  hpDisplay.className = "hp-display";

  if (playerHP === 1) {
    hpDisplay.classList.add("hp-critical");
  } else if (playerHP === 2) {
    hpDisplay.classList.add("hp-warning");
  } else {
    hpDisplay.classList.add("hp-healthy");
  }
}

function resetHP() {
  playerHP = 3;
  updateHPDisplay();
}

// =========================
// Feedback System
// =========================

const FEEDBACK_COLORS = {
  damage: "#f44336",
  warning: "#FF9800",
  success: "#4CAF50",
  victory: "#FF6B35",
  default: "#f44336",
};

function showQuestionFeedback(message, type) {
  const mathModal = document.getElementById("mathQuestion");
  const existing = mathModal.querySelector(".question-feedback");
  if (existing) existing.remove();

  const feedback = document.createElement("div");
  feedback.className = "question-feedback";
  feedback.textContent = message;
  feedback.style.cssText = `
    background: ${FEEDBACK_COLORS[type] || FEEDBACK_COLORS.default};
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    margin: 10px 0;
    animation: feedbackPulse 0.5s ease-in-out;
    border: 2px solid rgba(255, 255, 255, 0.3);
  `;

  const questionText = document.getElementById("questionText");
  questionText.insertAdjacentElement("afterend", feedback);

  setTimeout(() => {
    if (feedback.parentNode) {
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
    background: ${FEEDBACK_COLORS[type] || FEEDBACK_COLORS.default};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    font-size: 18px;
    z-index: 1001;
    animation: fadeInOut 2s ease-in-out;
  `;

  document.body.appendChild(feedback);

  setTimeout(() => {
    if (feedback.parentNode) {
      feedback.remove();
    }
  }, 2000);
}

// =========================
// Victory System
// =========================

function victory() {
  gameRunning = false;
  mathQuestionActive = false;
  window.isQuestBoxQuestion = false;
  hideMathQuestion();

  const questBox = document.getElementById("questBox");
  if (questBox) questBox.remove();

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
    <h1 style="font-size: 48px; color: #4ecdc4; margin-bottom: 20px; text-shadow: 0 0 20px rgba(78, 205, 196, 0.8);">
      VICTORY!
    </h1>
    <p style="font-size: 24px; margin-bottom: 30px; color: #ffd93d;">
      You completed the quest!
    </p>
    <p style="font-size: 18px; margin-bottom: 40px; color: #ccc;">
      You defeated the monsters and solved the final challenge!
    </p>
    <div class="victory-btn-container">
      <a id="victoryRestartBtn" class="victory-btn restart" href="play.html">Play Again</a>
      <a id="victoryMenuBtn" class="victory-btn menu" href="index.html">Back to Menu</a>
    </div>
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
