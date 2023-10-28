import { displayName } from "helpers";
import "./PlayerList.scss";

export const PlayerList = ({ elementId, players, points, fouls }) => {
  return (
    <div id={elementId} className="controlpanel__players-list">
      <table>
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>Puntos</th>
            <th>Faltas</th>
          </tr>
          {players.map((player) => (
            <tr key={player.id}>
              <td>
                {player.shirtNumber} {displayName(player.name)}
              </td>
              <td>{points[player.id]}</td>
              <td>{fouls[player.id]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
