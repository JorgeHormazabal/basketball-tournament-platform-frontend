import "./ResultTable.scss";

function transformMatchData(matchDetails, fullMatchInfo) {
  const getPlayerName = (playerId) => {
    const player =
      matchDetails.homePlayers.find((p) => p.id == playerId) ||
      matchDetails.awayPlayers.find((p) => p.id == playerId);
    return `${player?.shirtNumber} - ${player?.name}`;
  };

  const processData = (team, playersPoints, playersFaults) => {
    return Object.keys(playersPoints).map((playerId) => ({
      name: getPlayerName(playerId),
      freeThrows: playersPoints[playerId][0],
      doubleDoubles: playersPoints[playerId][1],
      threePointers: playersPoints[playerId][2],
      faults: playersFaults[playerId] || 0,
    }));
  };

  const awayPlayers = processData(
    "away",
    matchDetails.awayPlayersPointsFull,
    matchDetails.awayPlayersFaults[0]
  );
  const homePlayers = processData(
    "home",
    matchDetails.homePlayersPointsFull,
    matchDetails.homePlayersFaults[0]
  );

  return {
    matchId: fullMatchInfo.match.id,
    leagueName: fullMatchInfo.fullMatchInfo.league.name,
    dateTime: fullMatchInfo.match.dateTime,
    place: fullMatchInfo.match.place,
    homePoints: fullMatchInfo.match.homePoints,
    awayPoints: fullMatchInfo.match.awayPoints,
    awayPlayers,
    homePlayers,
  };
}

export default function BasketballMatch({
  matchDetails,
  fullMatchInfo,
  setShowTable,
}) {
  const matchData = transformMatchData(matchDetails, fullMatchInfo);
  return (
    <div className="result">
      <h2>{`Partido: ${matchData.leagueName}`}</h2>
      <p>{`Fecha: ${new Date(
        matchData.dateTime
      ).toLocaleString()}, fin: ${new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}`}</p>
      <p>{`Lugar: ${matchData.place}`}</p>
      <p>{`Resultado: Casa ${matchData.homePoints} - Visitante ${matchData.awayPoints}`}</p>
      <h2>Jugadores del equipo Local</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tiros libres</th>
            <th>Dobles</th>
            <th>Triples</th>
            <th>Faltas</th>
          </tr>
        </thead>
        <tbody>
          {matchData.homePlayers.map((player) => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.freeThrows}</td>
              <td>{player.doubleDoubles}</td>
              <td>{player.threePointers}</td>
              <td>{player.faults}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Jugadores del equipo Visitante</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tiros libres</th>
            <th>Dobles</th>
            <th>Triples</th>
            <th>Faltas</th>
          </tr>
        </thead>
        <tbody>
          {matchData.awayPlayers.map((player) => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.freeThrows}</td>
              <td>{player.doubleDoubles}</td>
              <td>{player.threePointers}</td>
              <td>{player.faults}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="close-button" onClick={() => setShowTable(false)}>
        Cerrar
      </button>
    </div>
  );
}
