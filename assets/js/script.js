//questions here




// logic for putting questions on page


let currentQuestionIndex = 0;
let time = questions.length * 10;
let timerId;

// starting the Quiz
function startQuiz() {
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");

  // Start Timer
  timerId = setInterval(clockTick, 1500);
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