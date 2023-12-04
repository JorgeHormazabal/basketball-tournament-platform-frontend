import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
  onLogoutEvent,
} from "store/jugador/jugadorSlice";
import formatDate from "helpers/formatDate";

export const useJugadorStore = () => {
  const dispatch = useDispatch();
  const {
    events: jugadores,
    activeEvent: jugadorActivo,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.jugador);
  const { user } = useSelector((state) => state.auth);

  const setJugadorActivo = (jugador) => {
    dispatch(onSetActiveEvent(jugador));
  };

  const guardarJugador = async (jugador) => {
    try {
      const id = jugador.get("id");
      jugador.delete("id");
      jugador.delete("playersStatistics");
      if (id && id?.length !== 0) {
        const { data } = await backendApi.patch(`/players/${id}`, jugador);
        dispatch(
          onUpdateEvent({
            ...jugadorActivo,
            ...data,
            displayTeam: data.team.club.name,
            displayDivision: data.team.division.category,
            displayBirthdate: formatDate(data.birthdate),
          })
        );
      } else {
        const { data } = await backendApi.post("/players", jugador);
        dispatch(
          onAddNewEvent({
            ...data,
            displayTeam: data.team.club.name,
            displayDivision: data.team.division.category,
            displayBirthdate: formatDate(data.birthdate),
            playersStatistics: [],
          })
        );
      }

      Swal.fire({
        icon: "success",
        title: "Jugador guardada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error?.response?.data?.message);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const borrarJugador = async (jugador) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await backendApi.delete(`/players/${jugador.id}`);
        await dispatch(onDeleteEvent());

        Swal.fire({
          icon: "success",
          title: "Jugador borrado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
      console.log("Error cargando jugadores");
      console.log(error);
    }
  };

  const cargarJugadoresDeUnClub = async (clubActivo) => {
    try {
      const { data } = await backendApi.get(`/clubs/players/${clubActivo.id}`);
      data.forEach((player) => {
        player.displayBirthdate = formatDate(player.birthdate);
      });
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando jugadores");
      console.log(error);
    }
  };

  const limpiarJugador = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error limpiando jugadores");
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

  const cargarJugadoresDelEquipoEstadisticas = async (id) => {
    try {
      const { data } = await backendApi.get(`/players/team/${id}`);
      const initializedPlayers = data.map((player) => ({
        id: player.id,
        name: player.name,
        shirtNumber: player.shirtNumber,
        turnovers: 0,
        offensiveRebounds: 0,
        defensiveRebounds: 0,
        assists: 0,
        losses: 0,
      }));
      dispatch(onLoadEvents(initializedPlayers));
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
    isLoading,

    //* Métodos
    setJugadorActivo,
    borrarJugador,
    cargarJugadores,
    guardarJugador,
    cargarJugadoresDelClub,
    cargarJugadoresDeUnClub,
    limpiarJugador,
    cargarJugadoresDelEquipoEstadisticas,
  };
};
