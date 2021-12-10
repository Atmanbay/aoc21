module.exports = function (input) {
  let score = 0;
  let mapping = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };
  let scoring = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  input.forEach((line) => {
    let stack = [];
    for (let i = 0; i < line.length; i++) {
      let character = line[i];
      if (character in mapping) {
        let popped = stack.pop();
        if (mapping[character] != popped) {
          score += scoring[character];
          return;
        }
      } else {
        stack.push(character);
      }
    }
  });

  return score;
};
