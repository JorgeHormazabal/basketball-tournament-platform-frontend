import "./proximos.css"

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

function Encuentro(equipoLocal, equipoVisitante, fecha, lugar) {
  this.equipoLocal = equipoLocal;
  this.equipoVisitante = equipoVisitante;
  this.fecha = fecha;
  this.lugar = lugar;
}

const encuentro1 = new Encuentro(equipo1, equipo5, "5 de Noviembre", "Casa del deporte");
const encuentro2 = new Encuentro(equipo3, equipo4, "10 de Noviembre", "Universidad De Concepcion");
const encuentro3 = new Encuentro(equipo2, equipo6, "15 de Noviembre", "Colegio Padre Hurtado");

const encuentros = [encuentro1, encuentro2, encuentro3];


export function Proximos(){
  return (
    <div className="ProximosAPP">
      <div className="titulos">
        <h1>Próximos Partidos</h1>
      </div>
      <div className="encuentros-list">
        {Object.values(encuentros).map((encuentro, index) => (
          <div key={index} className="encuentro-card">
            <div className="equipo-info">
              <img src={encuentro.equipoLocal.imagen}/>
              <h3>{encuentro.equipoLocal.nombre}</h3>
              <div className="vs">VS</div>
              <h3>{encuentro.equipoVisitante.nombre}</h3>
              <img src={encuentro.equipoVisitante.imagen}/>
            </div>
            <div className="fila2">
              <span>Fecha: {encuentro.fecha}</span>&emsp;&emsp;
              <span>Lugar: {encuentro.lugar}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
