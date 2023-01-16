//questions

let questions = [
    {
      title: "API stands for Application _________ Interface?",
      choices: ["Platform", "Programming", "Partner", "Performance"],
      correctAnswer: "Programming",
    },
  
    {
      title: "In this CSS declaration example (color:blue), color is the property and blue is the _________?",
      choices: ["Syntax", "Attribute", "Selector", "Value"],
      correctAnswer: "Value",
    },
  
    {
      title:
        "If you want to access the 'box' element in the array Arr = ['box', 'car', 'racer'], what would you set for X in Arr[X]?",
      choices: ["-1", "1", "0", "Start"],
      correctAnswer: "0",
    },
  
    {
      title: "X += Y is the same as which of the following?",
      choices: ["X++", "Y = X + Y", "X = X + Y", "Y++"],
      correctAnswer: "X = X + Y",
    },
  
    {
      title:
        "How can you convert the string of any base to integer in JavaScript?",
      choices: ["forEach()", "parseInt()", "number()", "push()"],
      correctAnswer: "parseInt()",
    }, 
  ];
  

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
      time -= 10;
      if (time < 0) {
        time = 0;
      }
 
 timerEl.textContent = time;
 feedbackEl.textContent = "Wrong answer!";
 feedbackEl.style.color = "orange";
 feedbackEl.style.fontSize = "50px";
 let wrongAudio = new Audio("./assets/sfx/incorrect.wav");
 wrongAudio.play();
} else {
 // if user guessed right
 feedbackEl.textContent = "Well done!";
 feedbackEl.style.color = "blue";
 feedbackEl.style.fontSize = "50px";
 let correctAudio = new Audio("./assets/sfx/correct.wav");
 correctAudio.play();
}

// Display outcome
feedbackEl.setAttribute("class", "feedback");

setInterval(function () {
 feedbackEl.setAttribute("class", "hide");
}, 2500);
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

// highscores
function storeHighscores() {
      let initials = initialsEl.value;
  
    if (initialsEl !== "") {
      let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      let newScore = {
        score: time,
        initials: initials,
      };
  
      highscores.push(newScore);
      localStorage.setItem("highscores", JSON.stringify(highscores));
  
      location.href = "highscores.html";
    }
  }

  submitBtn.addEventListener("click", storeHighscores);
