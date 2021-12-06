const readDay = require("./utils/readDay");
const readInput = require("./utils/readInput");

let dayArg = process.argv[2];
let day = null;
let stepNumber = null;
if (dayArg.includes(".")) {
  let splitDayArg = dayArg.split(".");
  day = Number(splitDayArg[0]);
  stepNumber = Number(splitDayArg[1]) - 1;
} else {
  day = Number(dayArg);
}

if (!day) {
  console.log("invalid day");
  return;
}

let input = readInput();
let steps = readDay(day);
if (stepNumber !== null) {
  console.log(`STEP ${stepNumber + 1}`, steps[stepNumber](input));
} else {
  steps.forEach((step, stepNumber) =>
    console.log(`STEP ${stepNumber + 1}`, step(input))
  );
}
