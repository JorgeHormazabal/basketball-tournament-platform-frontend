import "./Players.scss";

export default function Players({ players, faults, elementId }) {
  const displayName = (name) => {
    const parts = name.split(" ");
    return parts.length === 4
      ? `${parts[0]} ${parts[2][0]}.`
      : `${parts[0]} ${parts[1][0]}.`;
  };
  return (
    <div id={elementId}>
      <div id="scoreboard__player__header">
        <span id="scoreboard__player__header__player">Jugador</span>
        <span id="scoreboard__player__header__fouls">Faltas</span>
      </div>
      {players.map((player) => (
        <div key={player.id} className="scoreboard__players__player">
          <span className="scoreboard__players__name">
            <b>{player.shirtNumber}</b> {displayName(player.name)}
          </span>
          <span className="scoreboard__players__faults">
            {faults[player.id]}
          </span>
        </div>
      ))}
    </div>
  );
}
