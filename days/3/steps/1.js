const readFile = require("../../../utils/readFile");

module.exports = function () {
  let array = readFile(__dirname, "input.txt", "\n").map((line) =>
    line.split("").map((item) => Number(item))
  );

  // Add up all bits column-by-column
  // If the result is greater than half of the length of the array then 1 is more common, otherwise 0 is more common
  let result = array
    .reduce((previous, current) =>
      previous.map((item, index) => item + current[index])
    )
    .map((e) => Number(e > array.length * 0.5))
    .join("");

  let gamma = parseInt(result, 2);
  let mask = parseInt("".padEnd(result.length, 1), 2);
  let epsilon = gamma ^ mask;

  return gamma * epsilon;
};
