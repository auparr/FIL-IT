// =========================
// Level System Core
// =========================

// Game Progress State
let currentDifficulty = "easy"; // easy, medium, hard, advanced
let currentLevel = 1; // 1-5
let questBoxQuestionsAnswered = 0; // Track progress in current quest box (0-5)

// Difficulty Configuration
const DIFFICULTY_CONFIG = {
  easy: {
    name: "Easy",
    description: "Basic Functions & Limits",
    generator: easyQuestionGenerator,
    color: "#4CAF50",
  },
  medium: {
    name: "Medium",
    description: "Intermediate Calculus",
    generator: mediumQuestionGenerator,
    color: "#FF9800",
  },
  hard: {
    name: "Hard",
    description: "Advanced Problems",
    generator: hardQuestionGenerator,
    color: "#f44336",
  },
  advanced: {
    name: "Advanced",
    description: "Expert Level",
    generator: advancedQuestionGenerator,
    color: "#9C27B0",
  },
};

// Get difficulty order for progression
const DIFFICULTY_ORDER = ["easy", "medium", "hard", "advanced"];

// =========================
// Level Management Functions
// =========================

function getCurrentDifficultyConfig() {
  return DIFFICULTY_CONFIG[currentDifficulty];
}

function getQuestionForQuestBox() {
  const config = getCurrentDifficultyConfig();
  return config.generator();
}

function isLevelComplete() {
  return questBoxQuestionsAnswered >= 5;
}

function canAdvanceToNextLevel() {
  return currentLevel < 5;
}

function canAdvanceToNextDifficulty() {
  return currentLevel === 5;
}

function advanceToNextLevel() {
  questBoxQuestionsAnswered = 0; // Reset quest box progress

  if (canAdvanceToNextDifficulty()) {
    // Move to next difficulty
    const currentIndex = DIFFICULTY_ORDER.indexOf(currentDifficulty);
    if (currentIndex < DIFFICULTY_ORDER.length - 1) {
      currentDifficulty = DIFFICULTY_ORDER[currentIndex + 1];
      currentLevel = 1;
      return { type: "difficulty", difficulty: currentDifficulty };
    } else {
      // Game completed!
      return { type: "game_complete" };
    }
  } else {
    // Move to next level in same difficulty
    currentLevel++;
    return { type: "level", level: currentLevel };
  }
}

function resetProgress() {
  currentDifficulty = "easy";
  currentLevel = 1;
  questBoxQuestionsAnswered = 0;
}

function getLevelInfo() {
  return {
    difficulty: currentDifficulty,
    difficultyName: DIFFICULTY_CONFIG[currentDifficulty].name,
    level: currentLevel,
    questionsAnswered: questBoxQuestionsAnswered,
    totalQuestions: 5,
    progress: `${questBoxQuestionsAnswered}/5`,
  };
}

// =========================
// Display Functions
// =========================

function updateLevelDisplay() {
  let levelDisplay = document.getElementById("levelDisplay");

  if (!levelDisplay) {
    levelDisplay = document.createElement("div");
    levelDisplay.id = "levelDisplay";
    levelDisplay.style.cssText = `
 ${getCurrentDifficultyConfig().color};
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(levelDisplay);
  }

  const info = getLevelInfo();
  levelDisplay.innerHTML = `
    <div style="font-size: 12px; color: #aaa; text-transform: uppercase; letter-spacing: 1px;">
      ${info.difficultyName} Difficulty
    </div>
    <div style="font-size: 24px; font-weight: bold; margin: 5px 0;">
      Level ${info.level}
    </div>
    <div style="font-size: 14px; color: ${getCurrentDifficultyConfig().color};">
    </div>
  `;
  levelDisplay.style.borderColor = getCurrentDifficultyConfig().color;
}

function showLevelCompleteMessage(advancement) {
  const message = document.createElement("div");
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: white;
    padding: 30px 40px;
    border-radius: 15px;
    font-family: sans-serif;
    z-index: 1002;
    text-align: center;
    border: 3px solid ${getCurrentDifficultyConfig().color};
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    animation: levelCompletePopup 0.5s ease-out;
  `;

  let content = "";

  if (advancement.type === "game_complete") {
    content = `
      <div style="font-size: 48px; margin-bottom: 20px;">🏆</div>
      <h2 style="margin: 0 0 15px 0; color: #FFD700;">GAME COMPLETE!</h2>
      <p style="font-size: 18px; margin: 0; color: #ccc;">
        You've mastered all difficulties!
      </p>
    `;
  } else if (advancement.type === "difficulty") {
    content = `
      <div style="font-size: 48px; margin-bottom: 20px;">⬆️</div>
      <h2 style="margin: 0 0 15px 0; color: ${
        getCurrentDifficultyConfig().color
      };">
        Difficulty Increased!
      </h2>
      <p style="font-size: 18px; margin: 0; color: #ccc;">
        Welcome to <strong>${
          getCurrentDifficultyConfig().name
        }</strong> Difficulty
      </p>
      <p style="font-size: 14px; margin-top: 10px; color: #888;">
        ${getCurrentDifficultyConfig().description}
      </p>
    `;
  } else {
    content = `
      <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
      <h2 style="margin: 0 0 15px 0; color: #4CAF50;">Level Complete!</h2>
      <p style="font-size: 18px; margin: 0; color: #ccc;">
        Moving to Level ${currentLevel}
      </p>
    `;
  }

  message.innerHTML = content;
  document.body.appendChild(message);

  // Add animation style
  if (!document.getElementById("levelCompleteStyle")) {
    const style = document.createElement("style");
    style.id = "levelCompleteStyle";
    style.textContent = `
      @keyframes levelCompletePopup {
        from {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
        }
        to {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Remove after 3 seconds
  setTimeout(() => {
    message.style.animation = "levelCompletePopup 0.3s ease-in reverse";
    setTimeout(() => message.remove(), 300);
  }, 3000);
}

// =========================
// Initialization
// =========================

function initLevelSystem() {
  resetProgress();
  updateLevelDisplay();
}
