function getMedian(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

module.exports = function (input) {
  let array = input[0].split(",").map((item) => Number(item));

  let median = getMedian(array);
  let fuelUsed = array.reduce((a, b) => a + Math.abs(b - median), 0);

  return fuelUsed;
};
