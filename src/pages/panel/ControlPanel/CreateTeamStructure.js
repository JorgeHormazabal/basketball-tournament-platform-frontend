export function createTeamStructure(localTeamPlayers, awayTeamPlayers) {
  let currentPlayerId = 1;
  const generateId = () => currentPlayerId++;

  const formatPlayers = (players) =>
    players.map((player) => ({
      id: generateId(),
      shirtNumber:
        player.shirtNumber || player.shirtNumber.length > 0
          ? player.shirtNumber
          : 0,
      name: player.name || player.name.length > 0 ? player.name : "Jugador",
    }));

  const homePlayers = formatPlayers(localTeamPlayers);
  const awayPlayers = formatPlayers(awayTeamPlayers);
  console.log(homePlayers, localTeamPlayers, awayPlayers);

  const createFaultsAndPointsStructure = (players) =>
    players.reduce((acc, player) => {
      acc[player.id] = 0;
      return acc;
    }, {});

  return {
    away: "",
    home: "",
    awayPlayers,
    homePlayers,
    period: 1,
    homePoints: 0,
    awayPoints: 0,
    activeHomePlayers: homePlayers.slice(0, 5),
    activeAwayPlayers: awayPlayers.slice(0, 5),
    homePlayersFaults: [createFaultsAndPointsStructure(homePlayers)],
    awayPlayersFaults: [createFaultsAndPointsStructure(awayPlayers)],
    homePlayersPoints: createFaultsAndPointsStructure(homePlayers),
    awayPlayersPoints: createFaultsAndPointsStructure(awayPlayers),
    direction: "none",
  };
}
