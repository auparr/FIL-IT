function gameOver() {
  gameRunning = false;
  finalScoreDisplay.textContent = `You survived for ${score} seconds`;
  gameOverScreen.style.display = "flex";
}
