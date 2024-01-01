import { displayName } from "helpers";
import sumAttributeInArray from "helpers/sumAttributeInArray";
import "./Players.scss";

export default function Players({ players, faults, elementId }) {
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
          <span
            className={`scoreboard__players__faults ${
              sumAttributeInArray(faults, player.id) >= 5
                ? "scoreboard__players__faults--red"
                : undefined
            }`}
          >
            {sumAttributeInArray(faults, player.id)}
          </span>
        </div>
      ))}
    </div>
  );
}
