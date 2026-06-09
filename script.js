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

  return { sign };
})();

const PlayerTwo = (() => {
  const sign = "X";

  return { sign };
})();

const GameController = (() => {
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

      colDivs.forEach((col) => {
        col.classList.add("col-events");
      });

      result.textContent = `${currentPlayer.sign} win!`;
      console.log(`${currentPlayer.sign} win!`);
    }
  };

  const tieChecker = () => {
    for (let i = 0; i < Gameboard.grid.length; i++) {
      for (let j = 0; j < Gameboard.grid.length; j++) {
        if (Gameboard.grid[i][j] === "") {
          return;
        }
      }

      if (i === 2) {
        const colDivs = document.querySelectorAll(".col");

        colDivs.forEach((col) => {
          col.classList.add("col-events");
        });

        result.textContent = "Tie!";
        console.log("Tie!");
      }
    }
  };

  return { nextTurn, playerChoice, tieChecker, winnerChecker };
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

            GameController.tieChecker();

            GameController.nextTurn();
          }
        });

        row.appendChild(col);
      });

      grid.appendChild(row);
    });
  };

  return { displayBoard };
})();

const grid = document.querySelector(".grid");
const result = document.querySelector(".result");
let currentPlayer = PlayerOne;

DisplayController.displayBoard();
