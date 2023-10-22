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

  const guardarPartido = async (partido) => {
    try {
      if (partido.id.length !== 0) {
        //TODO: update
        const data = "";
        dispatch(onUpdateEvent({ ...partido, ...data }));
      } else {
        const { id, ...partidoResto } = partido;
        const { data } = await backendApi.post("/matches", {
          ...partidoResto,
          homeId: Number(partidoResto.homeId),
          awayId: Number(partidoResto.awayId),
        });
        dispatch(onAddNewEvent(data));
      }

      Swal.fire({
        icon: "success",
        title: "Partido guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
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

  const cargarPartidosDeLaLiga = async (ligaId) => {
    try {
      const { data } = await backendApi.get(`/leagues/${ligaId}/matches`);
      console.log(data.matches);
      dispatch(onLoadEvents(data.matches));
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
    guardarPartido,
    cargarPartidos,
    cargarPartidosDelEquipo,
    cargarPartidosDeLaLiga,
  };
};
