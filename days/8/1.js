module.exports = function (input) {
  let count = 0;
  let unique = [2, 3, 4, 7];
  input.forEach((line) => {
    let outputs = line.split(" | ")[1].split(" ");
    count += outputs.filter((output) => unique.includes(output.length)).length;
  });

  return count;
};
