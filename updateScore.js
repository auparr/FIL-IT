function updateScore() {
  score = Math.floor((Date.now() - gameStartTime) / 1000);
  scoreDisplay.textContent = `Survival Time: ${score}s`;
}
