/**
 * The currently selected option's content text.
 * @type {string|null}
 */
let selectedOption = null;

/**
 * Handles selecting an option and visually marking it as selected.
 * Updates the `selectedOption` with the selected option's content.
 *
 * @param {HTMLElement} optionElement - The HTML element of the selected option.
 */
function selectOption(optionElement) {
  // Get all option containers and remove the 'selected' class from all.
  const options = document.querySelectorAll(".option-container");
  options.forEach((option) => option.classList.remove("selected"));

  // Add the 'selected' class to the clicked option.
  optionElement.classList.add("selected");

  // Update the selectedOption variable with the inner text of the selected option's content.
  selectedOption = optionElement.querySelector(".content").innerText;
}

/**
 * Navigates to the next page if an option is selected.
 * Displays an error message if no option is selected.
 */
function nextPage() {
  const errorMessage = document.getElementById("error-message");

  // If an option is selected, store it in localStorage and redirect.
  if (selectedOption) {
    localStorage.setItem("selectedCourse", selectedOption);
    window.location.href = "../questions/readyPage.html";
  } else {
    // Show an error message if no option is selected.
    errorMessage.style.display = "block";
  }
}
