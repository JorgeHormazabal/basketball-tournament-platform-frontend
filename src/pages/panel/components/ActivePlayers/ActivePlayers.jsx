import { displayName } from "helpers";
import "./ActivePlayers.scss";

export default function ActivePlayers({ elementId, activePlayers, players }) {
  return (
    <div id={elementId} className="controlpanel_active-players">
      <table>
        <thead>
          <tr>
            <th>Jugadores activos</th>
            <th>Puntaje</th>
            <th>Faltas</th>
          </tr>
        </thead>
        <tbody className="controlpanel_active-players__container">
          {activePlayers.map((player) => (
            <tr key={player.id} className="controlpanel_active-players__box">
              <td>
                <select
                  className="controlpanel_active-players__select"
                  value={player.id}
                >
                  {players.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.shirtNumber} {displayName(p.name)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="controlpanel_active-players__points">
                <button>-3</button>
                <button>-2</button>
                <button>-1</button>
                <button>+1</button>
                <button>+2</button>
                <button>+3</button>
              </td>
              <td className="controlpanel_active-players__fouls">
                <button>-1</button>
                <button>+1</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
