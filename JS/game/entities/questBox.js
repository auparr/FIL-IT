function createQuestBox() {
  const existingQuestBox = document.querySelector(".quest-box");
  if (existingQuestBox) {
    existingQuestBox.remove();
  }

  const questBox = document.createElement("div");
  questBox.classList.add("quest-box");
  questBox.id = "questBox";

  let x, y;
  do {
    x = Math.random() * (gameArea.offsetWidth - 50);
    y = Math.random() * (gameArea.offsetHeight - 50);
  } while (Math.abs(x - posX) < 150 && Math.abs(y - posY) < 150);

  questBox.style.left = x + "px";
  questBox.style.top = y + "px";

  questBox.style.animation = "questBoxPulse 1s infinite alternate";

  gameArea.appendChild(questBox);
  return questBox;
}

function checkQuestBoxCollision() {
  const questBox = document.getElementById("questBox");
  if (!questBox) return false;

  return checkCollision(player, questBox);
}
