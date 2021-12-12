module.exports = function (input) {
  const START_NAME = "start";
  const END_NAME = "end";

  let paths = [];
  let connections = input.map((line) => line.split("-"));

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
        (continuation.toLowerCase() == continuation &&
          currentPath.includes(continuation))
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

  return paths.length;
};
