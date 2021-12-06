const fs = require("fs");

module.exports = function () {
  console.log("Copy & paste puzzle input (CTRL+D to end)");
  let data = fs.readFileSync(0, "utf-8").toString().split("\n");
  console.log("");
  console.log("");
  return data;
};
