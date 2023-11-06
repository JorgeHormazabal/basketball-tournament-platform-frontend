import { useEffect, useState } from 'react';
import { useClubStore, useJugadorStore } from "hooks";
import { imagePath } from 'helpers';
import "./clubes.css"

export function Clubes() {
  const { clubes, cargarClubes, activeClub, setClubActivo } = useClubStore();
  const { jugadores, cargarJugadoresDeUnClub } = useJugadorStore();
  const [jugadoress, setJugadores] = useState([]);

  useEffect(() => {
    cargarClubes();
    if (activeClub) {
      cargarJugadoresDeUnClub(activeClub);
    }
  },[activeClub]);

  useEffect(() => {
    setJugadores([])
    setJugadores(jugadores)
  });
  
  const mostrarJugadoras = (club) => {
    setClubActivo(club);
  };
  return (
    <div className="ClubesAPP">
       <div className="titulos">
      <h1>Clubes y Jugadoras</h1>
      </div>
      <div className="equipo-list">
        {Object.values(clubes).map((club) => (
          <div key={club.id} className="equipo-card" onClick={() => mostrarJugadoras(club)}>
            <img src={imagePath(club.image)}/>
            <h2>{club.name}</h2>
          </div>
        ))}
      </div>

      {activeClub && (
        <div className="jugadorasMostrar">
          <div className="subtitulo">
            <h2>{activeClub.name}</h2>
          </div>
          {
        <div className="jugadoras-list">
          {jugadoress.map((jugador) => (
            <div key={jugador.id} className="jugadora-card">
              <img src={"https://cdn0.iconfinder.com/data/icons/female-sport/128/basketball-athlete-women-player-sport-512.png"}/>
              <h3>{jugador.name}</h3>
              <p>{jugador.displayBirthdate} <br />{jugador.position}</p>
            </div>
          ))}
        </div>
        }
        </div>
          )}
    </div>
    
  );
}

  