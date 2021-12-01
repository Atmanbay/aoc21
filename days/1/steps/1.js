const readFile = require("../../../utils/readFile");

module.exports = function () {
  let array = readFile(__dirname, "1.txt", "\n").map((item) => Number(item));

  let counter = 0;
  let previousValue = null;
  for (let i = 0; i < array.length; i++) {
    let currentValue = array[i];
    if (previousValue && currentValue > previousValue) {
      counter++;
    }

    previousValue = currentValue;
  }

  return counter;
};
