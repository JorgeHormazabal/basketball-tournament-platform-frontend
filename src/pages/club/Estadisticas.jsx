import Tabla from "components/Tabla/Tabla";
import { useJugadorStore } from "hooks";
import { useEffect } from "react";

export function Estadisticas() {
  const { jugadores, cargarJugadoresDelClub } = useJugadorStore();
  useEffect(() => {
    cargarJugadoresDelClub();
  });

  return (
    <div className="dashboard-page">
        <h1>Estadísticas de los jugadores</h1>
        <Tabla
            cabeceras={["Nombre", "Puntos", "Pases", "Asistencias"]}
            filas={["name", "rut", "displayBirthdate", "displayDivision"]}
            data={jugadores}
          />
    </div>
  )
}
