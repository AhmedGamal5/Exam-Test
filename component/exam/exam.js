let selectedOption = null;

function selectOption(optionElement) {
  const options = document.querySelectorAll(".option-container");
  options.forEach((option) => option.classList.remove("selected"));

  optionElement.classList.add("selected");
  selectedOption = optionElement.querySelector(".content").innerText;
}

function nextPage() {
  const errorMessage = document.getElementById("error-message");

  if (selectedOption) {
    localStorage.setItem("selectedCourse", selectedOption);

    window.location.href = "../questions/readyPage.html";
  } else {
    errorMessage.style.display = "block";
  }
}
