import { displayName } from "helpers";
import "./ActivePlayers.scss";
import { useEffect } from "react";

export default function ActivePlayers({
  elementId,
  activePlayers,
  players,
  update,
  updateFouls,
  updatePoints,
}) {
  const onChange = (index, value) => {
    const newActivePlayers = [...activePlayers];
    newActivePlayers[index] = players.find((p) => p.id === value);
    update(
      elementId === "controlpanel__home-active-players"
        ? "activeHomePlayers"
        : "activeAwayPlayers",
      newActivePlayers
    );
  };

  return (
    <div id={elementId} className="controlpanel_active-players">
      <table>
        <thead>
          <tr>
            <th className="controlpanel_active-players__col1">Jugadores</th>
            <th className="controlpanel_active-players__col2">Puntaje</th>
            <th className="controlpanel_active-players__col3">Faltas</th>
          </tr>
        </thead>
        <tbody className="controlpanel_active-players__container">
          {activePlayers.map((player, index) => (
            <tr key={player.id} className="controlpanel_active-players__box">
              <td className="controlpanel_active-players__col1">
                <select
                  className="controlpanel_active-players__select"
                  value={player.id}
                  onChange={(event) => onChange(index, +event.target.value)}
                >
                  {players.map((p) => (
                    <option
                      value={p.id}
                      key={p.id}
                      hidden={activePlayers.some(
                        (active) => active.id === p.id
                      )}
                    >
                      {p.shirtNumber} {displayName(p.name)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="controlpanel_active-players__points controlpanel_active-players__col2">
                <button
                  className="controlpanel_active-players__add-btn"
                  onClick={() => updatePoints(player.id, 1)}
                >
                  +1
                </button>
                <button
                  className="controlpanel_active-players__add-btn"
                  onClick={() => updatePoints(player.id, 2)}
                >
                  +2
                </button>
                <button
                  className="controlpanel_active-players__add-btn"
                  onClick={() => updatePoints(player.id, 3)}
                >
                  +3
                </button>
                <span className="controlpanel__active-players__space"></span>
                <button
                  className="controlpanel_active-players__remove-btn"
                  onClick={() => updatePoints(player.id, -1)}
                >
                  -1
                </button>
                <button
                  className="controlpanel_active-players__remove-btn"
                  onClick={() => updatePoints(player.id, -2)}
                >
                  -2
                </button>
                <button
                  className="controlpanel_active-players__remove-btn"
                  onClick={() => updatePoints(player.id, -3)}
                >
                  -3
                </button>
              </td>
              <td className="controlpanel_active-players__fouls controlpanel_active-players__col3">
                <button
                  className="controlpanel_active-players__add-btn"
                  onClick={() => updateFouls(player.id, 1)}
                >
                  +1
                </button>
                <button
                  className="controlpanel_active-players__remove-btn"
                  onClick={() => updateFouls(player.id, -1)}
                >
                  -1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
