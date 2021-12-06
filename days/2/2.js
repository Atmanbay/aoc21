module.exports = function (input) {
  let position = {
    aim: 0,
    horizontal: 0,
    depth: 0,
  };

  let funcMapping = {
    forward: (value) => {
      position.horizontal = position.horizontal + value;
      position.depth = position.depth + value * position.aim;
    },
    up: (value) => (position.aim = position.aim - value),
    down: (value) => (position.aim = position.aim + value),
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
