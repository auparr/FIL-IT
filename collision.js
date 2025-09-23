// Collision detection
function checkCollision(player, monster) {
  const playerRect = player.getBoundingClientRect();
  const monsterRect = monster.getBoundingClientRect();

  return !(
    playerRect.right < monsterRect.left ||
    playerRect.left > monsterRect.right ||
    playerRect.bottom < monsterRect.top ||
    playerRect.top > monsterRect.bottom
  );
}
