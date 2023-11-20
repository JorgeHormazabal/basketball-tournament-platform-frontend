import { useJugadorStore } from "hooks";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "../Dashboard.scss";
import { useEstadisticaJugadorStore } from "hooks/useEstadisticaJugadores";

const EstadisticaPartido = () => {
  const { equipoId, partidoId } = useParams();
  const [players, setPlayers] = useState([]);
  const {
    jugadores,
    cargarJugadoresDelEquipoEstadisticas,
    limpiarJugador,
    isLoading,
  } = useJugadorStore();
  const { guardarEstadisticasJugadores } = useEstadisticaJugadorStore();
  const navigate = useNavigate();
  const onNavigate = () => {
    limpiarJugador();
    navigate(-1);
  };

  useEffect(() => {
    cargarJugadoresDelEquipoEstadisticas(equipoId);
  }, []);

  useEffect(() => {
    setPlayers(jugadores);
  }, [jugadores]);

  const handleStatChange = (index, stat, delta) => {
    setPlayers((previous) => {
      const newPlayers = previous.map((player, idx) => {
        if (idx === index) {
          return { ...player, [stat]: Math.max(player[stat] + delta, 0) };
        }
        return player;
      });
      return newPlayers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    guardarEstadisticasJugadores(players, partidoId);
  };

  return (
    <div className="dashboard-page">
      <button
        type="button"
        className="btn btn-light"
        style={{ marginTop: "10px", marginLeft: "26vh", fontSize: "22px" }}
        onClick={onNavigate}
      >
        <i className="fa-solid fa-arrow-left"></i> Volver
      </button>
      {players.length > 0 && (
        <form onSubmit={handleSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th>Camiseta</th>
                <th>Nombre</th>
                <th>Recuperaciones</th>
                <th>Rebotes ofensivos</th>
                <th>Rebotes defensivos</th>
                <th>Asistencias</th>
                <th>Perdidas</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id}>
                  <td>{player.shirtNumber}</td>
                  <td>{player.name}</td>
                  {[
                    "turnovers",
                    "offensiveRebounds",
                    "defensiveRebounds",
                    "assists",
                    "losses",
                  ].map((stat) => (
                    <td key={stat}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleStatChange(index, stat, -1)}
                      >
                        -
                      </button>
                      {" " + players[index][stat] + " "}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleStatChange(index, stat, 1)}
                      >
                        +
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="btn btn-success">
            Guardar estadisticas
          </button>
        </form>
      )}
    </div>
  );
};

export default EstadisticaPartido;
