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

  let command = commands[0];
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

  return tempCoordinates.length;
  // coordinates = tempCoordinates;
};
