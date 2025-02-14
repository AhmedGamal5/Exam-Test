export function renderQuestion(index, questions, userAnswers) {
    const quizHeader = document.querySelector(".quiz-header");
    const quizOptionsContainer = document.querySelector(".quiz-options");
  
    const question = questions[index];
    quizHeader.innerHTML = `${question.question}`;
  
    quizOptionsContainer.innerHTML = question.choices.map((choice, idx) => `
      <a class="quiz-option ${userAnswers[index] === idx ? "selected" : ""}" 
         onclick="handleChoiceClick(${idx})">
         ${choice}
      </a>
    `).join('');
  }
  
  export function renderProgress(index, questions) {
    const progressSteps = document.querySelector(".quiz-progress");
    progressSteps.innerHTML = questions.map((_, i) => `
      <span class="progress-step ${i === index ? "active" : ""}">${i + 1}</span>
    `).join('');
  }
  
  export function renderError() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<div class="error-message">Failed to load questions. Please try again later.</div>`;
  }
  
  export function renderFlagSidebar(flaggedQuestions) {
    const flagSidebar = document.querySelector(".flag-sidebar");
    flagSidebar.innerHTML = flaggedQuestions.map(index => `
      <div class="flagged-question-item">
        <span class="flagged-question-text">Question ${index + 1}</span>
      </div>
    `).join('');
  }
  