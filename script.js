const Gameboard = (() => {
  const grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  return { grid };
})();

const PlayerOne = (() => {
  const sign = "O";

  return { name, sign };
})();

const PlayerTwo = (() => {
  const sign = "X";

  return { name, sign };
})();

const GameController = (() => {
  const randomPicker = () => {
    return Math.floor(Math.random() * 3);
  };

  const playerChoice = (currentPlayer) => {
    return currentPlayer.sign;
  };

  const nextTurn = () => {
    if (currentPlayer === PlayerOne) {
      currentPlayer = PlayerTwo;
    } else {
      currentPlayer = PlayerOne;
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
      const colDivs = document.querySelectorAll(".col");
      const result = document.querySelector(".result");

      console.log(`${currentPlayer.sign} win!`);
      result.textContent = `${currentPlayer.sign} win!`;

      colDivs.forEach((col) => {
        col.classList.add("col-events");
      });
    }
  };

  const tieChecker = () => {
    for (let i = 0; i < Gameboard.grid.length; i++) {
      for (let j = 0; j < Gameboard.grid.length; j++) {
        if (Gameboard.grid[i][j] === "") {
          return;
        }
      }

      if (i === 2 && stopTheGame === true) {
        return;
      } else if (i === 2) {
        console.log("Tie!");
        stopTheGame = true;
      }
    }
  };

  return { nextTurn, randomPicker, playerChoice, tieChecker, winnerChecker };
})();

const DisplayController = (() => {
  const displayBoard = () => {
    Gameboard.grid.forEach((rowItem, rowIndex) => {
      const row = document.createElement("div");

      row.classList.add("row");
      row.dataset.row = rowIndex;

      rowItem.forEach((colItem, colIndex) => {
        const col = document.createElement("div");

        col.textContent = colItem;
        col.classList.add("col");
        col.dataset.col = colIndex;

        col.addEventListener("click", () => {
          if (col.textContent === "") {
            col.textContent = GameController.playerChoice(currentPlayer);

            Gameboard.grid[rowIndex][colIndex] =
              GameController.playerChoice(currentPlayer);

            console.table(Gameboard.grid);

            GameController.winnerChecker(currentPlayer);

            GameController.nextTurn();
          }
        });

        row.appendChild(col);
      });

      grid.appendChild(row);
    });
  };

  const displayResult = () => {};

  return { displayBoard };
})();

const grid = document.querySelector(".grid");
let currentPlayer = PlayerOne;

DisplayController.displayBoard();
