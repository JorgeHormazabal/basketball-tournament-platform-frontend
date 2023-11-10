import { useEffect } from "react";

import "../Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { ModalOrganizador } from "components/administrador/ModalOrganizador/ModalOrganizador";
import { useOrganizadorStore } from "hooks";

export function Organizador() {
  const {
    organizadores,
    setOrganizadorActivo,
    borrarOrganizador,
    cargarOrganizadores,
    isLoading,
  } = useOrganizadorStore();
  //const { openDateModal } = useUiClub();

  const borrar = (club) => {
    setOrganizadorActivo(club);
    borrarOrganizador(club);
  };

  const editarModal = (club) => {
    setOrganizadorActivo(club);
  };
  const abrirModal = () => {
    setOrganizadorActivo(null);
  };

  useEffect(() => {
    cargarOrganizadores();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <BotonAgregar
          titulo="Organizadores"
          boton="Agregar organizador"
          abrir={abrirModal}
          modalId={"modalOrganizador"}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <Tabla
            cabeceras={["Nombre", "Correo", "Contraseña"]}
            filas={["name", "email", "password"]}
            data={organizadores}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalOrganizador"}
          />
        )}
      </div>
      <ModalOrganizador />
    </div>
  );
}
