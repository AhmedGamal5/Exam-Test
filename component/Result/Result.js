/**
 * The first image element in the document.
 * @type {HTMLImageElement}
 */
var img = document.getElementsByTagName("img")[0];

/**
 * The first h2 element in the document.
 * @type {HTMLHeadingElement}
 */
var h2 = document.getElementsByTagName("h2")[0];

/**
 * The first paragraph element in the document.
 * @type {HTMLParagraphElement}
 */
var p = document.getElementsByTagName("p")[0];

document.addEventListener("DOMContentLoaded", () => {
    /**
     * The element displaying the exam score.
     * @type {HTMLElement}
     */
    const scoreElement = document.querySelector(".score-deg");

    /**
     * The image element to display pass/fail status.
     * @type {HTMLImageElement}
     */
    const img = document.querySelector("img");

    /**
     * The heading element to display a message to the user.
     * @type {HTMLHeadingElement}
     */
    const h2 = document.querySelector("h2");

    /**
     * The paragraph element to display the exam result details.
     * @type {HTMLParagraphElement}
     */
    const p = document.querySelector("p");

    /**
     * The button element to navigate back to the login page.
     * @type {HTMLButtonElement}
     */
    const backButton = document.querySelector("button");

    /**
     * The exam score retrieved from localStorage.
     * @type {number}
     */
    const score = localStorage.getItem("examScore") || 0;

    /**
     * The current user's data retrieved from localStorage.
     * @type {Object}
     */
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    /**
     * The full name of the current user or "user" if no user is found.
     * @type {string}
     */
    const userName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "user";

    /**
     * A span element to display the score with custom styling.
     * @type {HTMLSpanElement}
     */
    const span = document.createElement("span");
    span.className = "score-deg";
    span.textContent = `${score}%`;

    /**
     * Updates the UI based on the exam score.
     */
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

    /**
     * Updates the score element with the exam score.
     */
    scoreElement.textContent = `${score}%`;

    /**
     * Adds an event listener to the back button to redirect to the login page.
     */
    backButton.addEventListener("click", () => {
        window.location.href = "../login/index.html";
    });
});
  