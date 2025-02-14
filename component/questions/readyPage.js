document.addEventListener("DOMContentLoaded", () => {
  
  //*** Get Course Name from local storage ***/
  const courseName = localStorage.getItem("selectedCourse");
  
  //*** Get user Name from local storage ***/
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userName = currentUser ? `${currentUser.firstName}` : "";
  
  //*** Add user name and course name for header ***/
  if (courseName) {
    const headerElement = document.querySelector(".quiz-header");
    headerElement.textContent = `Welcome ${userName}, Are you ready for your ${courseName} Exam?`;
  }
  
  const startButton = document.getElementById("goToPageQuestion");
  
  //*** when user ready move him to questions page ***/
  startButton.addEventListener("click", () => {
    window.location.href = "../questions/questions.html";
  });
});
