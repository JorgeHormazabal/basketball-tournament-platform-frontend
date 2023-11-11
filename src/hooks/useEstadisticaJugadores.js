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
      activeEvent: estadisticasJugadoresActiva,
    } = useSelector((state) => state.estadisticasJugadores);
    const { user } = useSelector((state) => state.auth);
  
    const setEstadisticaLigaEquipoActiva = async (estadistica) => {
      await dispatch(onSetActiveEvent(estadistica));
    };
  

  
    return {
      //* Propiedades
      estadisticasJugadores,
      estadisticasJugadoresActiva,

      //* Métodos
      setEstadisticaLigaEquipoActiva,
    };
  };
  