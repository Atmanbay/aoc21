module.exports = function (input) {
  let sum = 0;
  let rows = input.map((line) => line.split("").map((value) => Number(value)));
  let rowCount = rows.length;
  let colCount = rows[0].length;
  rows.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (colIndex != 0 && value >= rows[rowIndex][colIndex - 1]) {
        return;
      }

      if (colIndex + 1 != colCount && value >= rows[rowIndex][colIndex + 1]) {
        return;
      }

      if (rowIndex != 0 && value >= rows[rowIndex - 1][colIndex]) {
        return;
      }

      if (rowIndex + 1 != rowCount && value >= rows[rowIndex + 1][colIndex]) {
        return;
      }

      sum += value + 1;
    });
  });

  return sum;
};
