// questBox.js
function createQuestBox() {
  // Remove existing quest box if any
  const existingQuestBox = document.querySelector(".quest-box");
  if (existingQuestBox) {
    existingQuestBox.remove();
  }

  const questBox = document.createElement("div");
  questBox.classList.add("quest-box");
  questBox.id = "questBox";

  // Position quest box away from player and monsters
  let x, y;
  do {
    x = Math.random() * (gameArea.offsetWidth - 50);
    y = Math.random() * (gameArea.offsetHeight - 50);
  } while (Math.abs(x - posX) < 150 && Math.abs(y - posY) < 150);

  questBox.style.left = x + "px";
  questBox.style.top = y + "px";

  // Add pulsing animation
  questBox.style.animation = "questBoxPulse 1s infinite alternate";

  gameArea.appendChild(questBox);
  return questBox;
}

// Check collision with quest box
function checkQuestBoxCollision() {
  const questBox = document.getElementById("questBox");
  if (!questBox) return false;

  return checkCollision(player, questBox);
}

// Handle quest box interaction
function handleQuestBoxInteraction() {
  if (checkQuestBoxCollision()) {
    showQuestBoxQuestion();
    return true;
  }
  return false;
}
