module.exports = function (input) {
  let maxSteps = 10;
  let template = input.shift();
  let mappings = input.slice(1).reduce((a, b) => {
    let split = b.split(" -> ");
    return { ...a, [split[0]]: split[1] };
  }, {});

  let polymerPairCounts = {};
  let characterCounts = [...template].reduce(
    (res, char) => ((res[char] = (res[char] || 0) + 1), res),
    {}
  );
  for (let i = 0; i < template.length - 1; i++) {
    let chunk = template.substring(i, 2 + i);
    if (!(chunk in polymerPairCounts)) {
      polymerPairCounts[chunk] = 0;
    }

    polymerPairCounts[chunk]++;
  }

  for (let step = 0; step < maxSteps; step++) {
    let tempPolymerPairCounts = {};
    let pairs = Object.keys(polymerPairCounts);
    pairs.forEach((pair) => {
      let count = polymerPairCounts[pair];
      let mapping = mappings[pair];
      if (!(mapping in characterCounts)) {
        characterCounts[mapping] = 0;
      }

      for (let i = 0; i < count; i++) {
        characterCounts[mapping]++;
        polymerPairCounts[pair]--;

        let newPairs = [`${pair[0]}${mapping}`, `${mapping}${pair[1]}`];
        newPairs.forEach((newPair) => {
          if (!(newPair in tempPolymerPairCounts)) {
            tempPolymerPairCounts[newPair] = 0;
          }

          tempPolymerPairCounts[newPair]++;
        });
      }
    });

    polymerPairCounts = tempPolymerPairCounts;
  }

  let characters = Object.keys(characterCounts);
  let max = characters[0];
  let min = characters[0];
  characters.forEach((character) => {
    let value = characterCounts[character];
    if (value > characterCounts[max]) {
      max = character;
    } else if (value < characterCounts[min]) {
      min = character;
    }
  });

  return characterCounts[max] - characterCounts[min];
};
