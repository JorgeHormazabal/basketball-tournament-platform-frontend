import TablaPartidos from "components/TablaPartidos/TablaPartidos";
import React from "react";

export default function EstadisticaLigaTab({
  id,
  points,
  pointsAgainst,
  favorablePoints,
  matchesLost,
  matchesWon,
  leagueId,
  name,
  rules,
  startDate,
  endDate,
  teamId
}) {
  return (
    <div>
      <div className="container bg-primary p-3 pb-1 border border-2">
        <div className="d-flex text-white justify-content-between">
          <h2>{name}</h2>
          <div className="d-flex flex-column">
            <p>Fecha de inicio: {startDate}</p>
            <p>Fecha de fin: {endDate}</p>
          </div>
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Puntos</th>
              <th scope="col">Puntos en contra</th>
              <th scope="col">Puntos favorables</th>
              <th scope="col">Partidos perdidos</th>
              <th scope="col">Partidos ganados</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <th scope="row">{points}</th>
              <td>{pointsAgainst}</td>
              <td>{favorablePoints}</td>
              <td>{matchesLost}</td>
              <td>{matchesWon}</td>
            </tr>
          </tbody>
        </table>
        <TablaPartidos teamId={teamId}/>
      </div>
    </div>
  );
}
