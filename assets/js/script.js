//questions here




// logic for putting questions on page

let startScreenEl = document.querySelector("#start-screen");
let scoresEl = document.querySelector("#choices");
let timerEl = document.querySelector("#time");
let startBtn = document.querySelector("#start");
let questionsEl = document.querySelector("#questions");
let questionTitleEl = document.querySelector("#question-title");
let choicesEl = document.querySelector("#choices");
let submitBtn = document.querySelector("#submit");
let initialsEl = document.querySelector("#initials");
let feedbackEl = document.querySelector("#feedback");
let endScreenEl = document.querySelector("#end-screen");
let finalScoreEl = document.querySelector("#final-score");

let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// starting the Quiz
function startQuiz() {
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");

  // Start Timer
  timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
  
  displayQuestion();
}

startBtn.addEventListener("click", startQuiz);

// displaying questions
function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
  questionTitleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach((choice, i) => {
    let choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = `${i + 1}. ${choice}`;
    choiceButton.onclick = questionChoiceClick;

    choicesEl.appendChild(choiceButton);
  });
}

// clicking question choices
function questionChoiceClick() {
    // if  user guessed wrong
    if (this.value !== questions[currentQuestionIndex].correctAnswer) {
      time -= 5;
      if (time < 0) {
        time = 0;
      }
 
 timerEl.textContent = time;
 feedbackEl.textContent = "Wrong answer!";
 feedbackEl.style.color = "red";
 feedbackEl.style.fontSize = "50px";
 let wrongAudio = new Audio("./assets/sfx/incorrect.wav");
 wrongAudio.play();
} else {
 // if user guessed right
 feedbackEl.textContent = "Well done!";
 feedbackEl.style.color = "green";
 feedbackEl.style.fontSize = "50px";
 let correctAudio = new Audio("./assets/sfx/correct.wav");
 correctAudio.play();
}

// Display outcome
feedbackEl.setAttribute("class", "feedback");

setInterval(function () {
 feedbackEl.setAttribute("class", "hide");
}, 1000);
// display next question or end quiz
currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

// Timer
function clockTick() {
    time--;
   timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

// Ending quiz
function endQuiz() {
    clearInterval(timerId);
  endScreenEl.removeAttribute("class");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

