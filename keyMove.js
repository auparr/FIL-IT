document.addEventListener("keydown", (e) => {
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "W",
      "A",
      "S",
      "D",
      "w",
      "a",
      "s",
      "d",
    ].includes(e.key)
  ) {
    keys[e.key] = true;
    e.preventDefault(); // Prevent scrolling
  }

  // Handle Enter key for math questions
  if (e.key === "Enter" && mathQuestionActive) {
    checkAnswer();
  }
});

document.addEventListener("keyup", (e) => {
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "W",
      "A",
      "S",
      "D",
      "w",
      "a",
      "s",
      "d",
    ].includes(e.key)
  ) {
    keys[e.key] = false;
  }
});
