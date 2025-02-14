export function setupNavigationButtons(index, questions) {
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");

  prevButton.style.display = index === 0 ? "none" : "block";
  nextButton.style.display = index === questions.length - 1 ? "none" : "block";
}

export function handleNext(index, questions, userAnswers) {
  if (index < questions.length - 1) {
    renderQuestion(index + 1, questions, userAnswers);
  }
}

export function handlePrev(index) {
  if (index > 0) {
    renderQuestion(index - 1, questions, userAnswers);
  }
}
