/**
 * The form element being validated.
 * @type {HTMLFormElement}
 */
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Retrieves the selected course name from localStorage.
   * @type {string}
   */
  const courseName = localStorage.getItem("selectedCourse");

  /**
   * Updates the header text if a course name is found in localStorage.
   */
  if (courseName) {
      /**
       * The header element displaying the course name.
       * @type {HTMLElement}
       */
      const headerElement = document.querySelector(".quiz-header");
      headerElement.textContent = `Welcome! Ready for your ${courseName} exam?`;
  }

  /**
   * The button element that starts the quiz.
   * @type {HTMLButtonElement}
   */
  const startButton = document.getElementById("goToPageQuestion");

  /**
   * Adds an event listener to the start button to redirect to the questions page.
   */
  startButton.addEventListener("click", () => {
      window.location.href = "../questions/questions.html";
  });
});