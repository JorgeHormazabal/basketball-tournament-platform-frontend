import "./proximos.css";
import { usePartidoStore } from "hooks";
import { useEffect } from "react";

export function CardsProximos({ encuentros, limit }) {
  const encuentrosFuturos = encuentros.filter(encuentro => {
    const encuentroFecha = new Date(encuentro.dateTime).getTime();
    const fechaActual = new Date().getTime();
    return encuentroFecha > fechaActual;
  });
  const encuentrosOrdenados = encuentrosFuturos.sort((a, b) => {
    const fechaA = new Date(a.dateTime).getTime();
    const fechaB = new Date(b.dateTime).getTime();
    return fechaA - fechaB;
  });

   const primerosEncuentros = limit ? encuentrosOrdenados.slice(0, limit) : encuentrosOrdenados;

  return (
    <div className="encuentros-list">
      {primerosEncuentros.map((encuentro, index) => (
        <div key={index} className="encuentro-card">
          <div className="equipo-info">
            {"img"}
            <h3>{"nombre"}</h3>
            <div className="vs">V/S</div>
            <h3>{"nombre"}</h3>
            {"img"}
          </div>
          <div className="fila2">
          <span>{"liga"}</span>&emsp;-&emsp;
            <span>{encuentro.place}</span>&emsp;-&emsp;
            <span>{encuentro.dateTime}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Proximos() {
  const { partidos, cargarPartidos } = usePartidoStore();

  useEffect(() => {
    cargarPartidos();
  });

  return (
    <div className="ProximosAPP">
      <div className="titulos">
        <h1>Próximos Partidos</h1>
      </div>
      <CardsProximos encuentros={partidos} />
    </div>
  );
}
