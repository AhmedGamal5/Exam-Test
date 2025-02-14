export function calculateScore(questions, userAnswers) {
  let correctAnswers = 0;

  questions.forEach((question, index) => {
    if (userAnswers[index] !== null && question.choices[userAnswers[index]] === question.answer) {
      correctAnswers++;
    }
  });

  const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
  localStorage.setItem("examScore", scorePercentage);
  window.location.href = "../Result/Result.html";
}
