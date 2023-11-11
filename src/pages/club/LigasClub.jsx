import { useEffect, useState } from "react";

import "../Dashboard.scss";
import Spinner from "components/Spinner/Spinner";
import { ModalEquipo } from "components/club/ModalEquipo/ModalEquipo";
import EstadisticaLigaTab from "components/club/EstadisticaLigaTab/EstadisticaLigaTab";
import {
  useEquipoStore,
  useEstadisticaLigaEquipoStore,
  usePartidoStore,
} from "hooks";

export function LigasClub() {
  const { cargarEquiposYPartidosDelClub, isLoading } = useEquipoStore();
  const [equipos, setEquipos] = useState(null);

  useEffect(() => {
    cargarEquiposYPartidosDelClub().then((data) => setEquipos(data));
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <h1>Ligas </h1>
        <div className="mt-5">
          {equipos ? (
            equipos.map((equipo) => (
              <EstadisticaLigaTab
                key={equipo.id}
                teamLeagueParticipations={equipo.teamLeagueParticipations}
                division={equipo.division}
                coach={equipo.coach}
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
