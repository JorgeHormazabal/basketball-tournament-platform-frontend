import "./ligas.css";
import { useLigaStore, useEstadisticaLigaEquipoStore } from "hooks";
import { useEffect } from "react";
import { TablaPosiciones } from "components/organizador/TablaPosiciones/TablaPosiciones"

export function Ligas() {
  const { cargarTodasLasLigas, ligas } = useLigaStore();
  const { estadisticasLigaEquipo, cargarTodasLasEstadisticasDeLiga, limpiarEstadisticasDeLiga } = useEstadisticaLigaEquipoStore();

  useEffect(() => {
    cargarTodasLasLigas();
  }, []);

  useEffect(() => {
    if (ligas.length > 0) {
      cargarTodasLasEstadisticasDeLiga(ligas);
    }
  }, [ligas, cargarTodasLasEstadisticasDeLiga, limpiarEstadisticasDeLiga]);

  const filtrarEstadisticasPorLiga = (ligaId) => {
    return estadisticasLigaEquipo.filter(equipo => equipo.ligaId === ligaId);
  };

  return (
    <div className="LigasAPP">
      <div className="titulos">
        <h1>Tablas de posiciones</h1>
      </div>
      <div className="contenedorDeLiga">
        {ligas.map((liga, index) => (
          <div key={index}>
            <h2>{liga.name}</h2>
            <TablaPosiciones equipos={filtrarEstadisticasPorLiga(liga.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
