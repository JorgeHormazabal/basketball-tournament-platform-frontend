import { useEffect } from "react";

import "../Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useEquipoStore } from "hooks/useEquipoStore";
import { ModalEquipo } from "components/club/ModalEquipo/ModalEquipo";
import { ModalInformeEquipo } from "components/club/ModalInformeEquipo/ModalInformeEquipo";

export function EquiposClub() {
  const {
    equipos,
    setEquipoActivo,
    borrarEquipo,
    cargarEquiposDelClub,
    isLoading,
  } = useEquipoStore();

  const borrar = (equipo) => {
    setEquipoActivo(equipo);
    borrarEquipo(equipo);
  };

  const editarModal = (equipo) => {
    setEquipoActivo(equipo);
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
            modalIdInformeEquipo={"modalGenerarExcel"}
            mostrarInformeEquipo={true}
          />
        )}
      </div>
      <ModalEquipo />
      <ModalInformeEquipo />
    </div>
  );
}
