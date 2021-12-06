module.exports = function (input) {
  let array = input.map((line) => line.split("").map((item) => Number(item)));

  let bitLength = array[0].length;

  let arrayLength = array.length;
  let oxygenArray = [...array];
  let oxygenValue = 0;
  for (let i = 0; i < bitLength; i++) {
    let count = oxygenArray
      .map((line) => line[i])
      .reduce((previous, current) => previous + current);

    let desiredBit = 0;
    if (count >= arrayLength / 2) {
      desiredBit = 1;
    }

    oxygenArray = oxygenArray.filter((line) => line[i] === desiredBit);
    arrayLength = oxygenArray.length;
    if (oxygenArray.length == 1) {
      oxygenValue = oxygenArray[0].join("");
      oxygenValue = parseInt(oxygenValue, 2);
      break;
    }
  }

  arrayLength = array.length;
  let co2Array = [...array];
  let co2Value = 0;
  for (let i = 0; i < bitLength; i++) {
    let count = co2Array
      .map((line) => line[i])
      .reduce((previous, current) => previous + current);

    let desiredBit = 1;
    if (count >= arrayLength / 2) {
      desiredBit = 0;
    }

    co2Array = co2Array.filter((line) => line[i] === desiredBit);
    arrayLength = co2Array.length;
    if (co2Array.length == 1) {
      co2Value = co2Array[0].join("");
      co2Value = parseInt(co2Value, 2);
      break;
    }
  }

  return oxygenValue * co2Value;
};
