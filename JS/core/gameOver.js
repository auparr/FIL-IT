function gameOver() {
  gameRunning = false;
  mathQuestionActive = false;
  hideMathQuestion();
  gameOverScreen.style.display = "flex";
}
