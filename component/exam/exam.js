let selectedOption = null;

/**
 * Handles selecting an option and visually marking it as selected.
 * Updates the `selectedOption` with the selected option's content.
 * @param {HTMLElement} optionElement - The HTML element of the selected option.
 */
function selectOption(optionElement) {
  const options = document.querySelectorAll(".option-container");
  options.forEach((option) => option.classList.remove("selected"));
  optionElement.classList.add("selected");
  selectedOption = optionElement.querySelector(".content").innerText;
}

/**
 * Navigates to the next page if an option is selected.
 * Displays an error message if no option is selected.
 */
function nextPage() {
  const errorMessage = document.getElementById("error-message");
  if (selectedOption) {
    localStorage.setItem("selectedCourse", selectedOption);
    window.location.href = "../questions/readyPage.html";
  } else {
    errorMessage.style.display = "block";
  }
}
