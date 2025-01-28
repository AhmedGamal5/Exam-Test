/**
 * The form element being validated.
 * @type {HTMLFormElement}
 */
const form = document.getElementsByTagName("form")[0];

/**
 * The email input field.
 * @type {HTMLInputElement}
 */
const EmailInput = document.getElementById("email");

/**
 * The password input field.
 * @type {HTMLInputElement}
 */
const PasswordInput = document.getElementById("password");

/**
 * The element displaying email validation error messages.
 * @type {HTMLElement}
 */
const EMerrorText = document.getElementById("EMerrorText");

/**
 * The element displaying password validation error messages.
 * @type {HTMLElement}
 */
const PWerrorText = document.getElementById("PWerrorText");

/**
 * Adds a submit event listener to validate the form inputs.
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get trimmed input values
  const eMailValue = EmailInput.value.trim();
  const PasswordValue = PasswordInput.value.trim();

  // Email validation regex
  const MailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let IsValid = true; // Flag to track if the form is valid

  // Email Validation
  if (eMailValue === "") {
    EMerrorText.innerText = "Email Is Required!";
    EmailInput.classList.add("error-border");
    EMerrorText.style.display = "block";
    IsValid = false;
  } else if (!MailRegex.test(eMailValue)) {
    EMerrorText.innerText = "Email Must Be in the Required Format";
    EmailInput.classList.add("error-border");
    EMerrorText.style.display = "block";
    IsValid = false;
  } else {
    EmailInput.classList.remove("error-border");
    EMerrorText.style.display = "none";
  }

  // Password Validation
  if (PasswordValue === "") {
    PWerrorText.innerText = "Password Is Required!";
    PasswordInput.classList.add("error-border");
    PWerrorText.style.display = "block";
    IsValid = false;
  } else if (PasswordValue.length < 9) {
    PWerrorText.innerText = "Password Must Contain at Least 9 Characters!";
    PasswordInput.classList.add("error-border");
    PWerrorText.style.display = "block";
    IsValid = false;
  } else {
    PasswordInput.classList.remove("error-border");
    PWerrorText.style.display = "none";
  }

  // Proceed if the form is valid
  if (IsValid) {
    /**
     * Retrieves the list of users from local storage.
     * @type {Array<{email: string, password: string}>}
     */
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user by email
    const user = users.find((user) => user.email === eMailValue);

    // Validate user existence and password
    if (!user) {
      EMerrorText.innerText = "This Email is not registered!";
      EMerrorText.style.display = "block";
      EmailInput.classList.add("error-border");
    } else if (user.password !== PasswordValue) {
      PWerrorText.innerText = "Incorrect password!";
      PWerrorText.style.display = "block";
      PasswordInput.classList.add("error-border");
    } else {
      // Store current user in localStorage and redirect
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "../exam/exam.html";
    }
  }
});

/**
 * Clears the email error state when the input value changes.
 */
EmailInput.addEventListener("input", () => {
  EmailInput.classList.remove("error-border");
  EMerrorText.style.display = "none";
});

/**
 * Clears the password error state when the input value changes.
 */
PasswordInput.addEventListener("input", () => {
  PasswordInput.classList.remove("error-border");
  PWerrorText.style.display = "none";
});
