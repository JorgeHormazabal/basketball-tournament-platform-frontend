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
} from "store/partido/partidoSlice";

export const usePartidoStore = () => {
  const dispatch = useDispatch();
  const {
    events: partidos,
    activeEvent: partidoActivo,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.partido);
  const { user } = useSelector((state) => state.auth);
  const setPartidoActivo = async (partido) => {
    await dispatch(await onSetActiveEvent(partido));
  };

  const guardarPartido = async (partido) => {
    try {
      if (partido.id.length !== 0) {
        //TODO: update
        const { id, homePoints, awayPoints, ...restoPartido } = partido;
        const { data } = await backendApi.patch(`/matches/${id}`, {
          homePoints: Number(homePoints),
          awayPoints: Number(awayPoints),
          ...restoPartido,
        });
        dispatch(
          onUpdateEvent({
            ...partidoActivo,
            ...restoPartido,
            ...data,
            dateTime: `${data.dateTime}:00.000Z`,
            user,
          })
        );
      } else {
        const { id, ...partidoResto } = partido;
        const { data } = await backendApi.post("/matches", {
          ...partidoResto,
          homeId: Number(partidoResto.homeId),
          awayId: Number(partidoResto.awayId),
        });
        dispatch(
          onAddNewEvent({ ...data, dateTime: `${data.dateTime}:00.000Z` })
        );
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
      console.log("cargarPartidosDelEquipo", data);
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando partidos");
      console.log(error);
    }
  };

  const cargarPartidosDeLaLiga = async (ligaId) => {
    try {
      const { data } = await backendApi.get(`/matches/league/${ligaId}`);
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando partidos");
      console.log(error);
    }
  };

  const limpiarPartido = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error limpiando partidos");
      console.log(error);
    }
  };

  const borrarPartido = async (partido) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar',
      });
  
      if (result.isConfirmed) {
        await backendApi.delete(`/matches/${partido.id}`);
        await dispatch(onDeleteEvent());
  
        Swal.fire({
          icon: 'success',
          title: 'Partido borrado',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };
  

  return {
    //* Propiedades
    partidoActivo,
    partidos,
    hayPartidoActivo: !!partidoActivo,
    isLoading,

    //* Métodos
    setPartidoActivo,
    guardarPartido,
    cargarPartidos,
    cargarPartidosDelEquipo,
    cargarPartidosDeLaLiga,
    borrarPartido,
    limpiarPartido,
  };
};
