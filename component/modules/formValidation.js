/**
 * function to display Error Messages
 * @param {HTMLElement} eleInput - The input element to display border
 * @param {HTMLElement} eleText -  display error message
 * @param {text} message - message want to appear
 */
export let isValid = true;
export function displayErrorMessage(eleInput, eleText, message) {
  eleInput.classList.add("error-border");
  eleText.style.display = "block";
  eleText.innerText = message;
  isValid = false;
}

/**
 * function to display Error Messages
 * @param {HTMLElement} eleInput - input element to hidden border
 * @param {HTMLElement} eleText - hide error message
 */
export function hiddenErrorMessage(eleInput, eleText) {
  eleInput.classList.remove("error-border");
  eleText.style.display = "none";
}
