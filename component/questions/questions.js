document.addEventListener("DOMContentLoaded", () => {
  //**** Select Elements ****/
  const quizHeader = document.querySelector(".quiz-header");
  const quizOptionsContainer = document.querySelector(".quiz-options");
  const progressSteps = document.querySelector(".quiz-progress");
  const flagSidebar = document.querySelector(".flag-sidebar");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const submitContainer = document.querySelector(".submit-container");
  const submitButton = document.createElement("button");
  const loadingScreen = document.getElementById("loading-screen");
  const quizContainer = document.getElementById("quiz-container");

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

  //**** Display Loading ****/
  loadingScreen.style.display = "flex";
  quizContainer.style.display = "none";

  //**** Fetching Data ****/
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
      //**** Start-Test ****/
      initQuiz();
      //**** Start-Timer ****/
      startTimer();
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
      isError = true;
      isLoading = false;
      renderError();
    });

  /**
   * Starts a countdown timer and updates the countdown display every second.
   * When the timer reaches 0, it redirects the user to a timeout page.
   */
  function startTimer() {
    //*** Set the initial value of the countdown timer ***/
    countdownElement.textContent = formatTime(countdownTime);

    //*** Start an interval that runs every 1 second ***/
    interval = setInterval(() => {
      if (countdownTime > 0) {
        countdownTime--;

        //*** Update the countdown display with the new time ***/
        countdownElement.textContent = formatTime(countdownTime);
      } else {
        clearInterval(interval);

        //*** Redirect the user to the timeout page ***/
        window.location.href = "../TimeOut/TimeOut.html";
      }
    }, 1000);
  }

  /**
   * Formats a given number of seconds into a string in the format "MM:SS".
   * If the seconds are less than 10, a leading zero is added.
   *
   * @param {number} seconds - The number of seconds to format.
   * @returns {string} - The formatted time string (e.g., "05:30").
   */
  function formatTime(seconds) {
    //** Calculate the number of minutes by dividing seconds by 60 ***/
    const minutes = Math.floor(seconds / 60);

    //** Calculate the remaining seconds using the modulo operator ***/
    const secs = seconds % 60;

    //*** Format the seconds to include a leading zero if less than 10 ***/
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  /**
   * Initializes the quiz by setting up the questions, UI elements, and navigation.
   * This function is called after the quiz data has been successfully fetched.
   */
  function initQuiz() {
    if (isLoading) {
      renderLoading();
      return;
    }

    if (isError) {
      renderError();
      return;
    }

    // Hide loading screen and show quiz container
    loadingScreen.style.display = "none";
    quizContainer.style.display = "block";

    const category = localStorage.getItem("selectedCourse") || "React JS";
    questions = quizData[category];
    userAnswers = new Array(questions.length).fill(null);
    flagSidebar.innerHTML = `
      <h4 class="flag-list-header">Flag Questions</h4>
    `;

    //*** Shuffle the questions to randomize their order ***/
    shuffleQuestions();

    //*** Render the current question (starting with the first question) ***/
    renderQuestion(currentQuestionIndex);

    //*** Render the progress steps dynamically based on the number of questions ***/
    renderProgress();

    //*** Render the flag sidebar to show flagged questions (if any) ***/
    renderFlagSidebar();

    //*** Set up the navigation buttons (e.g., Next, Previous) ***/
    setupNavigationButtons();
  }

  /**
   * Displays an error message and hides all quiz-related UI elements.
   * This function is called when there is an error fetching the quiz data.
   */
  function renderError() {
    loadingScreen.style.display = "none";
    quizContainer.style.display = "none";

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

  /**
   * Shuffles the questions array to randomize the order of questions.
   * This function uses the Fisher-Yates (Knuth) shuffle algorithm.
   * After shuffling, it resets the current question index to 0.
   */
  function shuffleQuestions() {
    //*** Loop through the questions array starting from the last element ***/
    for (let i = questions.length - 1; i > 0; i--) {
      //*** Generate a random index between 0 and i (inclusive) ***/
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[randomIndex]] = [
        questions[randomIndex],
        questions[i],
      ];
    }
    //*** Reset the current question index to 0 after shuffling ***/
    currentQuestionIndex = 0;
  }

  /**
   * Renders the current question and its options in the quiz interface.
   * Updates the UI to reflect the current state of the quiz (e.g., flagged questions, selected answers).
   *
   * @param {number} index - The index of the question to render.
   */
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

    // Add a warning message placeholder
    const warningMessage = document.createElement("div");
    warningMessage.id = "warning-message";
    warningMessage.style.color = "red";
    warningMessage.style.marginTop = "10px";
    warningMessage.style.display = "none"; // Initially hidden
    warningMessage.textContent = "You should choose an answer.";
    quizOptionsContainer.appendChild(warningMessage);

    updateProgress(index);

    prevButton.style.display = index === 0 ? "hidden" : "block";
    nextButton.style.display =
      index === questions.length - 1 ? "hidden" : "block";
    submitButton.style.display =
      index === questions.length - 1 ? "block" : "hidden";

    // Disable submit button if not all questions are answered
    submitButton.disabled = !areAllQuestionsAnswered();
  }

  /**
   * Handles the user's selection of a quiz option.
   * Updates the user's answer for the current question and marks the selected option.
   * Hides the warning message (if visible) and enables the submit button if all questions are answered.
   *
   * @param {number} idx - The index of the selected option.
   */
  function handleChoiceClick(idx) {
    userAnswers[currentQuestionIndex] = idx;
    markOptionSelected(idx);

    // Hide the warning message when an answer is selected
    const warningMessage = document.getElementById("warning-message");
    if (warningMessage) {
      warningMessage.style.display = "none";
    }

    // Enable submit button if all questions are answered
    submitButton.disabled = !areAllQuestionsAnswered();
  }

  /**
   * Marks the selected quiz option as "selected" and removes the "selected" class from all other options.
   * This function visually highlights the user's choice for the current question.
   *
   * @param {number} idx - The index of the selected option.
   */
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

  function isCurrentQuestionAnswered() {
    return userAnswers[currentQuestionIndex] !== null;
  }

  function areAllQuestionsAnswered() {
    return userAnswers.every((answer) => answer !== null);
  }

  nextButton.addEventListener("click", () => {
    const warningMessage = document.getElementById("warning-message");

    if (!isCurrentQuestionAnswered()) {
      // Show the warning message
      warningMessage.style.display = "block";
      return;
    }

    // Hide the warning message if the question is answered
    warningMessage.style.display = "none";

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

  /**
   * Renders the progress steps for the quiz.
   * Each step represents a question, and the current question is highlighted as "active".
   * Clicking on a step allows the user to navigate to that question.
   */
  function renderProgress() {
    progressSteps.innerHTML = ""; // Clear existing progress steps

    // Dynamically create progress steps based on the number of questions
    questions.forEach((_, index) => {
      const step = document.createElement("span");
      step.classList.add("progress-step");
      if (index === currentQuestionIndex) {
        step.classList.add("active");
      }
      step.textContent = index + 1;
      step.onclick = () => navigateToQuestion(index);
      progressSteps.appendChild(step);
    });
  }

  /**
   * Navigates to a specific question in the quiz.
   * If the current question is unanswered and the user tries to navigate to another question,
   * a warning message is displayed. Otherwise, the quiz updates to show the selected question.
   *
   * @param {number} index - The index of the question to navigate to.
   */
  function navigateToQuestion(index) {
    if (!isCurrentQuestionAnswered() && index !== currentQuestionIndex) {
      const warningMessage = document.getElementById("warning-message");
      warningMessage.style.display = "block";
      return;
    }

    currentQuestionIndex = index;
    renderQuestion(currentQuestionIndex);
    renderProgress(); // Update progress steps
  }

  /**
   * Updates the progress steps to highlight the current question.
   * The step corresponding to the current question is marked as "active".
   *
   * @param {number} index - The index of the current question.
   */
  function updateProgress(index) {
    const steps = progressSteps.querySelectorAll(".progress-step");
    steps.forEach((step, i) => {
      if (i === index) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  /**
   * Toggles the flagged state of a question.
   * If the question is not flagged, it is added to the flaggedQuestions array.
   * If the question is already flagged, it is removed from the flaggedQuestions array.
   * After toggling, the flag sidebar and the current question are re-rendered.
   *
   * @param {number} questionIndex - The index of the question to flag/unflag.
   */
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

  /**
   * Renders the flag sidebar with a list of flagged questions.
   * Each flagged question is displayed as a clickable item that allows the user to navigate to the question.
   * A trash icon is also provided to remove the flag from the question.
   */
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

  /**
   * Removes a question from the list of flagged questions.
   * After removing the flag, the flag sidebar and the current question are re-rendered.
   *
   * @param {number} questionIndex - The index of the question to remove the flag from.
   */
  window.removeFlag = (questionIndex) => {
    flaggedQuestions = flaggedQuestions.filter(
      (index) => index !== questionIndex
    );
    renderFlagSidebar();
    renderQuestion(currentQuestionIndex);
  };

  /**
   * Sets up the visibility of the navigation buttons (Next and Previous).
   * The Next button is shown only if there is more than one question.
   * The Previous button is hidden initially.
   */
  function setupNavigationButtons() {
    nextButton.style.display = questions.length > 1 ? "block" : "none";
    prevButton.style.display = "none";
  }

  /**
   * Calculates the user's score based on their answers and redirects them to the results page.
   * If not all questions are answered, an alert is shown, and the function exits early.
   */
  function calculateScore() {
    if (!areAllQuestionsAnswered()) {
      alert("Please answer all questions before submitting.");
      return;
    }

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
