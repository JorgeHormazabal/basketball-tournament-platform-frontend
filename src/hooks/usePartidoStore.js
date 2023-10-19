import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/partido/partidoSlice";

export const usePartidoStore = () => {
  const dispatch = useDispatch();
  const { events: partidos, activeEvent: partidoActivo } = useSelector(
    (state) => state.partido
  );
  const { user } = useSelector((state) => state.auth);

  const setPartidoActivo = async (partido) => {
    await dispatch(await onSetActiveEvent(partido));
  };

  const cargarPartidos = async () => {
    try {
      const { data } = await backendApi.get("/matches");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando partidos");
      console.log(error);
    }
  };

  const cargarPartidosDelEquipo = async (equipoId) => {
    try {
      const { data } = await backendApi.get(`/matches/team/${equipoId}`);
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando partidos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    partidoActivo,
    partidos,
    hayPartidoActivo: !!partidoActivo,

    //* Métodos
    setPartidoActivo,
    cargarPartidos,
    cargarPartidosDelEquipo,
  };
};
