import { useEffect } from "react";

import "./Dashboard.scss";
import { useClubStore, useUiClub } from "../../hooks";
import { TailSpin } from "react-loader-spinner";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import { ModalClubes } from "components/ModalClubes/ModalClubes";
import Tabla from "components/Tabla/Tabla";

export function Club() {
  const {
    events: clubes,
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
  } = useClubStore();
  const { openDateModal } = useUiClub();

  const borrar = (club) => {
    setActiveEvent(club);
    startDeletingEvent();
  };

  const editarModal = (club) => {
    setActiveEvent(club);
    openDateModal();
  };
  const abrirModal = () => {
    setActiveEvent(null);
    openDateModal();
  };

  useEffect(() => {
    startLoadingEvents();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <BotonAgregar titulo="Clubes" boton="Agregar Club" abrir={abrirModal} />
        {clubes.length > 0 ? (
          <Tabla
            cabeceras={["id", "Nombre", "Correo", "Contraseña", "Acciones"]}
            filas={["id", "name", "email", "password"]}
            data={clubes}
            editar={editarModal}
            borrar={borrar}
          />
        ) : (
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
      </div>
      <ModalClubes />
    </div>
  );
}
