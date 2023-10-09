import "./ligas.css";

function Equipos(nombre, imagen, puntos, partidosJugados, partidosGanados, partidosEmpatados, partidosPerdidos) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.puntos = puntos;
  this.partidosJugados = partidosJugados;
  this.partidosGanados = partidosGanados;
  this.partidosEmpatados = partidosEmpatados;
  this.partidosPerdidos = partidosPerdidos;
}

function Liga(nombre, equipos) {
  this.nombre = nombre;
  this.equipos = equipos;
}

const equipo1 = new Equipos("U de Concepcion", "https://se-img.dcd-production.i.geniussports.com/a2e492021ddddce8795dd6a049f18813S1.png", 10, 5, 3, 1, 1);
const equipo2 = new Equipos("Universidad Catolica", "https://se-img.dcd-production.i.geniussports.com/61d00770c9a99ac2421fdd79ce3a3683S1.png", 8, 5, 2, 2, 1);
const equipo3 = new Equipos("Colegio Los Leones", "https://se-img.dcd-production.i.geniussports.com/27a7c79cf64a63ca0085c7931be4b003S1.png", 6, 5, 1, 3, 1);
const equipo4 = new Equipos("Club Puente Alto", "https://se-img.dcd-production.i.geniussports.com/062c5a10a8cad084ee863a185ee4b6cdS1.png", 12, 6, 4, 2, 0);
const equipo5 = new Equipos("CD Valdivia", "https://se-img.dcd-production.i.geniussports.com/2246313fd55a1f793965cfb238766b40S1.png", 7, 6, 2, 1, 3);
const equipo6 = new Equipos("CD Ancud", "https://se-img.dcd-production.i.geniussports.com/413a902ce3c00525f482b85fe961d1c3S1.png", 9, 6, 3, 0, 3);
const equipo7 = new Equipos("CD Las Animas", "https://se-img.dcd-production.i.geniussports.com/c61b19feaac0d18fa2864ef5faf3559cS1.png", 11, 6, 3, 2, 1);
const equipo8 = new Equipos("CD Español Osorno", "https://se-img.dcd-production.i.geniussports.com/d7cc48c551beda1f912031734d31ef5dS1.png", 5, 6, 1, 2, 3);

const liga1 = new Liga("Liga Uno", [equipo1, equipo2, equipo3, equipo4]);
const liga2 = new Liga("Liga Dos", [equipo5, equipo6, equipo7, equipo8]);

function ordenarEquiposPorPuntos(equipos) {
  return equipos.sort((a, b) => b.puntos - a.puntos);
}

liga1.equipos = ordenarEquiposPorPuntos(liga1.equipos);
liga2.equipos = ordenarEquiposPorPuntos(liga2.equipos);

const todasLasLigas = [liga1, liga2];

function EquiposTabla({ equipos }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Puntos</th>
          <th>Partidos Jugados</th>
          <th>Partidos Ganados</th>
          <th>Partidos Empatados</th>
          <th>Partidos Perdidos</th>
        </tr>
      </thead>
      <tbody>
        {equipos.map((equipo, index) => (
          <tr key={index}>
            <td><img src={equipo.imagen}/></td>
            <td>{equipo.nombre}</td>
            <td>{equipo.puntos}</td>
            <td>{equipo.partidosJugados}</td>
            <td>{equipo.partidosGanados}</td>
            <td>{equipo.partidosEmpatados}</td>
            <td>{equipo.partidosPerdidos}</td>
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

  