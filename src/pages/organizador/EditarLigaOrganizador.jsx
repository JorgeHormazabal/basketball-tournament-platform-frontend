import { useLigaStore, usePartidoStore } from "hooks";
import "../Dashboard.scss";
import { useEffect } from "react";
import TablaPartidosOrganizador from "components/organizador/TablaPartidosOrganizador/TablaPartidosOrganizador";
import { BotonAgregar } from "components";
import { ModalPartido } from "components/organizador/ModalPartido/ModalPartido";

export default function EditarLigaOrganizador() {
  const { ligaActiva } = useLigaStore();
  const { partidos, cargarPartidosDeLaLiga } = usePartidoStore();
  useEffect(() => {
    cargarPartidosDeLaLiga(ligaActiva.id);
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <h1>{ligaActiva.name}</h1>
        <div className="ps-4 pt-4">
          <h3>Informacion</h3>
        </div>
        <div className="ps-4 pt-4">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h3 className="m-0">Partidos</h3>
            <BotonAgregar modalId="modalPartido" />
          </div>
          {partidos.length > 0 ? (
            <TablaPartidosOrganizador partidos={partidos} />
          ) : (
            <span>Cargando</span>
          )}
        </div>
      </div>
      <ModalPartido />
    </div>
  );
}
