const calculateFuel = (diff) => {
  return (diff * (diff + 1)) / 2;
};

module.exports = function (input) {
  let array = input[0].split(",").map((item) => Number(item));

  let mean = array.reduce((a, b) => a + b, 0) / array.length;
  let highMean = Math.ceil(mean);
  let lowMean = Math.floor(mean);

  let fuelUsed = Math.min(
    array.reduce((a, b) => a + calculateFuel(Math.abs(b - highMean)), 0),
    array.reduce((a, b) => a + calculateFuel(Math.abs(b - lowMean)), 0)
  );

  return fuelUsed;
};
