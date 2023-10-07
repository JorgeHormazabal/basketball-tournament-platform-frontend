import { useEffect } from "react";
import "./pages.css";
import Tabla from "../Components/Tabla/Tabla";
import { ModalClubes } from "../Components/ModalClubes/ModalClubes";
import BotonAgregar from "../Components/BotonAgregar/BotonAgregar";

import "./Dashboard.scss";
import { useClubStore, useUiClub } from "../hooks";

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
        {clubes.length > 0 && (
          <Tabla
            cabeceras={["id", "Nombre", "Correo", "Contraseña", "Acciones"]}
            filas={["id", "name", "email", "password"]}
            data={clubes}
            editar={editarModal}
            borrar={borrar}
          />
        )}
      </div>
      <ModalClubes />
    </div>
  );
}
