import { useEffect } from "react";

import "./Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import { ModalClubes } from "components/administrador/ModalClubes/ModalClubes";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useClubStore } from "hooks";

export function Club() {
  const { clubes, setActiveClub, startDeletingEvent, startLoadingClubs } =
    useClubStore();

  const borrar = (club) => {
    setActiveClub(club);
    startDeletingEvent();
  };

  const editarModal = (club) => {
    setActiveClub(club);
  };
  const abrirModal = () => {
    setActiveClub(null);
  };

  useEffect(() => {
    startLoadingClubs();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <BotonAgregar
          titulo="Clubes"
          boton="Agregar Club"
          abrir={abrirModal}
          modalId={"modalClub"}
        />
        {clubes.length > 0 ? (
          <Tabla
            cabeceras={["id", "Nombre", "Correo", "Contraseña"]}
            filas={["name", "email", "password"]}
            data={clubes}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalClub"}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <ModalClubes />
    </div>
  );
}
