/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const boardEl = document.querySelector(".board");
const resetBtn = document.querySelector(".reset");

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = Array(9).fill("");
  turn = "X";
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((el, idx) => {
    squareEls[idx].innerText = board[idx];
  });
}

function updateMessage() {
  if (winner == false && tie == false) {
    messageEl.innerText = turn;
  } else if (winner === true) {
    messageEl.innerText = `${turn} wins!`;
  } else {
    messageEl.innerText = "Tie!";
  }
}

function placePiece(idx) {
  board[idx] = turn;
}

function checkForWinner() {
  for (let combo of winningCombos) {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
    }
  }
}

function checkForTie() {
  if (winner === true) {
    return;
  }
  tie = true;
  for (let square of board) {
    if (square === "") {
      tie = false;
    }
  }
}

function switchPlayerTurn() {
  if (winner === true) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
}

function handleClick(event) {
  const squareIdx = event.target.id;
  if (board[squareIdx] !== "" || winner === true) {
    return;
  }
  placePiece(squareIdx);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener("click", handleClick);
resetBtn.addEventListener("click", init);

init();
