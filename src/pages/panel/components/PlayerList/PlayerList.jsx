import { displayName, sumValuesAtIndex } from "helpers";
import "./PlayerList.scss";
import sumAttributeInArray from "helpers/sumAttributeInArray";

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
              <td>{sumAttributeInArray(fouls, player.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
