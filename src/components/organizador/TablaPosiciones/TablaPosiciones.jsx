import { imagePath } from "helpers";
import { useEstadisticaLigaEquipoStore, useLigaStore } from "hooks";
import { useEffect } from "react";

export function TablaPosiciones({ trigger }) {
  const { ligaActiva } = useLigaStore();
  const {
    estadisticasLigaEquipo: estadisticas,
    cargarEstadisticasDeLiga,
    isLoading,
  } = useEstadisticaLigaEquipoStore();

  useEffect(() => {
    console.log("estadisticas");
  }, [estadisticas]);

  return (
    <div className="table-responsive py-3">
      <table className="table table" style={{ width: "900px" }}>
        <thead className="table-light">
          <tr>
            <th className="text-start" scope="col">
              &nbsp;POS
            </th>
            <th className="text-start" scope="col">
              Equipo
            </th>
            <th className="text-center" scope="col">
              PJ
            </th>
            <th className="text-center" scope="col">
              PG
            </th>
            <th className="text-center" scope="col">
              PP
            </th>
            <th className="text-center" scope="col">
              PUNTOS
            </th>
            <th className="text-center" scope="col">
              PTS. FAV.
            </th>
            <th className="text-center" scope="col">
              PTS. CON.
            </th>
            <th className="text-center" scope="col">
              DIF
            </th>
          </tr>
        </thead>
        <tbody>
          {estadisticas.map((equipo, index) => (
            <tr key={index}>
              <td className="text-start align-middle">
                &nbsp;&nbsp;&nbsp;{index + 1}
              </td>
              <td className="text-start align-middle">
                <img
                  src={
                    equipo.team.club.image
                      ? imagePath(equipo.team.club.image)
                      : "img/default_club.png"
                  }
                />
                &nbsp;&nbsp;&nbsp;{equipo.team.club.name}
              </td>
              <td className="text-center align-middle">
                {equipo.matchesWon + equipo.matchesLost}
              </td>
              <td className="text-center align-middle">{equipo.matchesWon}</td>
              <td className="text-center align-middle">{equipo.matchesLost}</td>
              <td className="text-center align-middle">{equipo.points}</td>
              <td className="text-center align-middle">
                {equipo.favorablePoints}
              </td>
              <td className="text-center align-middle">
                {equipo.pointsAgainst}
              </td>
              <td className="text-center align-middle">
                {equipo.favorablePoints - equipo.pointsAgainst}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
