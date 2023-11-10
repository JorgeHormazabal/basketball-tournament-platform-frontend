import { useEffect } from "react";

import "../Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import { ModalClubes } from "components/administrador/ModalClubes/ModalClubes";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useClubStore } from "hooks";

export function Club() {
  const { clubes, setClubActivo, borrarClub, cargarClubes, isLoading } =
    useClubStore();

  const borrar = (club) => {
    setClubActivo(club);
    borrarClub(club);
  };

  const editarModal = (club) => {
    setClubActivo(club);
  };
  const abrirModal = () => {
    setClubActivo(null);
  };

  useEffect(() => {
    cargarClubes();
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
        {isLoading ? (
          <Spinner />
        ) : (
          <Tabla
            cabeceras={["Nombre", "Correo", "Contraseña"]}
            filas={["name", "email", "password"]}
            data={clubes}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalClub"}
          />
        )}
      </div>
      <ModalClubes />
    </div>
  );
}
