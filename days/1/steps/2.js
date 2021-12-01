const readFile = require("../../../utils/readFile");

module.exports = function () {
  let array = readFile(__dirname, "1.txt", "\n").map((item) => Number(item));
  let windowedArray = [];

  for (let i = 0; i < array.length - 2; i++) {
    let tempArray = array.slice(i, i + 3);
    windowedArray.push(tempArray.reduce((a, b) => a + b));
  }

  let counter = 0;
  let previousValue = null;
  for (let i = 0; i < windowedArray.length; i++) {
    let currentValue = windowedArray[i];
    if (previousValue && currentValue > previousValue) {
      counter++;
    }

    previousValue = currentValue;
  }

  return counter;
};
