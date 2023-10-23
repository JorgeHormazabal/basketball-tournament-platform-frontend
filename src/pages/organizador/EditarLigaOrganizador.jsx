import { useLigaStore, usePartidoStore } from "hooks";
import "../Dashboard.scss";
import { useEffect } from "react";
import TablaPartidosOrganizador from "components/organizador/TablaPartidosOrganizador/TablaPartidosOrganizador";
import { BotonAgregar, Spinner } from "components";
import { ModalPartido } from "components/organizador/ModalPartido/ModalPartido";

export default function EditarLigaOrganizador() {
  const { ligaActiva } = useLigaStore();
  const { partidos, cargarPartidosDeLaLiga, setPartidoActivo, borrarPartido } =
    usePartidoStore();

  const borrar = (jugador) => {
    setPartidoActivo(jugador);
    borrarPartido(jugador);
  };

  const editarModal = (jugador) => {
    setPartidoActivo(jugador);
  };
  const abrirModal = () => {
    setPartidoActivo(null);
  };

  useEffect(() => {
    cargarPartidosDeLaLiga(ligaActiva.id);
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <h1>{ligaActiva.name}</h1>
        <div className="ps-4 pt-4">
          <h3>Información</h3>
        </div>
        <div className="ps-4 pt-4">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h3 className="m-0">Partidos</h3>
            <BotonAgregar modalId="modalPartido" abrir={abrirModal} boton=" Crear Partido" />
          </div>
          {partidos.length > 0 ? (
            <TablaPartidosOrganizador
              partidos={partidos}
              editar={editarModal}
              borrar={borrar}
              modalId="modalPartido"
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <ModalPartido />
    </div>
  );
}
