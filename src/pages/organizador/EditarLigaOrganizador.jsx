import { useLigaStore, usePartidoStore } from "hooks";
import "../Dashboard.scss";
import { useEffect } from "react";

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
          <h3>Partidos</h3>
          {partidos.length > 0 ? (
            partidos.map((partido) => <h1 key={partido.id}>{partido.id}</h1>)
          ) : (
            <span>Cargando</span>
          )}
        </div>
      </div>
    </div>
  );
}
