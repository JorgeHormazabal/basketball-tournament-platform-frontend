import { useEffect } from "react";

import "../Dashboard.scss";
import Spinner from "components/Spinner/Spinner";
import { ModalEquipo } from "components/club/ModalEquipo/ModalEquipo";
import EstadisticaLigaTab from "components/club/EstadisticaLigaTab/EstadisticaLigaTab";
import { useEstadisticaLigaEquipoStore } from "hooks";

export function LigasClub() {
  const { estadisticasLigaEquipo, cargarEstadisticasYLigasDelClub } =
    useEstadisticaLigaEquipoStore();

  useEffect(() => {
    cargarEstadisticasYLigasDelClub();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <h1>Ligas </h1>
        <div className="mt-5">
          {estadisticasLigaEquipo.length > 0 ? (
            estadisticasLigaEquipo.map((liga) => (
              <EstadisticaLigaTab
                key={liga.id}
                {...liga}
                {...liga.league}
                teamId={liga.team.id}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <ModalEquipo />
    </div>
  );
}
