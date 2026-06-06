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

const GameController = (() => {
  const randomPicker = () => {
    return Math.floor(Math.random() * 3);
  };

  const playerChoice = (currentPlayer) => {
    Gameboard.grid[GameController.randomPicker()][
      GameController.randomPicker()
    ] = currentPlayer.sign;
  };

  const nextTurn = () => {
    if (currentPlayer === PlayerOne) {
      currentPlayer = PlayerTwo;
    } else {
      currentPlayer = PlayerOne;
    }
  };

  const gridChecker = () => {
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
  };

  return { nextTurn, randomPicker, playerChoice, gridChecker };
})();

let currentPlayer = PlayerOne;
let isGridFull = false;

do {
  GameController.playerChoice(currentPlayer);
  console.table(Gameboard.grid);

  GameController.nextTurn();
  GameController.gridChecker();
} while (!isGridFull);
