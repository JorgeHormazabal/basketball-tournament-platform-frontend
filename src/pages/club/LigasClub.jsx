import { useEffect } from "react";

import "../Dashboard.scss";
import Spinner from "components/Spinner/Spinner";
import { ModalEquipo } from "components/club/ModalEquipo/ModalEquipo";
import EstadisticaLigaTab from "components/club/EstadisticaLigaTab/EstadisticaLigaTab";
import { useEstadisticaLigaEquipoStore } from "hooks";

export function LigasClub() {
  const { estadisticasLigaEquipo, cargarLigasDelClub } =
    useEstadisticaLigaEquipoStore();

  useEffect(() => {
    cargarLigasDelClub();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <h1>Ligas </h1>
        <div className="mt-5">
          {estadisticasLigaEquipo.length > 0 ? (
            estadisticasLigaEquipo.map((liga) => (
              <EstadisticaLigaTab key={liga.id} {...liga} {...liga.league} />
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
