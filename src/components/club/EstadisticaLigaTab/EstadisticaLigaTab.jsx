import TablaPartidos from "components/TablaPartidos/TablaPartidos";
import { handleDownload } from "helpers";

export default function EstadisticaLigaTab({
  id: equipoId,
  division,
  coach,
  teamLeagueParticipations,
}) {
  return (
    <div className="my-5">
      <div className="container p-3 pb-1 border border-5 fs-5 text">
        <div className="d-flex  justify-content-between">
          <h2>
            Equipo {division.category} - {coach}
          </h2>
        </div>
        {teamLeagueParticipations.map((participation, index) => (
          <div key={index} className="my-5 p-4 border border-2">
            <div className="row">
              <div className="col">
                <p className="fw-bold">{participation.leagueInfo.name}</p>
                <button
                  className="btn btn-link"
                  onClick={() =>
                    handleDownload(
                      participation.leagueInfo.rules,
                      participation.leagueInfo.name
                    )
                  }
                >
                  Descargar reglas
                </button>
              </div>
              <div className="col">
                <p>Fecha de inicio: {participation.leagueInfo.startDate}</p>
                <p>Fecha de fin: {participation.leagueInfo.endDate}</p>
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
                  <th scope="row">
                    {participation.teamLeagueStatistics.points}
                  </th>
                  <td>{participation.teamLeagueStatistics.pointsAgainst}</td>
                  <td>{participation.teamLeagueStatistics.favorablePoints}</td>
                  <td>{participation.teamLeagueStatistics.matchesLost}</td>
                  <td>{participation.teamLeagueStatistics.matchesWon}</td>
                </tr>
              </tbody>
            </table>
            <TablaPartidos
              partidos={participation.matches}
              equipoId={equipoId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
