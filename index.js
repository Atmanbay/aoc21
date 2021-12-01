const readDay = require("./utils/readDay");

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

let steps = readDay(day);
if (stepNumber !== null) {
  console.log(steps[stepNumber]());
} else {
  steps.forEach((step) => console.log(step()));
}
