function update() {
  if (!gameRunning || mathQuestionActive) return;

  const areaRect = gameArea.getBoundingClientRect();
  let collisionDetected = false;
  let collidedMonsterData = null;

  // Move player (keyboard controls)
  if ((keys["ArrowUp"] || keys["W"] || keys["w"]) && posY > 0)
    posY -= playerSpeed;
  if (
    (keys["ArrowDown"] || keys["s"] || keys["S"]) &&
    posY + player.offsetHeight < areaRect.height
  )
    posY += playerSpeed;
  if ((keys["ArrowLeft"] || keys["a"] || keys["A"]) && posX > 0)
    posX -= playerSpeed;
  if (
    (keys["ArrowRight"] || keys["D"] || keys["d"]) &&
    posX + player.offsetWidth < areaRect.width
  )
    posX += playerSpeed;

  // Move player (joystick controls)
  if (joystickDirection.x !== 0 || joystickDirection.y !== 0) {
    const newX = posX + joystickDirection.x * playerSpeed;
    const newY = posY + joystickDirection.y * playerSpeed;

    if (newX >= 0 && newX + player.offsetWidth <= areaRect.width) {
      posX = newX;
    }
    if (newY >= 0 && newY + player.offsetHeight <= areaRect.height) {
      posY = newY;
    }
  }

  player.style.left = posX + "px";
  player.style.top = posY + "px";

  if (handleQuestBoxInteraction()) {
    return; // Stop game loop for quest box question
  }

  // Update monsters
  monsterData.forEach((data) => {
    const monster = data.el;
    const vision = data.vision;

    // Calculate distance and angle to player
    let dx = posX - data.x;
    let dy = posY - data.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Current direction angle
    let dirAngle = Math.atan2(data.dy, data.dx);
    data.direction = dirAngle;

    // Angle to player
    let playerAngle = Math.atan2(dy, dx);

    // Angle difference
    let angleDiff = Math.abs(dirAngle - playerAngle);
    if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;

    // Check if player is in vision cone
    let canSee =
      distance < data.visionRange && angleDiff < data.visionAngle / 2;

    // Update chasing state
    if (canSee !== data.isChasing) {
      data.isChasing = canSee;
      vision.classList.toggle("chasing", canSee);
      monster.classList.toggle("chasing-monster", canSee);
      monster.classList.toggle("chasing-mouth", canSee);
      monster.style.transform = canSee ? "scale(1.15)" : "scale(1)";
      monster.style.background = canSee
        ? "rgba(208, 6, 6, 1)"
        : "rgba(255, 64, 64, 1)";
    }

    if (canSee) {
      // Chase player
      let normX = dx / distance;
      let normY = dy / distance;
      data.x += normX * data.chaseSpeed;
      data.y += normY * data.chaseSpeed;
      data.dx = normX * 2;
      data.dy = normY * 2;
    } else {
      // Random movement with occasional direction changes
      if (Math.random() < 0.02) {
        let newAngle = data.direction + (Math.random() - 0.5) * 0.5;
        data.dx = Math.cos(newAngle) * 2;
        data.dy = Math.sin(newAngle) * 2;
      }

      data.x += data.dx;
      data.y += data.dy;

      // Bounce off walls
      if (data.x <= 0 || data.x + monster.offsetWidth >= areaRect.width) {
        data.dx *= -1;
      }
      if (data.y <= 0 || data.y + monster.offsetHeight >= areaRect.height) {
        data.dy *= -1;
      }
    }

    // Keep monsters within bounds
    data.x = Math.max(
      0,
      Math.min(data.x, areaRect.width - monster.offsetWidth)
    );
    data.y = Math.max(
      0,
      Math.min(data.y, areaRect.height - monster.offsetHeight)
    );

    // Update monster position
    monster.style.left = data.x + "px";
    monster.style.top = data.y + "px";

    // Update direction indicator
    let deg = Math.atan2(data.dy, data.dx) * (180 / Math.PI);
    monster.style.setProperty("--direction", `${deg + 90}deg`);
    monster.querySelector = null; // Reset for CSS

    // Update vision cone position and rotation
    // Position cone behind the monster based on its direction
    let backX =
      data.x +
      monster.offsetWidth / 2 -
      Math.cos(Math.atan2(data.dy, data.dx)) * -60;
    let backY =
      data.y +
      monster.offsetHeight / 2 -
      Math.sin(Math.atan2(data.dy, data.dx)) * -60;

    vision.style.left = backX - 75 + "px";
    vision.style.top = backY + "px";
    let visionDeg = Math.atan2(data.dy, data.dx) * (180 / Math.PI) - 90;
    vision.style.transform = `rotate(${visionDeg}deg)`;

    // Check collision - store collision info instead of immediately showing question
    if (!collisionDetected && checkCollision(player, monster)) {
      collisionDetected = true;
      collidedMonsterData = data;
    }

    const questBox = document.getElementById("questBox");
    if (questBox && checkCollision(player, questBox)) {
      // Trigger quest box question
      showQuestBoxQuestion();
      return; // Pause the game
    }
  });

  // Handle collision after all monsters are updated
  if (collisionDetected) {
    showMathQuestion(collidedMonsterData);
    return; // Stop the game loop until math question is resolved
  }

  // Continue game loop
  requestAnimationFrame(update);
}
