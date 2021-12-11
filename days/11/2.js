module.exports = function (input) {
  let stepCount = 100000;
  let table = input.map((row) => row.split("").map(Number));
  let size = input[0].length;

  let check = (row, col) => {
    if (row < 0 || row >= size || col < 0 || col >= size) {
      return;
    }

    table[row][col]++;
    if (table[row][col] == 10) {
      check(row - 1, col - 1);
      check(row - 1, col);
      check(row - 1, col + 1);
      check(row, col - 1);
      check(row, col + 1);
      check(row + 1, col - 1);
      check(row + 1, col);
      check(row + 1, col + 1);
    }
  };

  for (let i = 0; i < stepCount; i++) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        check(row, col);
      }
    }

    let didAllFlash = true;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (table[row][col] > 9) {
          table[row][col] = 0;
        } else {
          didAllFlash = false;
        }
      }
    }

    if (didAllFlash) {
      return i + 1;
    }
  }
};
