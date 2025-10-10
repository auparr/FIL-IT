const joystick = document.getElementById("joystick");
const joystickKnob = document.getElementById("joystickKnob");
let joystickActive = false;
let joystickDirection = { x: 0, y: 0 };

function initJoystick() {
  let startX, startY;
  const maxDistance = 40;

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

  joystick.addEventListener("touchstart", handleStart, {
    passive: false,
  });
  document.addEventListener("touchmove", handleMove, { passive: false });
  document.addEventListener("touchend", handleEnd, { passive: false });

  joystick.addEventListener("mousedown", handleStart);
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("mouseup", handleEnd);
}
