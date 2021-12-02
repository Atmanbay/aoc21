const readFile = require("../../../utils/readFile");

module.exports = function () {
  let array = readFile(__dirname, "1.txt", "\n");

  let position = {
    horizontal: 0,
    depth: 0,
  };

  let funcMapping = {
    forward: (value) => (position.horizontal = position.horizontal + value),
    up: (value) => (position.depth = position.depth - value),
    down: (value) => (position.depth = position.depth + value),
  };

  for (let i = 0; i < array.length; i++) {
    let command = array[i];
    let args = command.split(" ");

    let func = funcMapping[args[0]];
    let val = Number(args[1]);
    func(val);
  }

  return position.horizontal * position.depth;
};
