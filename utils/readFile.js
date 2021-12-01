const fs = require("fs");

module.exports = function (directory, fileName, delimiter) {
  return fs
    .readFileSync(`${directory}/../inputs/${fileName}`)
    .toString()
    .split(delimiter);
};
