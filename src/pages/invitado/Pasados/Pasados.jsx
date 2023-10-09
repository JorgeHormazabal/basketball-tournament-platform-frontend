import "./pasado.css"

function Equipos(nombre, imagen) {
  this.nombre = nombre;
  this.imagen = imagen;
}
const equipo1 = new Equipos("U de Concepcion", "https://se-img.dcd-production.i.geniussports.com/a2e492021ddddce8795dd6a049f18813S1.png");
const equipo2 = new Equipos("Universidad Catolica", "https://se-img.dcd-production.i.geniussports.com/61d00770c9a99ac2421fdd79ce3a3683S1.png");
const equipo3 = new Equipos("Colegio Los Leones", "https://se-img.dcd-production.i.geniussports.com/27a7c79cf64a63ca0085c7931be4b003S1.png");
const equipo4 = new Equipos("Club Puente Alto", "https://se-img.dcd-production.i.geniussports.com/062c5a10a8cad084ee863a185ee4b6cdS1.png");
const equipo5 = new Equipos("CD Valdivia", "https://se-img.dcd-production.i.geniussports.com/2246313fd55a1f793965cfb238766b40S1.png");
const equipo6 = new Equipos("CD Ancud", "https://se-img.dcd-production.i.geniussports.com/413a902ce3c00525f482b85fe961d1c3S1.png");

function Encuentro(equipoLocal, equipoVisitante, puntosLocal, puntosVisitantes, Fecha) {
  this.equipoLocal = equipoLocal;
  this.equipoVisitante = equipoVisitante;
  this.puntosLocal = puntosLocal;
  this.puntosVisitantes = puntosVisitantes;
  this.Fecha = Fecha;
}

const partido1 = new Encuentro(equipo1, equipo2, 105, 92, "5 de Noviembre");
const partido2 = new Encuentro(equipo3, equipo4,71, 90, "10 de Noviembre");
const partido3 = new Encuentro(equipo5, equipo6, 68, 58, "15 de Noviembre");

const partidos = [partido1, partido2, partido3];

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



export function Pasados() {
  return (
    <div className="PartidosPasadosAPP">
      <div className="titulos">
        <h1>Partidos Pasados</h1>
      </div>
      <div className="lista-partidos">
        {partidos.map((partido, index) => (
          <TarjetaPartido key={index} partido={partido} />
        ))}
      </div>
    </div>
  );
}
