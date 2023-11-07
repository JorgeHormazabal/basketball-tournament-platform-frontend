import { useEffect, useState } from "react";
import { useClubStore, useJugadorStore } from "hooks";
import { imagePath } from "helpers";
import "./clubes.css";

export function Clubes() {
  const { clubes, cargarClubes, activeClub, setClubActivo } = useClubStore();
  const { jugadores, cargarJugadoresDeUnClub, limpiarJugadoresDeUnClub } =
    useJugadorStore();

  useEffect(() => {
    cargarClubes();
  }, []);

  useEffect(() => {
    if (activeClub) {
      limpiarJugadoresDeUnClub(activeClub);
      cargarJugadoresDeUnClub(activeClub);
    }
  }, [activeClub]);

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
          <div
            key={club.id}
            className="equipo-card"
            onClick={() => mostrarJugadoras(club)}
          >
            <img
              src={club.image ? imagePath(club.image) : "/img/default_club.png"}
            />
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
              {jugadores.map((jugador) => (
                <div key={jugador.id} className="jugadora-card">
                  <img
                    src={
                      jugador.image
                        ? imagePath(jugador.image)
                        : "/img/default_player.png"
                    }
                  />
                  <h3>{jugador.name}</h3>
                  <p>
                    {jugador.displayBirthdate} <br />
                    {jugador.position}
                  </p>
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}
