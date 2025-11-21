function createMonsters() {
  let speed;
  switch (window.difficulty) {
    case "Easy":
      speed = 3.2;
      break;
    case "Medium":
      speed = 3.7;
      break;
    case "Hard":
      speed = 4.2;
    case "Advanced":
      speed = 4.7;
      break;
    default:
      speed = 3.2;
      break;
  }
  for (let i = 0; i < monsterCount; i++) {
    const monster = document.createElement("div");
    monster.classList.add("obstacle");

    let x, y;
    do {
      x = Math.random() * (gameArea.offsetWidth - 50);
      y = Math.random() * (gameArea.offsetHeight - 50);
    } while (Math.abs(x - posX) < 150 && Math.abs(y - posY) < 150);

    monster.style.left = x + "px";
    monster.style.top = y + "px";
    gameArea.appendChild(monster);

    const vision = document.createElement("div");
    vision.classList.add("vision");
    gameArea.appendChild(vision);

    let angle = Math.random() * 2 * Math.PI;

    monsterData.push({
      el: monster,
      vision: vision,
      x: x,
      y: y,
      dx: Math.cos(angle) * 2,
      dy: Math.sin(angle) * 2,
      chaseSpeed: speed,
      visionRange: 150,
      visionAngle: (60 * Math.PI) / 180,
      isChasing: false,
      direction: angle,
    });
  }
}
