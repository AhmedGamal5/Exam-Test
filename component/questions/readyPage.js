document.addEventListener("DOMContentLoaded", () => {
    const courseName = localStorage.getItem("selectedCourse");
    if (courseName) {
      const headerElement = document.querySelector(".quiz-header");
      headerElement.textContent = `Welcome! Ready for your ${courseName} exam?`;
    }
  

    const startButton = document.getElementById("goToPageQuestion");
    startButton.addEventListener("click", () => {
      window.location.href = "../questions/questions.html";
    });
  });
  