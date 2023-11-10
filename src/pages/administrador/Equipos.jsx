import { useEffect } from "react";

import "../Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useEquipoStore } from "hooks/useEquipoStore";
import { ModalEquipo } from "components/administrador/ModalEquipo/ModalEquipo";

export function Equipos() {
  const { equipos, setEquipoActivo, borrarEquipo, cargarEquipos, isLoading } =
    useEquipoStore();

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
    cargarEquipos();
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
            cabeceras={["Club", "División", "Entrenador"]}
            filas={["displayClub", "displayDivision", "coach"]}
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
