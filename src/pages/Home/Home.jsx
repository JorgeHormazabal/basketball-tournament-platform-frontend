import "./home.css"
import { Link } from "react-router-dom";

function Equipos(nombre, imagen, puntos, partidosJugados, partidosGanados, partidosEmpatados, partidosPerdidos) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.puntos = puntos;
  this.partidosJugados = partidosJugados;
  this.partidosGanados = partidosGanados;
  this.partidosEmpatados = partidosEmpatados;
  this.partidosPerdidos = partidosPerdidos;
}
const equipo1 = new Equipos("U de Concepcion", "https://se-img.dcd-production.i.geniussports.com/a2e492021ddddce8795dd6a049f18813S1.png", 10, 5, 3, 1, 1);
const equipo2 = new Equipos("Universidad Catolica", "https://se-img.dcd-production.i.geniussports.com/61d00770c9a99ac2421fdd79ce3a3683S1.png", 8, 5, 2, 2, 1);
const equipo3 = new Equipos("Colegio Los Leones", "https://se-img.dcd-production.i.geniussports.com/27a7c79cf64a63ca0085c7931be4b003S1.png", 6, 5, 1, 3, 1);
const equipo4 = new Equipos("Club Puente Alto", "https://se-img.dcd-production.i.geniussports.com/062c5a10a8cad084ee863a185ee4b6cdS1.png", 12, 6, 4, 2, 0);
const equipo5 = new Equipos("CD Valdivia", "https://se-img.dcd-production.i.geniussports.com/2246313fd55a1f793965cfb238766b40S1.png", 7, 6, 2, 1, 3);
function Liga(nombre, equipos) {
  this.nombre = nombre;
  this.equipos = equipos;
}
const liga1 = new Liga("Liga Uno", [equipo1, equipo2, equipo3, equipo4]);
function EncuentroProximo(equipoLocal, equipoVisitante, fecha, lugar) {
  this.equipoLocal = equipoLocal;
  this.equipoVisitante = equipoVisitante;
  this.fecha = fecha;
  this.lugar = lugar;
}
function EncuentroPasado(equipoLocal, equipoVisitante, puntosLocal, puntosVisitantes, Fecha) {
  this.equipoLocal = equipoLocal;
  this.equipoVisitante = equipoVisitante;
  this.puntosLocal = puntosLocal;
  this.puntosVisitantes = puntosVisitantes;
  this.Fecha = Fecha;
}
const encuentro1 = new EncuentroProximo(equipo1, equipo5, "5 de Noviembre", "Casa del deporte");
const partido1 = new EncuentroPasado(equipo1, equipo2, 105, 92, "5 de Noviembre");

function TarjetaPartido({ partido }) {
  const puntosLocalMayor = partido.puntosLocal > partido.puntosVisitantes;
  const puntosVisitantesMayor = partido.puntosVisitantes > partido.puntosLocal;

  return (
    <div className="tarjeta-partido">
      <div className="equipo-local">
        <img src={partido.equipoLocal.imagen} alt={partido.equipoLocal.nombre} />
        <p className={puntosLocalMayor ? 'puntos-verde' : 'puntos-rojo'}>
          {partido.equipoLocal.nombre} - {partido.puntosLocal} puntos
        </p>
      </div>
      <div className="versus">
        <span>{partido.Fecha}</span>
        <p className="vs">VS</p>
      </div>
      <div className="equipo-visitante">
        <img src={partido.equipoVisitante.imagen} alt={partido.equipoVisitante.nombre} />
        <p className={puntosVisitantesMayor ? 'puntos-verde' : 'puntos-rojo'}>
          {partido.equipoVisitante.nombre} - {partido.puntosVisitantes} puntos
        </p>
      </div>
    </div>
  );
}
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

export function Home(){
  return (
    <>
     <div className="Home">
      <div className="tituloHome">
        <h1 id="Primero">¡Bienvenido a Tromü!</h1>
        <h1 id="Segundo">Ligas de Baloncesto Femenino</h1>
      </div>
    
      <div className="ProximoYPasado"> 
      
      <div className="Pasado">
      <h2>Ultimo Enfrentamiento</h2>
      <div className="lista-partidos">
        <div className="Pasado">
          <TarjetaPartido partido={partido1} />
        </div>
      </div>
      </div>
      
      <div className="Proximo">
      <h2>Proximo Enfrentamiento</h2>
      <div className="encuentros-list">
        <div key={0} className="encuentro-card">
          <div className="equipo-info">
            <img src={encuentro1.equipoLocal.imagen}/>
            <h3>{encuentro1.equipoLocal.nombre}</h3>
            <div className="vs">VS</div>
            <h3>{encuentro1.equipoVisitante.nombre}</h3>
            <img src={encuentro1.equipoVisitante.imagen}/>
          </div>
          <div className="fila2">
            <span>Fecha: {encuentro1.fecha}</span>&emsp;&emsp;
            <span>Lugar: {encuentro1.lugar}</span>
          </div>
        </div>
      </div>
      </div>
      </div>

      <div className="Ligass">
      <h2 id="actualizacionligauno">¡Última Actualizacion de la Liga Uno!</h2>
      <div className="LigasAPP">
      <div className="contenedorDeLiga">
        <EquiposTabla equipos={liga1.equipos} />
      </div>
      <div className="botonesConoce">
      <Link to="/ligas"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Todas las Ligas</button></Link>
      <Link to="/clubes"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Todos los Clubes</button></Link>
      </div>
    </div>
      </div>
    </div>
    </>
  )
}
