const search = (rows, checked, xPos, yPos) => {
  // if we've already checked this spot then skip it
  if (checked.some((item) => item[0] == xPos && item[1] == yPos)) {
    return 0;
  }

  // if this spot is outside the board then skip it
  if (xPos < 0 || xPos >= rows.length || yPos < 0 || yPos >= rows[0].length) {
    return 0;
  }

  let value = rows[xPos][yPos];

  // if value is 9 then we've hit the end of this search
  if (value == 9) {
    return 0;
  } else {
    checked.push([xPos, yPos]);

    // return 1 (for this space) + continue searching from here
    return (
      1 +
      search(rows, checked, xPos, yPos - 1) +
      search(rows, checked, xPos, yPos + 1) +
      search(rows, checked, xPos - 1, yPos) +
      search(rows, checked, xPos + 1, yPos)
    );
  }
};

module.exports = function (input) {
  let basinSizes = [];
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

      let basinSize = search(rows, [], rowIndex, colIndex);
      basinSizes.push(basinSize);
    });
  });

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
};
