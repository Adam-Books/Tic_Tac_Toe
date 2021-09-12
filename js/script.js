const allBoxs = document.querySelectorAll("section span");

let playerSign = "X";
let runComputer = true;

window.onload = () => {
  for (let i = 0; i < allBoxs.length; i++) {
    allBoxs[i].setAttribute("onclick", "clickedBox(this)");
  }
};

selectX.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
};

selectO.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  players.setAttribute("class", "players active player");
};

// The user's turn
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.innerHTML = `<span class="O">O</span>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<span class="X">X</span>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  element.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none";
  let computerTimeRandom = (Math.random() * 1000 + 100).toFixed();
  setTimeout(() => {
    computer();
  }, computerTimeRandom);
  getTheWinner();
}

// The computers turn
function computer() {
  let array = [];
  if (runComputer) {
    playerSign = "O";
    for (let i = 0; i < allBoxs.length; i++) {
      if (allBoxs[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        playerSign = "X";
        allBoxs[randomBox].innerHTML = `<span class="X">X</span>`;
        players.classList.remove("active");
        allBoxs[randomBox].setAttribute("id", playerSign);
      } else {
        allBoxs[randomBox].innerHTML = `<span class="O">O</span>`;
        players.classList.remove("active");
        allBoxs[randomBox].setAttribute("id", playerSign);
      }
      getTheWinner();
    }
    allBoxs[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

// the winner's functions
function getId(className) {
  return document.querySelector(".box" + className).id;
}

function getVal(val1, val2, val3, sign) {
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}

function getTheWinner() {
  if (
    getVal(1, 2, 3, playerSign) ||
    getVal(4, 5, 6, playerSign) ||
    getVal(7, 8, 9, playerSign) ||
    getVal(1, 4, 7, playerSign) ||
    getVal(2, 5, 8, playerSign) ||
    getVal(3, 6, 9, playerSign) ||
    getVal(1, 5, 9, playerSign) ||
    getVal(3, 5, 7, playerSign)
  ) {
    setTimeout(() => {
      playBoard.classList.remove("show");
      winningBox.classList.add("show");
    }, 700);
    winningText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    runComputer = false;
    computer();
  } else {
    if (
      getId(1) != "" &&
      getId(2) != "" &&
      getId(3) != "" &&
      getId(4) != "" &&
      getId(5) != "" &&
      getId(6) != "" &&
      getId(7) != "" &&
      getId(8) != "" &&
      getId(9) != ""
    ) {
      setTimeout(() => {
        playBoard.classList.remove("show");
        winningBox.classList.add("show");
      }, 700);
      winningText.innerHTML = `Tie`;
      runComputer = false;
      computer();
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload();
};
