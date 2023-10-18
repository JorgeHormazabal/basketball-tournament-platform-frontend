import "./ligas.css";

export function Equipos(nombre, imagen, partidosJugados, partidosGanados, partidosPerdidos,puntos,  puntosFavor, puntosContra, diferencia) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.partidosJugados = partidosJugados;
  this.partidosGanados = partidosGanados;
  this.partidosPerdidos = partidosPerdidos;
  this.puntos = puntos;
  this.puntosFavor = puntosFavor;
  this.puntosContra = puntosContra;
  this.diferencia = diferencia;
}
 export function Liga(nombre, equipos) {
  this.nombre = nombre;
  this.equipos = equipos;
}
export const equipo1 = new Equipos("CD ANTÜ", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-antu-50x50-1.png", 18, 18, 0, 36, 1103, 337, 766);
export const equipo2 = new Equipos("ÁNGELES", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-angeles-150x150-1.png", 18, 7, 11, 25, 502, 752, -250);
export const equipo3 = new Equipos("BASKET TOMÉ", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-basket-tome-150x150-1.png", 9, 4, 5, 13, 284, 373, -89);
export const equipo4 = new Equipos("CD SEPROIN", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-seproin-150x150-1.png", 12,	1,	11,	13,	207,	481,	-274);
export const equipo5 = new Equipos("DE LA SALLE", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-la-salle-150x150-1.png", 9,	3,	6,	12,	200,	353,	-153);
export const liga1 = new Liga("Liga Uno - Femenina", [equipo1, equipo2, equipo3, equipo4, equipo5]);
const liga2 = new Liga("Liga Dos - Masculina", [equipo1, equipo2, equipo3, equipo4, equipo5]);

function ordenarEquiposPorPuntos(equipos) {
  return equipos.sort((a, b) => b.puntos - a.puntos);
}

liga1.equipos = ordenarEquiposPorPuntos(liga1.equipos);
liga2.equipos = ordenarEquiposPorPuntos(liga2.equipos);
const todasLasLigas = [liga1, liga2];

 export function EquiposTabla({ equipos }) {
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;POS</th>
          <th className="text-start">Equipo</th>
          <th>PJ</th>
          <th>PG</th>
          <th>PP</th>
          <th>PUNTOS</th>
          <th>PTS. FAV.</th>
          <th>PTS. CON.</th>
          <th>DIF</th>
        </tr>
      </thead>
      <tbody>
        {equipos.map((equipo, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td className="text-start"><img src={equipo.imagen}/> &nbsp; {equipo.nombre}</td>
            <td>{equipo.partidosJugados}</td>
            <td>{equipo.partidosGanados}</td>
            <td>{equipo.partidosPerdidos}</td>
            <td>{equipo.puntos}</td>
            <td>{equipo.puntosFavor}</td>
            <td>{equipo.puntosContra}</td>
            <td>{equipo.diferencia}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Ligas () {
  return (
    <div className="LigasAPP">
      <div className="titulos">
      <h1>Tablas de posiciones</h1>
      </div>
      <div className="contenedorDeLiga">
        {todasLasLigas.map((liga, index) => (
          <div key={index}>
            <h2>{liga.nombre}</h2>
            <EquiposTabla equipos={liga.equipos} />
          </div>
        ))}
      </div>
    </div>
  );
}

  