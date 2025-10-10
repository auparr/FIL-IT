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
    e.preventDefault();
  }

  if (e.key === "Enter" && mathQuestionActive) {
    e.preventDefault();

    if (window.isQuestBoxQuestion) {
      checkQuestBoxAnswer();
    } else {
      checkAnswer();
    }
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
