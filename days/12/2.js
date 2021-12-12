// this is ugly please don't look
module.exports = function (input) {
  const START_NAME = "start";
  const END_NAME = "end";

  let paths = [];
  let connections = input.map((line) => line.split("-"));

  const canVisitRoom = (currentPath, possibleRoom) => {
    if (possibleRoom == possibleRoom.toUpperCase()) {
      return true;
    }

    if (possibleRoom == END_NAME) {
      return true;
    }

    if (possibleRoom == possibleRoom.toLowerCase()) {
      let countOfLowercaseRooms = {};
      let doubleRoomExists = false;
      currentPath.forEach((room) => {
        if (room == room.toLowerCase()) {
          if (!(room in countOfLowercaseRooms)) {
            countOfLowercaseRooms[room] = 0;
          }

          countOfLowercaseRooms[room]++;
          if (countOfLowercaseRooms[room] == 2) {
            doubleRoomExists = true;
          }
        }
      });

      if (countOfLowercaseRooms[possibleRoom] == 2) {
        return false;
      }

      if (doubleRoomExists && countOfLowercaseRooms[possibleRoom] > 0) {
        return false;
      }

      return true;
    }

    return true;
  };

  const continuePath = (currentPath) => {
    let lastRoom = currentPath.at(-1);
    let viableConnections = connections.filter((viableConnection) =>
      viableConnection.includes(lastRoom)
    );

    if (viableConnections.length == 0) {
      if (lastRoom == END_NAME) {
        paths.push(currentPath);
      }
      return;
    }

    viableConnections.forEach((viableConnection) => {
      let continuation = viableConnection.find((room) => room != lastRoom);
      if (
        continuation == START_NAME ||
        !canVisitRoom(currentPath, continuation)
      ) {
        return;
      }

      let tempPath = [...currentPath];
      tempPath.push(continuation);

      if (continuation == END_NAME) {
        paths.push(tempPath);
        return;
      }

      continuePath(tempPath, viableConnection);
    });
  };

  let startingConnections = connections.filter((connection) =>
    connection.includes(START_NAME)
  );

  startingConnections.forEach((startingConnection) => {
    let continuation = startingConnection.find((room) => room != START_NAME);
    continuePath([START_NAME, continuation], startingConnection);
  });

  console.log(paths.map((path) => path.join(",")));

  return paths.length;
};
