const boxes = document.querySelectorAll(".box");
const newGame = document.getElementById("new-game");
const resetBtn = document.getElementById("reset-btn");
const newGameBtn = document.getElementById("new-game");
const resultMsg = document.getElementById("result");
const newGameCon = document.getElementById("new-game-container");
const darkLightIcon = document.getElementById("dark-light-icon");

let turn = "X";
let isGameOver = false;
const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.textContent = "";
  box.addEventListener("click", () => {
    if (!isGameOver && box.textContent == "") {
      box.textContent = turn;
      checkWin();
      checkDraw();
      changeTurn();
    }
  });
});

const resetGame = () => {
  isGameOver = false;
  turn = "X";
  document.querySelector(".bg").style.left = "0";
  resetBtn.classList.remove("hidden");
  newGameCon.classList.add("hidden");
  for (let box of boxes) {
    box.textContent = "";
    box.classList.remove("winner-bg");
    box.classList.add("hover");
  }
};

const changeTurn = () => {
  if (turn === "X") {
    turn = "O";
    document.querySelector(".bg").style.left = "85px";
  } else {
    turn = "X";
    document.getElementsByClassName("bg")[0].style.left = "0";
  }
};

const checkWin = () => {
  for (let pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].textContent;
    let pos2Val = boxes[pattern[1]].textContent;
    let pos3Val = boxes[pattern[2]].textContent;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        isGameOver = true;
        resetBtn.classList.add("hidden");
        newGameCon.classList.remove("hidden");
        resultMsg.textContent = `${pos1Val} Triumphs!`;
        for (let i = 0; i < 3; i++) {
          boxes[pattern[i]].classList.add("winner-bg");
          boxes[pattern[i]].classList.remove("hover");
        }
      }
    }
  }
};

const checkDraw = () => {
  let isDraw;
  if (!isGameOver) {
    isDraw = true;
    for (let box of boxes) {
      if (box.textContent === "") {
        isDraw = false;
      }
    }
  }
  if (isDraw) {
    isGameOver = true;
    resultMsg.textContent = `Draw!`;
    resetBtn.classList.add("hidden");
    newGameCon.classList.remove("hidden");
  }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

darkLightIcon.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    darkLightIcon.src = `moon.png`;
  } else {
    darkLightIcon.src = `sun.png`;
  }
});
