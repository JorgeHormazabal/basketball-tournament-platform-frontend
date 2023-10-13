import { useState } from 'react';
import "./clubes.css"

function Equipos(nombre, imagen, jugadoras) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.jugadoras = jugadoras;
}
function Jugadora(nombre, imagen, nacimiento) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.nacimiento = nacimiento;
}
const jugadora1 = new Jugadora("Lisa Leslie", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw3FeSVLuPviFF5zUsKU9H36-NTp2X4hVdwUZAEdkANiHU3pfp", "1972-07-07");
const jugadora2 = new Jugadora("Sue Bird", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vLfjc-tp5ShJ7fL11aXvjrQNM-yWGUbbDh0xm-XuDvSbcFfF", "1980-10-16");
const jugadora3 = new Jugadora("Maya Moore", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw3FeSVLuPviFF5zUsKU9H36-NTp2X4hVdwUZAEdkANiHU3pfp", "1989-06-11");
const jugadora4 = new Jugadora("Diana Taurasi", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vLfjc-tp5ShJ7fL11aXvjrQNM-yWGUbbDh0xm-XuDvSbcFfF", "1989-06-11");
const jugadora5 = new Jugadora("Tamika Catchings", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw3FeSVLuPviFF5zUsKU9H36-NTp2X4hVdwUZAEdkANiHU3pfp", "1979-07-21");
const jugadora6 = new Jugadora("Candace Parker", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vLfjc-tp5ShJ7fL11aXvjrQNM-yWGUbbDh0xm-XuDvSbcFfF", "1986-04-19");
const jugadora7 = new Jugadora("Breanna Stewart", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw3FeSVLuPviFF5zUsKU9H36-NTp2X4hVdwUZAEdkANiHU3pfp", "1994-08-27");
const jugadora8 = new Jugadora("Brittney Griner", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vLfjc-tp5ShJ7fL11aXvjrQNM-yWGUbbDh0xm-XuDvSbcFfF", "1990-10-18");
const jugadora9 = new Jugadora("A'ja Wilson", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw3FeSVLuPviFF5zUsKU9H36-NTp2X4hVdwUZAEdkANiHU3pfp", "1996-08-08");
const jugadora10 = new Jugadora("Sabrina Ionescu", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vLfjc-tp5ShJ7fL11aXvjrQNM-yWGUbbDh0xm-XuDvSbcFfF", "1997-12-06");
const jugadoras1 = {jugadora1,jugadora2,jugadora3,jugadora4,jugadora5};
const jugadoras2 = {jugadora6,jugadora7,jugadora8,jugadora9,jugadora10};
const equipo1 = new Equipos("U de Concepcion", "https://se-img.dcd-production.i.geniussports.com/a2e492021ddddce8795dd6a049f18813S1.png", jugadoras1);
const equipo2 = new Equipos("Universidad Catolica", "https://se-img.dcd-production.i.geniussports.com/61d00770c9a99ac2421fdd79ce3a3683S1.png", jugadoras2);
const equipo3 = new Equipos("Colegio Los Leones", "https://se-img.dcd-production.i.geniussports.com/27a7c79cf64a63ca0085c7931be4b003S1.png", jugadoras1);
const equipo4 = new Equipos("Club Puente Alto", "https://se-img.dcd-production.i.geniussports.com/062c5a10a8cad084ee863a185ee4b6cdS1.png", jugadoras2);
const equipo5 = new Equipos("CD Valdivia", "https://se-img.dcd-production.i.geniussports.com/2246313fd55a1f793965cfb238766b40S1.png", jugadoras1);
const equipo6 = new Equipos("CD Ancud", "https://se-img.dcd-production.i.geniussports.com/413a902ce3c00525f482b85fe961d1c3S1.png", jugadoras2);
const equipo7 = new Equipos("CD Las Animas", "https://se-img.dcd-production.i.geniussports.com/c61b19feaac0d18fa2864ef5faf3559cS1.png", jugadoras2);
const equipo8 = new Equipos("CD Español Osorno", "https://se-img.dcd-production.i.geniussports.com/d7cc48c551beda1f912031734d31ef5dS1.png", jugadoras2);
const equipos = {
  equipo1, equipo2, equipo3, equipo4, equipo5, equipo6, equipo7, equipo8
};

export function Clubes() {
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  const mostrarJugadoras = (equipo) => {
    setEquipoSeleccionado(equipo);
  };
  return (
    <div className="ClubesAPP">
       <div className="titulos">
      <h1>Clubes y Jugadoras</h1>
      </div>
      <div className="equipo-list">
        {Object.values(equipos).map((equipo) => (
          <div key={equipo.nombre} className="equipo-card" onClick={() => mostrarJugadoras(equipo)}>
            <img src={equipo.imagen} alt={equipo.nombre} />
            <h2>{equipo.nombre}</h2>
          </div>
        ))}
      </div>

      {equipoSeleccionado && (
        <div className="jugadorasMostrar">
          <div className="subtitulo">
            <h2>{equipoSeleccionado.nombre}</h2>
          </div>
        <div className="jugadoras-list">
          {Object.values(equipoSeleccionado.jugadoras).map((jugadora) => (
            <div key={jugadora.nombre} className="jugadora-card">
              <img src={jugadora.imagen} alt={jugadora.nombre} />
              <h3>{jugadora.nombre}</h3>
              <p>{jugadora.nacimiento}</p>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
    
  );
}

  