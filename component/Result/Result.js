var img = document.getElementsByTagName("img")[0];
var h2 = document.getElementsByTagName("h2")[0];
var p = document.getElementsByTagName("p")[0];

document.addEventListener("DOMContentLoaded", () => {
  
  const scoreElement = document.querySelector(".score-deg");
  const img = document.querySelector("img");
  const h2 = document.querySelector("h2");
  const p = document.querySelector("p");
  const backButton = document.querySelector("button");

  const score = localStorage.getItem("examScore") || 0;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "user";

  const span = document.createElement("span");
  span.className = "score-deg";
  span.textContent = `${score}%`;

  if (score < 50) {
      img.src = "../../images/Failed.webp";
      h2.innerText = `Mmmmmm... Sorry ${userName} !!`;
      span.style.color = "Red"; 
      p.innerHTML = `You Did Not Pass This Exam. Your Score is `;
      p.appendChild(span); 
      p.innerHTML += ". Please Try Again.";
  } else {
      img.src = "../../images/businessman-staying-top-mountain-peak_114482-144-1.avif";
      h2.innerText = `🎉 Congratulations ${userName} 🎉`;
      span.style.color = "Green";
      p.innerHTML = `You Passed The Exam and Your Grade is `;
      p.appendChild(span); 
  }

  scoreElement.textContent = `${score}%`;

  backButton.addEventListener("click", () => {
      window.location.href = "../login/login.html";
  });
});



  