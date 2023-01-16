let highscoresList = document.getElementById("highscores");

function printHighscores() {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  // Sorting highscores from highest to lowest
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscoresList.innerHTML = "";
  for (let i = 0; i < highscores.length; i++) {
    let newScore = document.createElement("li");
    newScore.innerHTML = `${highscores[i].initials} - ${highscores[i].score}`;
    highscoresList.appendChild(newScore);
  }
}

printHighscores();

function clearStorage() {
  localStorage.clear();
  printHighscores();
}

let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clearStorage);