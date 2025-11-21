// =========================
// Quest Box 5-Question System
// =========================

let questBoxQuestions = [];
let currentQuestionIndex = 0;
let isProcessingAnswer = false;

// =========================
// Question Generation
// =========================

function generateQuestBoxQuestions() {
  questBoxQuestions = [];
  for (let i = 0; i < 5; i++) {
    const question = getQuestionForQuestBox();
    console.log("Generated question", i + 1, ":", question);
    questBoxQuestions.push({
      question: question.question,
      answer: question.answer,
    });
  }
  currentQuestionIndex = 0;
  //   console.log("Generated 5 new questions:", questBoxQuestions);
}

function getCurrentQuestBoxQuestion() {
  if (
    questBoxQuestions.length === 0 ||
    currentQuestionIndex >= questBoxQuestions.length
  ) {
    // console.error("No question available at index:", currentQuestionIndex);
    return null;
  }
  return questBoxQuestions[currentQuestionIndex];
}

function hasMoreQuestions() {
  return currentQuestionIndex < questBoxQuestions.length - 1;
}

function moveToNextQuestion() {
  if (hasMoreQuestions()) {
    currentQuestionIndex++;
    console.log("Moving to question", currentQuestionIndex + 1);
    return true;
  }
  return false;
}

// =========================
// Modified Quest Box Display
// =========================

function showQuestBoxQuestion() {
  if (mathQuestionActive && questBoxQuestions.length === 0) return;

  mathQuestionActive = true;
  gameRunning = false;
  window.isQuestBoxQuestion = true;

  if (questBoxQuestions.length === 0) {
    // console.log("Generating new set of 5 questions...");
    generateQuestBoxQuestions();
  }

  const questBoxCurrentQuestion = getCurrentQuestBoxQuestion();

  if (!questBoxCurrentQuestion) {
    // console.error("Failed to get current question!");
    return;
  }

  const mathModal = document.getElementById("mathQuestion");
  const questionText = document.getElementById("questionText");
  const modalTitle = mathModal.querySelector("h2");
  const modalDescription = mathModal.querySelector("p");
  const answerInput = document.getElementById("answerInput");

  clearModalFeedback();

  if (window.innerWidth <= 1300) {
    document.getElementById("joystick").style.display = "none";
  }

  // Update title with progress
  modalTitle.textContent = `Quest Box Challenge!`;
  modalDescription.innerHTML = `
    Question ${currentQuestionIndex + 1} of 5<br>
    <strong style="color: ${getCurrentDifficultyConfig().color};">
      ${getCurrentDifficultyConfig().name} Difficulty - Level ${currentLevel}
    </strong><br>
    <span style="font-size: 12px; color: #888;">
      Jawab menggunakan integer (bilangan bulat)
    </span><br>
    <strong style="font-size:13px;">Note: Cukup masukkan koefisien terdepan untuk soal integral atau turunan!</strong>
  `;

  questionText.innerHTML = questBoxCurrentQuestion.question;
  answerInput.value = "";
  mathModal.style.display = "flex";

  // Render MathJax if available
  if (typeof MathJax !== "undefined" && MathJax.typeset) {
    MathJax.typeset([questionText]);
  }

  // Store in global currentQuestion for validation
  currentQuestion = questBoxCurrentQuestion;

  setTimeout(() => answerInput.focus(), 100);
}

// =========================
// Modified Answer Checking for Quest Box
// =========================

function checkQuestBoxAnswer() {
  if (isProcessingAnswer) {
    console.log("Already processing an answer, please wait...");
    return;
  }

  if (questBoxQuestionsAnswered >= 5) {
    console.log("All questions already answered, ignoring submit");
    return;
  }

  const answerInput = document.getElementById("answerInput");
  const validation = validateAnswer(answerInput.value);

  if (!validation.valid) {
    showQuestionFeedback(validation.error, "warning");
    return;
  }

  // FIX: Get correct answer from the array
  const correctAnswer = questBoxQuestions[currentQuestionIndex].answer;

  //   console.log(
  //     "User answer:",
  //     validation.value,
  //     "Correct answer:",
  //     correctAnswer
  //   );

  if (validation.value === correctAnswer) {
    handleCorrectQuestBoxAnswer();
  } else {
    handleWrongQuestBoxAnswer();
  }
}

function handleCorrectQuestBoxAnswer() {
  isProcessingAnswer = true;

  questBoxQuestionsAnswered++;
  updateLevelDisplay();

  //   console.log(`Correct! Progress: ${questBoxQuestionsAnswered}/5`);

  showQuestionFeedback(`Correct! (${questBoxQuestionsAnswered}/5)`, "success");

  const submitBtn = document.getElementById("submitAnswer");
  const answerInput = document.getElementById("answerInput");
  submitBtn.disabled = true;
  answerInput.disabled = true;
  answerInput.readOnly = true;
  submitBtn.style.opacity = "0.5";

  setTimeout(() => {
    submitBtn.disabled = false;
    answerInput.disabled = false;
    answerInput.readOnly = false;
    submitBtn.style.opacity = "1";

    isProcessingAnswer = false;

    if (hasMoreQuestions()) {
      moveToNextQuestion();
      showQuestBoxQuestion();
    } else {
      console.log("All 5 questions answered! Completing level...");
      completeLevel();
    }
  }, 1500);
}

function handleWrongQuestBoxAnswer() {
  decreaseHP();

  console.log("Wrong answer! HP remaining:", playerHP);

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

// =========================
// Level Completion
// =========================

function completeLevel() {
  console.log("=== LEVEL COMPLETE ===");

  hideMathQuestion();
  mathQuestionActive = false;
  window.isQuestBoxQuestion = false;

  if (window.innerWidth <= 1300) {
    document.getElementById("joystick").style.display = "block";
  }

  playerHP = 3;
  updateHPDisplay();

  const questBox = document.getElementById("questBox");
  if (questBox) questBox.remove();

  showFeedback("Level Complete! HP Restored!", "victory");

  const advancement = advanceToNextLevel();

  //   console.log("Advancement:", advancement);

  setTimeout(() => {
    showLevelCompleteMessage(advancement);
    updateLevelDisplay();
  }, 1000);

  if (advancement.type === "game_complete") {
    setTimeout(() => {
      showGameCompleteScreen();
    }, 3500);
  } else {
    setTimeout(() => {
      resetForNextLevel();
    }, 3500);
  }
}

// =========================
// Reset for Next Level
// =========================

function resetForNextLevel() {
  console.log("=== RESETTING FOR NEXT LEVEL ===");

  questBoxQuestions = [];
  currentQuestionIndex = 0;
  questBoxQuestionsAnswered = 0;
  isProcessingAnswer = false;

  console.log("Reset complete. Questions cleared:", questBoxQuestions.length);

  monsterData.forEach((data) => {
    if (data.el) data.el.remove();
    if (data.vision) data.vision.remove();
  });
  monsterData.length = 0;

  createMonsters();

  movePlayerToSafePosition();

  createQuestBox();

  gameRunning = true;
  requestAnimationFrame(update);
}

// =========================
// Game Complete Screen
// =========================

function showGameCompleteScreen() {
  gameRunning = false;

  const completeScreen = document.createElement("div");
  completeScreen.id = "gameCompleteScreen";
  completeScreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1003;
    color: white;
    font-family: sans-serif;
    text-align: center;
    animation: fadeIn 0.5s ease-out;
  `;

  completeScreen.innerHTML = `
    <div style="font-size: 80px; margin-bottom: 20px;">🏆</div>
    <h1 style="font-size: 56px; color: #FFD700; margin: 0 0 20px 0; text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);">
      CONGRATULATIONS!
    </h1>
    <p style="font-size: 28px; margin: 0 0 15px 0; color: #4ecdc4;">
      You've Mastered All Difficulties!
    </p>
    <p style="font-size: 18px; margin: 0 0 40px 0; color: #ccc; max-width: 600px;">
      You've completed all 20 levels across Easy, Medium, Hard, and Advanced difficulties.<br>
      You are a true Math Champion! 🎓
    </p>
    <div style="display: flex; gap: 20px; margin-top: 20px;">
      <button id="playAgainBtn" style="
        background: linear-gradient(45deg, #4CAF50, #45a049);
        color: white;
        border: none;
        padding: 15px 40px;
        border-radius: 30px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        Play Again
      </button>
      <button id="mainMenuBtn" style="
        background: linear-gradient(45deg, #2196F3, #1976D2);
        color: white;
        border: none;
        padding: 15px 40px;
        border-radius: 30px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        Main Menu
      </button>
    </div>
  `;

  document.body.appendChild(completeScreen);

  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    #playAgainBtn:hover, #mainMenuBtn:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
  `;
  document.head.appendChild(style);

  // Event listeners
  document
    .getElementById("playAgainBtn")
    .addEventListener("pointerdown", () => {
      completeScreen.remove();
      initGame();
    });

  document.getElementById("mainMenuBtn").addEventListener("pointerdown", () => {
    window.location.href = "index.html";
  });
}

// =========================
// Modified handleQuestBoxInteraction
// =========================

function handleQuestBoxInteraction() {
  const questBox = document.getElementById("questBox");
  if (!questBox) return false;

  if (checkCollision(player, questBox)) {
    showQuestBoxQuestion();
    return true;
  }
  return false;
}
