module.exports = function (input) {
  let coordinates = input
    .filter((line) => line.includes(","))
    .map((line) => line.split(",").map(Number))
    .map((array) => {
      return { x: array[0], y: array[1] };
    });
  let commands = input
    .filter((line) => line.includes("fold"))
    .map((line) => {
      let regex = /^fold along (.*?)=(.*?)$/;
      let match = line.match(regex);
      return { axis: match[1], location: Number(match[2]) };
    });

  let lastX = 0;
  let lastY = 0;

  commands.forEach((command) => {
    if (command.axis == "x") {
      lastX = command.location;
    } else {
      lastY = command.location;
    }
    let tempCoordinates = [];
    coordinates.forEach((coord) => {
      if (coord[command.axis] > command.location) {
        let newLocation = 2 * command.location - coord[command.axis];
        coord[command.axis] = newLocation;
      }

      if (
        !tempCoordinates.some(
          (tempCoord) => tempCoord.x == coord.x && tempCoord.y == coord.y
        )
      ) {
        tempCoordinates.push(coord);
      }
    });
    coordinates = tempCoordinates;
  });

  let answer = [];
  for (let y = 0; y < lastY; y++) {
    for (let x = 0; x < lastX; x++) {
      if (!(y in answer)) {
        answer[y] = [];
      }

      answer[y][x] = ".";
    }
  }

  coordinates.forEach((coord) => {
    answer[coord.y][coord.x] = "#";
  });

  return "\n" + answer.map((row) => row.join("")).join("\n");
};
