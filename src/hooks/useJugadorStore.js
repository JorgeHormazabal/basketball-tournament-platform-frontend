import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/jugador/jugadorSlice";
import formatDate from "helpers/formatDate";

export const useJugadorStore = () => {
  const dispatch = useDispatch();
  const { events: jugadores, activeEvent: jugadorActivo } = useSelector(
    (state) => state.jugador
  );
  const { user } = useSelector((state) => state.auth);

  const setJugadorActivo = (jugador) => {
    dispatch(onSetActiveEvent(jugador));
  };

  const guardarJugador = async (jugador) => {
    try {
      if (jugador.id.length !== 0) {
        const { id, teamId } = jugador;
        const { data } = await backendApi.patch(`/players/${id}`, {
          teamId: Number(teamId),
        });
        dispatch(
          onUpdateEvent({
            ...jugador,
            displayDivision: data.team.division.category,
            user,
          })
        );
      } else {
        const { id, ...jugadorResto } = jugador;
        const { data } = await backendApi.post("/players", {
          ...jugadorResto,
          teamId: Number(jugadorResto.teamId),
        });
        dispatch(
          onAddNewEvent({
            ...data,
            displayDivision: data.team.division.category,
            displayBirthdate: formatDate(data.birthdate),
          })
        );
      }

      Swal.fire({
        icon: "success",
        title: "Jugadora guardada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const borrarJugador = async (jugador) => {
    try {
      await backendApi.delete(`/players/${jugador.id}`);
      await dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const cargarJugadores = async () => {
    try {
      const { data } = await backendApi.get("/players");
      data.forEach((player) => {
        player.displayTeam = player.team.club.name;
        player.displayDivision = player.team.division.category;
        player.displayBirthdate = formatDate(player.birthdate);
      });
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando jugadoras");
      console.log(error);
    }
  };

  const cargarJugadoresDelClub = async () => {
    try {
      const { data } = await backendApi.get("/teams/owned");
      const players = data
        .map((team) => {
          team.players.forEach((player) => {
            player.displayDivision = team.division.category;
            player.team = { id: team.id };
            player.displayBirthdate = formatDate(player.birthdate);
          });
          return team.players;
        })
        .flat();
      dispatch(onLoadEvents(players));
    } catch (error) {
      console.log("Error cargando jugadores");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    jugadorActivo,
    jugadores,
    hayJugadorActivo: !!jugadorActivo,

    //* Métodos
    setJugadorActivo,
    borrarJugador,
    cargarJugadores,
    guardarJugador,
    cargarJugadoresDelClub,
  };
};
