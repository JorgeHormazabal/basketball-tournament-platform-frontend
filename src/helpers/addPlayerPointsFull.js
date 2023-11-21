function addPlayersPointsFull(game) {
  // Initialize the new properties
  const points = {}
  points.homePlayersPointsFull = {};
  points.awayPlayersPointsFull = {};

  // Process home players
  Object.keys(game.homePlayersPoints).forEach((playerId) => {
    points.homePlayersPointsFull[playerId] = [0, 0, 0];
  });

  // Process away players
  Object.keys(game.awayPlayersPoints).forEach((playerId) => {
    points.awayPlayersPointsFull[playerId] = [0, 0, 0];
  });

  return points;
}

export default addPlayersPointsFull;
