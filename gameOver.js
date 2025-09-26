function gameOver() {
  gameRunning = false;
  mathQuestionActive = false;
  hideMathQuestion();
  //   finalScoreDisplay.textContent = `You survived for ${score} seconds`;
  gameOverScreen.style.display = "flex";
}
