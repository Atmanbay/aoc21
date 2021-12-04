const readFile = require("../../../utils/readFile");

const calledNumberMarker = "X";
const length = 5;
const indexOf2d = (array2d, value) => {
  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      if (array2d[row][col] == value) {
        return {
          row,
          col,
        };
      }
    }
  }

  return null;
};

module.exports = function () {
  let array = readFile(__dirname, "input.txt", "\n");

  let calledNumbers = array
    .shift()
    .split(",")
    .map((calledNumber) => Number(calledNumber));
  let boards = [];

  array.shift(); // remove blank line

  let rowCount = 0;
  let board = [];
  array.forEach((line) => {
    if (line == "") {
      boards.push([...board]);
      rowCount = 0;
      return;
    }

    let numbers = line.split(" ").filter((i) => i);
    board[rowCount] = [];
    numbers.forEach((number) => {
      board[rowCount].push(Number(number));
    });
    rowCount++;
  });

  for (let i = 0; i < calledNumbers.length; i++) {
    let calledNumber = calledNumbers[i];
    for (let j = 0; j < boards.length; j++) {
      let board = boards[j];
      let indices = indexOf2d(board, calledNumber);
      if (indices) {
        board[indices.row][indices.col] = calledNumberMarker;

        let winner = false;
        for (let row = 0; row < length; row++) {
          if (board[row].every((value) => value == calledNumberMarker)) {
            winner = true;
            break;
          }
        }

        for (let col = 0; col < length; col++) {
          if (
            [
              board[0][col],
              board[1][col],
              board[2][col],
              board[3][col],
              board[4][col],
            ].every((value) => value == calledNumberMarker)
          ) {
            winner = true;
            break;
          }
        }

        if (winner) {
          let uncalledNumbers = [];
          for (let row = 0; row < length; row++) {
            uncalledNumbers.push(
              ...board[row].filter((value) => value != calledNumberMarker)
            );
          }

          let uncalledNumberSum = uncalledNumbers.reduce((a, b) => a + b, 0);
          return uncalledNumberSum * calledNumber;
        }
      }
    }
  }
};
