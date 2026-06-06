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
    const row = GameController.randomPicker();
    const column = GameController.randomPicker();

    if (Gameboard.grid[row][column] === "") {
      Gameboard.grid[row][column] = currentPlayer.sign;
    } else {
      for (let i = 0; i < Gameboard.grid.length; i++) {
        for (let j = 0; j < Gameboard.grid.length; j++) {
          if (Gameboard.grid[i][j] === "") {
            Gameboard.grid[i][j] = currentPlayer.sign;
            return;
          }
        }
      }
    }
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
          // Return if all of cell are not occupied
          return;
        }
      }

      // The loop will stop if all of cell are occupied
      if (i === 2) {
        isGridFull = true;
      }
    }
  };

  const winnerChecker = (currentPlayer) => {
    if (
      (Gameboard.grid[0][0] === currentPlayer.sign &&
        Gameboard.grid[0][1] === currentPlayer.sign &&
        Gameboard.grid[0][2] === currentPlayer.sign) ||
      (Gameboard.grid[1][0] === currentPlayer.sign &&
        Gameboard.grid[1][1] === currentPlayer.sign &&
        Gameboard.grid[1][2] === currentPlayer.sign) ||
      (Gameboard.grid[2][0] === currentPlayer.sign &&
        Gameboard.grid[2][1] === currentPlayer.sign &&
        Gameboard.grid[2][2] === currentPlayer.sign) ||
      (Gameboard.grid[0][0] === currentPlayer.sign &&
        Gameboard.grid[1][0] === currentPlayer.sign &&
        Gameboard.grid[2][0] === currentPlayer.sign) ||
      (Gameboard.grid[0][1] === currentPlayer.sign &&
        Gameboard.grid[1][1] === currentPlayer.sign &&
        Gameboard.grid[2][1] === currentPlayer.sign) ||
      (Gameboard.grid[0][2] === currentPlayer.sign &&
        Gameboard.grid[1][2] === currentPlayer.sign &&
        Gameboard.grid[2][2] === currentPlayer.sign) ||
      (Gameboard.grid[0][0] === currentPlayer.sign &&
        Gameboard.grid[1][1] === currentPlayer.sign &&
        Gameboard.grid[2][2] === currentPlayer.sign) ||
      (Gameboard.grid[0][2] === currentPlayer.sign &&
        Gameboard.grid[1][1] === currentPlayer.sign &&
        Gameboard.grid[2][0] === currentPlayer.sign)
    ) {
      console.log(`${currentPlayer.name} win!`);
      isGridFull = true;
    }
  };

  return { nextTurn, randomPicker, playerChoice, gridChecker, winnerChecker };
})();

let currentPlayer = PlayerOne;
let isGridFull = false;

do {
  GameController.playerChoice(currentPlayer);
  console.table(Gameboard.grid);

  GameController.winnerChecker(currentPlayer);

  GameController.gridChecker();
  GameController.nextTurn();
} while (!isGridFull);
