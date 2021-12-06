module.exports = function (input) {
  let position = {
    horizontal: 0,
    depth: 0,
  };

  let funcMapping = {
    forward: (value) => (position.horizontal = position.horizontal + value),
    up: (value) => (position.depth = position.depth - value),
    down: (value) => (position.depth = position.depth + value),
  };

  for (let i = 0; i < input.length; i++) {
    let command = input[i];
    let args = command.split(" ");

    let func = funcMapping[args[0]];
    let val = Number(args[1]);
    func(val);
  }

  return position.horizontal * position.depth;
};
