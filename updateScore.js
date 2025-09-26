function updateScore() {
  // Calculate play time continuously, regardless of game state
  score = Math.floor((Date.now() - gameStartTime) / 1000);
  scoreDisplay.textContent = `Play Time: ${score}s`;
}
