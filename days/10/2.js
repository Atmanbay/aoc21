module.exports = function (input) {
  let scores = [];
  let closeToOpenMapping = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };
  let openToCloseMapping = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  let scoring = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  input.forEach((line) => {
    let stack = [];
    for (let i = 0; i < line.length; i++) {
      let character = line[i];
      if (character in closeToOpenMapping) {
        let popped = stack.pop();
        if (closeToOpenMapping[character] != popped) {
          return; // means it's corrupted!!!
        }
      } else {
        stack.push(character);
      }
    }

    let toComplete = stack
      .reverse()
      .map((character) => openToCloseMapping[character]);
    let score = 0;
    toComplete.forEach((character) => {
      score = score * 5;
      score = score + scoring[character];
    });
    scores.push(score);
  });

  let sorted = scores.sort((a, b) => b - a);
  return sorted[Math.floor(sorted.length / 2)];
};
