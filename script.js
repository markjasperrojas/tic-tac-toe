const Gameboard = (() => {
  const grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  return { grid };
})();

const PlayerOne = (() => {
  const name = "Player One";
  const sign = "O";

  return { name, sign };
})();

const PlayerTwo = (() => {
  const name = "Player Two";
  const sign = "X";

  return { name, sign };
})();

function randomPicker() {
  return Math.floor(Math.random() * 3);
}

function playerChoice(currentPlayer) {
  Gameboard.grid[randomPicker()][randomPicker()] = currentPlayer.sign;
}

function nextTurn() {
  if (currentPlayer === PlayerOne) {
    currentPlayer = PlayerTwo;
  } else {
    currentPlayer = PlayerOne;
  }
}

function gridChecker() {
  for (let i = 0; i < Gameboard.grid.length; i++) {
    for (let j = 0; j < Gameboard.grid.length; j++) {
      if (Gameboard.grid[i][j] === "") {
        return;
      }
    }

    if (i === 2) {
      isGridFull = true;
    }
  }
}

let currentPlayer = PlayerOne;
let isGridFull = false;

do {
  playerChoice(currentPlayer);
  console.table(Gameboard.grid);

  nextTurn();
  gridChecker();
} while (!isGridFull);
