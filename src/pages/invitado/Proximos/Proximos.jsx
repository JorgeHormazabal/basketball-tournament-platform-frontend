import "./proximos.css";
import { encuentros } from "../Pasados/Pasados";

export function CardsProximos({ encuentros }) {
  return (
    <div className="encuentros-list">
      {Object.values(encuentros).map((encuentro, index) => (
        <div key={index} className="encuentro-card">
          <div className="equipo-info">
            <img src={encuentro.local.imagen} />
            <h3>{encuentro.local.nombre}</h3>
            <div className="vs">V/S</div>
            <h3>{encuentro.visitante.nombre}</h3>
            <img src={encuentro.visitante.imagen} />
          </div>
          <div className="fila2">
          <span>{encuentro.liga}</span>&emsp;-&emsp;
            <span>{encuentro.lugar}</span>&emsp;-&emsp;
            <span>{encuentro.fecha}</span>&emsp;-&emsp;
            <span>{encuentro.hora} hrs.</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Proximos() {
  return (
    <div className="ProximosAPP">
      <div className="titulos">
        <h1>Próximos Partidos</h1>
      </div>
      <CardsProximos encuentros={encuentros} />
    </div>
  );
}
