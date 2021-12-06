const regex = /(\d+),(\d+) -> (\d+),(\d+)/;
const stringToLine = (str) => {
  let matches = str.match(regex);
  return {
    a: {
      x: Number(matches[1]),
      y: Number(matches[2]),
    },
    b: {
      x: Number(matches[3]),
      y: Number(matches[4]),
    },
  };
};

module.exports = function (input) {
  let counter = 0;
  let map = {};
  input.forEach((lineStr) => {
    let line = stringToLine(lineStr);

    if (line.a.x != line.b.x && line.a.y != line.b.y) {
      return;
    }

    let pointCount = Math.abs(line.a.x - line.b.x) + 1;
    if (pointCount == 1) {
      pointCount = Math.abs(line.a.y - line.b.y) + 1;
    }
    let xDiff = line.b.x - line.a.x;
    let xInc = xDiff / (pointCount - 1);
    let yDiff = line.b.y - line.a.y;
    let yInc = yDiff / (pointCount - 1);
    for (let i = 0; i < pointCount; i++) {
      let newX = i * xInc + line.a.x;
      let newY = i * yInc + line.a.y;

      if (!(newX in map)) {
        map[newX] = {};
      }

      if (!(newY in map[newX])) {
        map[newX][newY] = 0;
      }

      map[newX][newY]++;
      if (map[newX][newY] == 2) {
        counter++;
      }
    }
  });

  return counter;
};
