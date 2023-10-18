import { useState } from 'react';
import "./clubes.css"

function Equipos(nombre, imagen, jugadoras) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.jugadoras = jugadoras;
}
function Jugadora(nombre, imagen, nacimiento, posicion) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.nacimiento = nacimiento;
  this.posicion = posicion;
}
const imagen = "https://cdn0.iconfinder.com/data/icons/female-sport/128/basketball-athlete-women-player-sport-512.png"
const jugadora1 = new Jugadora("Sofía Carolina Ramírez Arroyo", imagen, "08-21-2009", "Base");
const jugadora2 = new Jugadora("Maritza Melanye Sánchez Valenzuela", imagen, "05-15-2009", "Escolta");
const jugadora3 = new Jugadora("Krishna Abigail Delgado Andrade", imagen, "08-14-2009", "Alero");
const jugadora4 = new Jugadora("Maite Agustina Fuentes Villablanca ", imagen, "02-21-2009", "Pivot");
const jugadora5 = new Jugadora("Elisabeth Sarai Cordero Jiménez", imagen, "01-27-2009", "Ala-Pivot");
const jugadora6 = new Jugadora("Gabriela Litty Figueroa Ortiz", imagen, "04-11-2008", "Escolta");
const jugadora7 = new Jugadora("Valentina Paola Figueroa Ortiz ", imagen, "04-11-2008", "Alero");
const jugadora8 = new Jugadora("Emilia Aurora Bustos Baeza", imagen, "08-05-2008", "Pivot");
const jugadora9 = new Jugadora("Emilia Antonia Osses Montecino", imagen, "20-07-2008", "Ala-Pivot");
const jugadora10 = new Jugadora("Romina Alexandra Córdova	Zarricueta", imagen, "08-01-2009", "Base");
const jugadoras1 = {jugadora1,jugadora2,jugadora3,jugadora4,jugadora5};
const jugadoras2 = {jugadora6,jugadora7,jugadora8,jugadora9,jugadora10};
const equipo1 = new Equipos("CD ANTÜ", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-antu-50x50-1.png", jugadoras1);
const equipo2 = new Equipos("ÁNGELES", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-angeles-150x150-1.png", jugadoras2);
const equipo3 = new Equipos("BASKET TOMÉ", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-basket-tome-150x150-1.png",jugadoras1);
const equipo4 = new Equipos("CD SEPROIN", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-seproin-150x150-1.png", jugadoras2);
const equipo5 = new Equipos("DE LA SALLE", "https://deportivoantu.cl/wp-content/uploads/2023/05/logo-la-salle-150x150-1.png",jugadoras1);
const equipos = {equipo1, equipo2, equipo3, equipo4, equipo5};

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
            <img src={equipo.imagen}/>
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
              <p>{jugadora.nacimiento} <br />{jugadora.posicion}</p>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
    
  );
}

  