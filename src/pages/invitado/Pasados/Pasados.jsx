import "./pasado.css"
import { usePartidoStore } from "hooks";
import { useEffect } from "react";

export function TablaPasados({ encuentros, limit }) {
  const encuentrosPasados = encuentros.filter(encuentro => {
    const encuentroFecha = new Date(encuentro.dateTime).getTime();
    const fechaActual = new Date().getTime();
    return encuentroFecha < fechaActual;
  });
  const encuentrosOrdenados = encuentrosPasados.sort((a, b) => {
    const fechaA = new Date(a.dateTime).getTime();
    const fechaB = new Date(b.dateTime).getTime();
    return fechaB - fechaA;
  });

  const ultimosEncuentros = limit ? encuentrosOrdenados.slice(0, limit) : encuentrosOrdenados;

  return (
    <table>
      <thead>
        <tr>
          <th >&nbsp;Liga</th>
          <th className="text-start">Local</th>
          <th className="text-center">Resultado</th>
          <th className="text-end">Visita</th>
          <th>Lugar</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {ultimosEncuentros.map((encuentro) => (
          <tr key={encuentros.id}>
            <td className="text-start">{"LIGA"}</td>
            <td className="text-start">{"img"} &nbsp; {"nombre"}</td>
            <td className="text-center">{encuentro.homePoints} - {encuentro.awayPoints}</td>
            <td className="text-end">{"img"} &nbsp; {"nombre"}</td>
            <td className="text-start">{encuentro.place}</td>
            <td className="text-start">{encuentro.dateTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Pasados() {

  const { partidos, cargarPartidos } = usePartidoStore();

  useEffect(() => {
    cargarPartidos();
  });
  
  return (
    <div className="PartidosPasadosAPP">
      <div className="titulos">
        <h1>Partidos Pasados</h1>
      </div>
      <div className="contenedorDeLiga">
      <TablaPasados encuentros={partidos} />
      </div>
    </div>
  );
}
