const readInput = require("../../../utils/readInput");

module.exports = function () {
  let input = readInput();
  let array = input[0].split(",");

  let days = 80;

  let countByTimeToHatch = Array(9).fill(0);
  array.forEach((initialTimeToHatch) => {
    countByTimeToHatch[Number(initialTimeToHatch)]++;
  });

  // [0, 1, 1, 2, 1, 0, 0, 0, 0]
  // [1, 1, 2, 1, 0, 0, 0, 0, 0]
  // [1, 2, 1, 0, 0, 0, 1, 0, 1]
  // [0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let t = 0; t < days; t++) {
    let tempTimer = Array(9).fill(0);
    countByTimeToHatch.forEach((count, daysToHatch) => {
      // If daysToHatch is 0 then it essentially dies and adds a new 6 and 8
      if (daysToHatch == 0) {
        tempTimer[6] += count;
        tempTimer[8] += count;
        // Else it just gets one day closer to death
      } else {
        tempTimer[daysToHatch - 1] += count;
      }
    });

    countByTimeToHatch = tempTimer;
  }

  return countByTimeToHatch.reduce((a, b) => a + b, 0);
};
