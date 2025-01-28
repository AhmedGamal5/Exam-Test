document.addEventListener("DOMContentLoaded", () => {
  const quizHeader = document.querySelector(".quiz-header");
  const quizOptionsContainer = document.querySelector(".quiz-options");
  const progressSteps = document.querySelector(".quiz-progress");
  const flagSidebar = document.querySelector(".flag-sidebar");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const submitContainer = document.querySelector(".submit-container");
  const submitButton = document.createElement("button");

  submitButton.classList.add("global-btn");
  submitButton.classList.add("submit-btn");
  submitButton.textContent = "Submit";
  submitButton.style.display = "none";
  submitButton.onclick = calculateScore;

  submitContainer.appendChild(submitButton);

  let quizData = {};
  let questions = [];
  let flaggedQuestions = [];
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let isLoading = true;
  let isError = false;

  let countdownTime = 3 * 60; // 3 minutes
  const countdownElement = document.getElementById("countdown");
  let interval;

  renderLoading(); // Show loading spinner

  fetch("../../data/questions.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      return response.json();
    })
    .then((data) => {
      quizData = data;
      isLoading = false;
      initQuiz();
      startTimer(); 
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
      isError = true;
      isLoading = false;
      renderError();
    });

  function startTimer() {
   
    countdownElement.textContent = formatTime(countdownTime);

    
    interval = setInterval(() => {
      if (countdownTime > 0) {
        countdownTime--;
        countdownElement.textContent = formatTime(countdownTime);
      } else {
        clearInterval(interval);
        window.location.href = "../TimeOut/TimeOut.html";
      }
    }, 1000);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function initQuiz() {
    if (isLoading) {
      renderLoading();
      return;
    }

    if (isError) {
      renderError();
      return;
    }

    const category = localStorage.getItem("selectedCourse") || "React JS";
    questions = quizData[category];
    userAnswers = new Array(questions.length).fill(null);
    flagSidebar.innerHTML = `
      <h4 class="flag-list-header">Flag Questions</h4>
    `;
    shuffleQuestions();
    renderQuestion(currentQuestionIndex);
    renderProgress();
    renderFlagSidebar();
    setupNavigationButtons();
  }

  function renderLoading() {
    quizHeader.innerHTML = "";
    quizOptionsContainer.innerHTML = `
      <div class="loading-spinner"></div>
      <p style="text-align: center;">Loading questions...</p>
    `;
    progressSteps.innerHTML = "";
    flagSidebar.innerHTML = "";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    submitButton.style.display = "none";
  }

  function renderError() {
    quizHeader.innerHTML = "";
    quizOptionsContainer.innerHTML = `
      <div class="error-message">Failed to load questions. Please try again later.</div>
    `;
    progressSteps.innerHTML = "";
    flagSidebar.innerHTML = "";
    nextButton.style.display = "none";
    prevButton.style.display = "none";
    submitButton.style.display = "none";
  }

  function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[randomIndex]] = [
        questions[randomIndex],
        questions[i],
      ];
    }
    currentQuestionIndex = 0;
  }

  function renderQuestion(index) {
    const question = questions[index];

    quizHeader.innerHTML = `
      ${question.question}
      <i class="fa-solid fa-flag flag-icon ${
        flaggedQuestions.includes(index) ? "flagged" : ""
      }" 
         onclick="toggleFlag(${index})"></i>
    `;

    quizOptionsContainer.innerHTML = "";
    question.choices.forEach((choice, idx) => {
      const option = document.createElement("a");
      option.classList.add("quiz-option");
      option.textContent = choice;

      if (userAnswers[index] === idx) {
        option.classList.add("selected");
      }

      option.onclick = () => handleChoiceClick(idx);
      quizOptionsContainer.appendChild(option);
    });

    updateProgress(index);

    prevButton.style.display = index === 0 ? "none" : "block";
    nextButton.style.display =
      index === questions.length - 1 ? "none" : "block";
    submitButton.style.display =
      index === questions.length - 1 ? "block" : "none";
  }

  function handleChoiceClick(idx) {
    userAnswers[currentQuestionIndex] = idx;
    markOptionSelected(idx);
  }

  function markOptionSelected(idx) {
    const options = document.querySelectorAll(".quiz-option");
    options.forEach((option, i) => {
      if (i === idx) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  }

  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion(currentQuestionIndex);
    }
  });

  function renderProgress() {
    progressSteps.innerHTML = "";

    questions.forEach((_, index) => {
      const step = document.createElement("div");
      step.classList.add("progress-step");
      if (index <= currentQuestionIndex) {
        step.classList.add("active");
      }

      step.textContent = index + 1;
      step.onclick = () => navigateToQuestion(index);

      progressSteps.appendChild(step);
    });
  }

  function navigateToQuestion(index) {
    currentQuestionIndex = index;
    renderQuestion(currentQuestionIndex);
    renderProgress();
  }

  function updateProgress(index) {
    const steps = progressSteps.querySelectorAll(".progress-step");
    steps.forEach((step, i) => {
      if (i <= index) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  window.toggleFlag = (questionIndex) => {
    const flagIndex = flaggedQuestions.indexOf(questionIndex);
    flagSidebar.innerHTML = `
      <h4 class="flag-list-header">Flag Questions</h4>
    `;
    if (flagIndex === -1) {
      flaggedQuestions.push(questionIndex);
    } else {
      flaggedQuestions.splice(flagIndex, 1);
    }

    renderFlagSidebar();
    renderQuestion(currentQuestionIndex);
  };

  function renderFlagSidebar() {
    flagSidebar.innerHTML = `
      <h4 class="flag-list-header">Flag Questions</h4>
    `;

    flaggedQuestions.forEach((questionIndex) => {
      const flaggedItem = document.createElement("div");
      flaggedItem.classList.add("flagged-question-item");

      flaggedItem.innerHTML = `
        <span class="flagged-question-text">Question ${questionIndex + 1}</span>
        <i class="fa-solid fa-trash remove-flag-icon" onclick="removeFlag(${questionIndex})"></i>
      `;

      flaggedItem.querySelector(".flagged-question-text").onclick = () => {
        currentQuestionIndex = questionIndex;
        renderQuestion(currentQuestionIndex);
      };

      flagSidebar.appendChild(flaggedItem);
    });
  }

  window.removeFlag = (questionIndex) => {
    flaggedQuestions = flaggedQuestions.filter(
      (index) => index !== questionIndex
    );
    renderFlagSidebar();
    renderQuestion(currentQuestionIndex);
  };

  function setupNavigationButtons() {
    nextButton.style.display = questions.length > 1 ? "block" : "none";
    prevButton.style.display = "none";
  }

  function calculateScore() {
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (
        userAnswer !== null &&
        question.choices[userAnswer] === question.answer
      ) {
        correctAnswers++;
      }
    });

    const scorePercentage = Math.round(
      (correctAnswers / questions.length) * 100
    );
    localStorage.setItem("examScore", scorePercentage);
    window.location.href = "../Result/Result.html";
  }
});

