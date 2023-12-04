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
} from "store/estadisticaJugador/estadisticaJugadorSlice";

export const useEstadisticaJugadorStore = () => {
  const dispatch = useDispatch();
  const {
    events: estadisticasJugadores,
    activeEvent: estadisticasJugadorActivo,
  } = useSelector((state) => state.estadisticaJugador);
  const { user } = useSelector((state) => state.auth);

  const setEstadisticaLigaEquipoActiva = async (estadistica) => {
    await dispatch(onSetActiveEvent(estadistica));
  };

  const guardarEstadisticasJugadores = async (jugadores, matchId) => {
    try {
      const updatePromises = jugadores.map((jugador) => {
        const { id, shirtNumber, name, ...restoEstadistica } = jugador;
        return backendApi.patch(
          `player-statistics/player/${id}/match/${matchId}`,
          restoEstadistica
        );
      });

      await Promise.all(updatePromises);

      Swal.fire({
        icon: "success",
        title: "Estadísticas guardadas",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error?.response?.data?.message);
      const errorMessage =
        error.response?.data?.msg || "Error al guardar estadísticas";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  return {
    //* Propiedades
    estadisticasJugadores,
    estadisticasJugadorActivo,

    //* Métodos
    setEstadisticaLigaEquipoActiva,
    guardarEstadisticasJugadores,
  };
};
