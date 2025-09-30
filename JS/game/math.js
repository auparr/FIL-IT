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
function generateMathQuestion() {
  const operations = ["+", "-", "*", "/"];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let num1, num2, answer;

  switch (operation) {
    case "+":
      num1 = getRandomInt(50, 249);
      num2 = getRandomInt(50, 249);
      answer = num1 + num2;
      break;
    case "-":
      num1 = getRandomInt(100, 299);
      num2 = getRandomInt(50, num1 - 1);
      answer = num1 - num2;
      break;
    case "*":
      num1 = getRandomInt(1, 20);
      num2 = getRandomInt(1, 20);
      answer = num1 * num2;
      break;
    case "/":
      num2 = getRandomInt(1, 12);
      answer = getRandomInt(1, 12);
      num1 = answer * num2;
      break;
  }

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    answer,
  };
}

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// =========================
// Question Modals
// =========================
function showMathQuestion(monsterData) {
  if (mathQuestionActive) return;

  mathQuestionActive = true;
  gameRunning = false;
  currentCollidingMonster = monsterData;
  currentQuestion = generateMathQuestion();

  const mathModal = document.getElementById("mathQuestion");
  const questionText = document.getElementById("questionText");
  const answerInput = document.getElementById("answerInput");

  document.getElementById("joystick").style.display = "none";
  questionText.textContent = currentQuestion.question;
  answerInput.value = "";
  mathModal.style.display = "flex";

  setTimeout(() => answerInput.focus(), 100);
}

function hideMathQuestion() {
  document.getElementById("mathQuestion").style.display = "none";
}

// =========================
// Answer Checking
// =========================
function checkAnswer() {
  console.log("checkAnswer dipanggil");
  const userAnswer = parseInt(document.getElementById("answerInput").value);

  if (userAnswer === currentQuestion.answer) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer();
  }
}

function handleCorrectAnswer() {
  if (window.innerWidth <= 1300) {
    document.getElementById("joystick").style.display = "block";
  }

  if (window.isQuestBoxQuestion) {
    victory();
    return;
  }

  // Remove monster
  currentCollidingMonster.el.remove();
  currentCollidingMonster.vision.remove();

  const index = monsterData.indexOf(currentCollidingMonster);
  if (index > -1) monsterData.splice(index, 1);

  currentCollidingMonster = null;
  hideMathQuestion();
  mathQuestionActive = false;
  gameRunning = true;

  movePlayerToSafePosition();
  requestAnimationFrame(update);
  showFeedback("Correct! Monster defeated!", "success");

  if (monsterData.length === 0) {
    showFeedback("Amazing! You defeated all monsters!", "victory");
  }
}

function handleWrongAnswer() {
  if (window.isQuestBoxQuestion) {
    playerHP--;
    updateHPDisplay();
    showQuestionFeedback("Wrong! Try again!", "damage");
    resetAnswerInput();
    if (playerHP <= 0) {
      gameOver();
    } else {
      resetAnswerInput();
      showQuestionFeedback(
        `Wrong! HP: ${playerHP}/3 remaining. Try again!`,
        "damage"
      );
    }
    return;
  }

  playerHP--;
  updateHPDisplay();

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
// Player & HP
// =========================
function movePlayerToSafePosition() {
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

  player.style.left = `${posX}px`;
  player.style.top = `${posY}px`;
}

function updateHPDisplay() {
  const hpDisplay = document.getElementById("hpDisplay");
  if (!hpDisplay) return;

  hpDisplay.textContent = `HP: ${playerHP}/3`;
  hpDisplay.className = "hp-display";

  if (playerHP === 1) hpDisplay.classList.add("hp-critical");
  else if (playerHP === 2) hpDisplay.classList.add("hp-warning");
  else hpDisplay.classList.add("hp-healthy");
}

function resetHP() {
  playerHP = 3;
  updateHPDisplay();
}

// =========================
// Feedback
// =========================
function showQuestionFeedback(message, type) {
  const mathModal = document.getElementById("mathQuestion");
  const existing = mathModal.querySelector(".question-feedback");
  if (existing) existing.remove();

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

  document
    .getElementById("questionText")
    .insertAdjacentElement("afterend", feedback);
  setTimeout(() => feedback.remove(), 3000);
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
  setTimeout(() => feedback.remove(), 2000);
}

// =========================
// Quest Box
// =========================
function showQuestBoxQuestion() {
  if (mathQuestionActive) return;

  mathQuestionActive = true;
  gameRunning = false;
  window.isQuestBoxQuestion = true;

  currentQuestion = generateMathQuestion();

  const mathModal = document.getElementById("mathQuestion");
  const questionText = document.getElementById("questionText");
  const modalTitle = mathModal.querySelector("h2");
  const modalDescription = mathModal.querySelector("p");
  const answerInput = document.getElementById("answerInput");

  document.getElementById("joystick").style.display = "none";
  modalTitle.textContent = "Final Challenge!";
  modalDescription.textContent = "Solve this to complete your quest!";
  questionText.textContent = currentQuestion.question;
  answerInput.value = "";
  mathModal.style.display = "flex";

  setTimeout(() => answerInput.focus(), 100);
}

function checkQuestBoxAnswer() {
  const userAnswer = parseInt(document.getElementById("answerInput").value);
  if (userAnswer === currentQuestion.answer) {
    victory();
  } else {
    playerHP--;
    resetAnswerInput();
    showQuestionFeedback(
      "Wrong answer! Try again to complete your quest!",
      "damage"
    );
  }
}

// =========================
// Victory
// =========================
function victory() {
  gameRunning = false;
  mathQuestionActive = false;
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
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    z-index: 1000; color: white;
    font-family: sans-serif; text-align: center;
  `;

  victoryScreen.innerHTML = `
    <h1 style="font-size: 48px; color: #4ecdc4; margin-bottom: 20px; text-shadow: 0 0 20px rgba(78, 205, 196, 0.8);">VICTORY!</h1>
    <p style="font-size: 24px; margin-bottom: 30px; color: #ffd93d;">You completed the quest!</p>
    <p style="font-size: 18px; margin-bottom: 40px; color: #ccc;">You defeated the monsters and solved the final challenge!</p>
    <a id="victoryRestartBtn" class="victory-btn restart" href="play.html">Play Again</a>
    <a id="victoryMenuBtn" class="victory-btn menu" href="index.html">Back to Menu</a>
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
