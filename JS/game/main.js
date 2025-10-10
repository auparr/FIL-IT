const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");
const menuBtn = document.getElementById("menuBtn");
let viewportWidth = window.innerWidth;

let gameRunning = true;

function getMonsterCount(viewportWidth) {
  const minMonsters = 5;
  const maxMonsters = 12;

  const scaled = Math.floor(viewportWidth / 200);

  return Math.min(Math.max(scaled, minMonsters), maxMonsters);
}

let monsterCount = getMonsterCount(window.innerWidth);
const monsterData = [];

let posX = 100,
  posY = 100;
const playerSpeed = 4;
let keys = {};

function initGame() {
  gameRunning = true;
  mathQuestionActive = false;
  window.isQuestBoxQuestion = false;
  gameOverScreen.style.display = "none";
  hideMathQuestion();

  initLevelSystem();

  resetHP();

  const existingVictory = document.getElementById("victoryScreen");
  if (existingVictory) {
    existingVictory.remove();
  }

  const existingComplete = document.getElementById("gameCompleteScreen");
  if (existingComplete) {
    existingComplete.remove();
  }

  if (window.innerWidth <= 1300) {
    document.getElementById("joystick").style.display = "block";
  } else {
    document.getElementById("joystick").style.display = "none";
  }

  posX = 100;
  posY = 100;
  player.style.left = posX + "px";
  player.style.top = posY + "px";

  monsterData.length = 0;
  document
    .querySelectorAll(".obstacle, .vision, .quest-box")
    .forEach((el) => el.remove());

  createMonsters();

  createQuestBox();

  update();
}

restartBtn.addEventListener("pointerdown", () => {
  window.location.href = "play.html";
});
menuBtn.addEventListener("pointerdown", () => {
  window.location.href = "index.html";
});

document.getElementById("submitAnswer").addEventListener("pointerdown", () => {
  if (window.isQuestBoxQuestion) {
    checkQuestBoxAnswer();
  } else {
    checkAnswer();
  }
});

initJoystick();

initGame();
