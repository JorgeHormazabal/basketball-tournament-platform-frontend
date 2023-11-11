import { useEffect } from "react";

import "../Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useEquipoStore } from "hooks/useEquipoStore";
import { ModalEquipo } from "components/club/ModalEquipo/ModalEquipo";

export function EquiposClub() {
  const {
    equipos,
    setEquipoActivo,
    borrarEquipo,
    cargarEquiposDelClub,
    isLoading,
  } = useEquipoStore();

  const borrar = (club) => {
    setEquipoActivo(club);
    borrarEquipo(club);
  };

  const editarModal = (club) => {
    setEquipoActivo(club);
  };
  const abrirModal = () => {
    setEquipoActivo(null);
  };

  useEffect(() => {
    cargarEquiposDelClub();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <BotonAgregar
          titulo="Equipos"
          boton="Agregar equipo"
          abrir={abrirModal}
          modalId={"modalEquipo"}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <Tabla
            cabeceras={["División", "Entrenador"]}
            filas={["displayDivision", "coach"]}
            data={equipos}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalEquipo"}
          />
        )}
      </div>
      <ModalEquipo />
    </div>
  );
}
