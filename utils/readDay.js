const fs = require("fs");

module.exports = function (day) {
  let steps = fs.readdirSync(`${__dirname}/../days/${day}`);
  return steps.map((step) => require(`${__dirname}/../days/${day}/${step}`));
};
