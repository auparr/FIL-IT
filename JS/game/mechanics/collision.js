function checkCollision(player, entity) {
  const playerRect = player.getBoundingClientRect();
  const monsterRect = entity.getBoundingClientRect();

  return !(
    playerRect.right < monsterRect.left ||
    playerRect.left > monsterRect.right ||
    playerRect.bottom < monsterRect.top ||
    playerRect.top > monsterRect.bottom
  );
}
