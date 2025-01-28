const form = document.getElementsByTagName("form")[0];
const EmailInput = document.getElementById("email");
const PasswordInput = document.getElementById("password");
const EMerrorText = document.getElementById("EMerrorText");
const PWerrorText = document.getElementById("PWerrorText");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const eMailValue = EmailInput.value.trim();
  const PasswordValue = PasswordInput.value.trim();
  const MailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var IsValid = true;

  //EmailValidation
  if (eMailValue === "") {
    e.preventDefault();
    EMerrorText.innerText = "EMail Is Required!";
    EmailInput.classList.add("error-border");
    EMerrorText.style.display = "block";
    IsValid = false;
  } else if (!MailRegex.test(eMailValue)) {
    e.preventDefault();
    EMerrorText.innerText = "Email Must Be in the Required Format";
    EmailInput.classList.add("error-border");
    EMerrorText.style.display = "block";
    IsValid = false;
  } else {
    EmailInput.classList.remove("error-border");
    EMerrorText.style.display = "none";
  }

  //Password Validtion
  if (PasswordValue === "") {
    e.preventDefault();
    PWerrorText.innerText = "Password Is Required!";
    PasswordInput.classList.add("error-border");
    PWerrorText.style.display = "block";
    IsValid = false;
  } else if (PasswordValue.length < 9) {
    e.preventDefault();
    PWerrorText.innerText = "Password Must Contains 9 Characters at Least!";
    PasswordInput.classList.add("error-border");
    PWerrorText.style.display = "block";
    IsValid = false;
  } else {
    PasswordInput.classList.remove("error-border");
    PWerrorText.style.display = "none";
  }

  if (IsValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === eMailValue);

    if (!user) {
      EMerrorText.innerText = "This Email is not registered!";
      EMerrorText.style.display = "block";
      EmailInput.classList.add("error-border");
    } else if (user && user.password !== PasswordValue) {
      PWerrorText.innerText = "Incorrect password!";
      PWerrorText.style.display = "block";
      PasswordInput.classList.add("error-border");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "../exam/exam.html";
    }
  }
});

EmailInput.addEventListener("input", () => {
  EmailInput.classList.remove("error-border");
  EMerrorText.style.display = "none";
});

PasswordInput.addEventListener("input", () => {
  PasswordInput.classList.remove("error-border");
  PWerrorText.style.display = "none";
});
