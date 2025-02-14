// **** Import some functions from modules ****//
import { displayErrorMessage, hiddenErrorMessage} from "../modules/formValidation.js";

// **** Selecting Elements ****//
const form = document.getElementsByTagName("form")[0];
const EmailInput = document.getElementById("email");
const PasswordInput = document.getElementById("password");
const EMerrorText = document.getElementById("EMerrorText");
const PWerrorText = document.getElementById("PWerrorText");

let isValid = true;

/**
 * Adds an event listener to the form for the 'submit' event.
 * @param {Event} e The submit event object.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const eMailValue = EmailInput.value.trim();
  const PasswordValue = PasswordInput.value.trim();
  const MailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  isValid = true;

  // **** Email Validation ****//
  if (!eMailValue) {
    displayErrorMessage(EmailInput, EMerrorText, "Email Is Required!");
  } else if (!MailRegex.test(eMailValue)) {
    displayErrorMessage(EmailInput, EMerrorText, "Please Enter a Valid Email");
  } else {
    hiddenErrorMessage(EmailInput, EMerrorText);
  }

  // **** Password Validation ****//
  if (!PasswordValue) {
    displayErrorMessage(PasswordInput, PWerrorText, "Password Is Required!");
  } else if (PasswordValue.length < 9) {
    displayErrorMessage(
      PasswordInput,
      PWerrorText,
      "Password Must Contain at Least 9 Characters!"
    );
  } else {
    hiddenErrorMessage(PasswordInput, PWerrorText);
  }

  // **** Check if Email Exists in Local Storage ****//
  if (isValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === eMailValue);

    if (!user) {
      displayErrorMessage(EmailInput, EMerrorText, "This Email is not registered!");
    } else if (user.password !== PasswordValue) {
      displayErrorMessage(PasswordInput, PWerrorText, "Incorrect Password!");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "../exam/exam.html";
    }
  }
});

// **** Events To Clear Errors on Input ****//
EmailInput.addEventListener("input", () => {
  hiddenErrorMessage(EmailInput, EMerrorText);
});

PasswordInput.addEventListener("input", () => {
  hiddenErrorMessage(PasswordInput, PWerrorText);
});
