const joystick = document.getElementById("joystick");
const joystickKnob = document.getElementById("joystickKnob");
let joystickActive = false;
let joystickDirection = { x: 0, y: 0 };

// Mobile Joystick Functions
function initJoystick() {
  let startX, startY;
  const maxDistance = 40; // Maximum distance from center

  function handleStart(e) {
    e.preventDefault();
    joystickActive = true;
    const rect = joystick.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;
  }

  function handleMove(e) {
    if (!joystickActive) return;
    e.preventDefault();

    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    const distance = Math.min(
      maxDistance,
      Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    );
    const angle = Math.atan2(deltaY, deltaX);

    const knobX = Math.cos(angle) * distance;
    const knobY = Math.sin(angle) * distance;

    joystickKnob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;

    // Calculate movement direction (normalized)
    joystickDirection.x = distance > 5 ? knobX / maxDistance : 0;
    joystickDirection.y = distance > 5 ? knobY / maxDistance : 0;
  }

  function handleEnd(e) {
    e.preventDefault();
    joystickActive = false;
    joystickKnob.style.transform = "translate(-50%, -50%)";
    joystickDirection.x = 0;
    joystickDirection.y = 0;
  }

  // Touch events
  joystick.addEventListener("touchstart", handleStart, {
    passive: false,
  });
  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("touchend", handleEnd, { passive: false });

  // Mouse events for testing on desktop
  joystick.addEventListener("mousedown", handleStart);
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleEnd);
}

// Create monsters
function createMonsters() {
  for (let i = 0; i < monsterCount; i++) {
    const monster = document.createElement("div");
    monster.classList.add("obstacle");

    // Random position that's not too close to player
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

    // Random initial direction
    let angle = Math.random() * 2 * Math.PI;

    monsterData.push({
      el: monster,
      vision: vision,
      x: x,
      y: y,
      dx: Math.cos(angle) * 2,
      dy: Math.sin(angle) * 2,
      chaseSpeed: 2.5,
      visionRange: 150,
      visionAngle: (60 * Math.PI) / 180,
      isChasing: false,
      direction: angle,
    });
  }
}
