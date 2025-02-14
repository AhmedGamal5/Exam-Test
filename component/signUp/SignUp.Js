// **** Import some functions from modules ****//
import { displayErrorMessage, hiddenErrorMessage,isValid} from "../modules/formValidation.js";


// **** Selecting Elements ****//
const form = document.getElementsByTagName("form")[0];
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const EmailInput = document.getElementById("email");
const PasswordInput = document.getElementById("password");
const RePasswordInput = document.getElementById("Re-Enter");
const FNerrorText = document.getElementById("FNerrorText");
const LNerrorText = document.getElementById("LNerrorText");
const EMerrorText = document.getElementById("EMerrorText");
const PWerrorText = document.getElementById("PWerrorText");
const RePWerrorText = document.getElementById("RePWerrorText");

isValid;
/**
 * Adds an event listener to the form for the 'submit' event.
 * @param {Event} e The submit event object.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const eMailValue = EmailInput.value.trim();
  const PasswordValue = PasswordInput.value.trim();
  const RePasswordValue = RePasswordInput.value.trim();
  const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
  const MailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // **** Check-FirstName-Validation ****//
  if (!firstNameValue) {
    displayErrorMessage(firstNameInput, FNerrorText, "First Name Is Required!");
  } else if (!lettersOnlyRegex.test(firstNameValue)) {
    displayErrorMessage(
      firstNameInput,
      FNerrorText,
      "First Name Must Contain Letters Only"
    );
  } else {
    hiddenErrorMessage(firstNameInput, FNerrorText);
  }

  // **** Check-LastName-Validation ****//
  if (!lastNameValue) {
    displayErrorMessage(lastNameInput, LNerrorText, "Last Name Is Required!");
  } else if (!lettersOnlyRegex.test(lastNameValue)) {
    displayErrorMessage(
      lastNameInput,
      LNerrorText,
      "Last Name Must Contain Letters Only"
    );
  } else {
    hiddenErrorMessage(lastNameInput, LNerrorText);
  }

  // **** Check-Email-Validation ****//
  if (!eMailValue) {
    displayErrorMessage(EmailInput, EMerrorText, "Email Is Required!");
  } else if (!MailRegex.test(eMailValue)) {
    displayErrorMessage(EmailInput, EMerrorText, "Please Enter a Valid Email");
  } else {
    hiddenErrorMessage(EmailInput, EMerrorText);
  }

  // **** Check-Password-Validation ****//
  if (!PasswordValue) {
    displayErrorMessage(PasswordInput, PWerrorText, "Password Is Required!");
  } else if (PasswordValue.length < 9) {
    displayErrorMessage(
      PasswordInput,
      PWerrorText,
      "Password Must Contain 9 Characters at Least!"
    );
  } else {
    hiddenErrorMessage(PasswordInput, PWerrorText);
  }

  if (!RePasswordValue) {
    displayErrorMessage(
      RePasswordInput,
      RePWerrorText,
      "This Field Is Required!"
    );
  } else if (RePasswordValue !== PasswordValue) {
    displayErrorMessage(
      RePasswordInput,
      RePWerrorText,
      "Passwords do not match!"
    );
  } else {
    hiddenErrorMessage(RePasswordInput, RePWerrorText);
  }

  // **** Check if Email Already Exists ****//
  if (isValid) {
    const newUser = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: eMailValue,
      password: PasswordValue,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === eMailValue);
    if (emailExists) {
      displayErrorMessage(
        EmailInput,
        EMerrorText,
        "There is an account registered with this Email!"
      );
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "../login/index.html";
  }
});

// **** Events To Clear Errors on Input ****//
firstNameInput.addEventListener("input", () => {
  hiddenErrorMessage(firstNameInput, FNerrorText);
});

lastNameInput.addEventListener("input", () => {
  hiddenErrorMessage(lastNameInput, LNerrorText);
});

EmailInput.addEventListener("input", () => {
  hiddenErrorMessage(EmailInput, EMerrorText);
});

PasswordInput.addEventListener("input", () => {
  hiddenErrorMessage(PasswordInput, PWerrorText);
});

RePasswordInput.addEventListener("input", () => {
  hiddenErrorMessage(RePasswordInput, RePWerrorText);
});
