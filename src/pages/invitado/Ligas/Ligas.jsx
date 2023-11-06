import "./ligas.css";
import { useLigaStore, useEstadisticaLigaEquipoStore } from "hooks";
import { useEffect } from "react";
import { TablaPosiciones } from "components/organizador/TablaPosiciones/TablaPosiciones"

export function Ligas () {
  const { cargarTodasLasLigas, ligas, ligaActiva, setLigaActiva } = useLigaStore();
  const { estadisticasLigaEquipo, cargarEstadisticasDeLiga } = useEstadisticaLigaEquipoStore();

  useEffect(() => {
    cargarTodasLasLigas();
  });
  useEffect(() => {
    if (ligaActiva) {
      cargarEstadisticasDeLiga(ligaActiva.id);
    }
  },[ligaActiva]);
 
  return (
    <div className="LigasAPP">
      <div className="titulos">
      <h1>Tablas de posiciones</h1>
      </div>
      <div className="contenedorDeLiga">
        {ligas.map((liga, index) => (
           <div key={index}>
            <h2>{liga.name}</h2>
            <TablaPosiciones equipos={estadisticasLigaEquipo} />
          </div>
        ))}
      </div>
    </div>
  );
}

  