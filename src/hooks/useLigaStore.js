import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/liga/ligaSlice";

export const useLigaStore = () => {
  const dispatch = useDispatch();
  const { events: ligas, activeEvent: ligaActiva } = useSelector(
    (state) => state.liga
  );
  const { user } = useSelector((state) => state.auth);

  const setLigaActiva = async (liga) => {
    await dispatch(onSetActiveEvent(liga));
  };

  const guardarLigaOrganizador = async (liga) => {
    try {
      //TODO:
      if (liga.id.length !== 0) {
        const { id, organizerId, ...restoLiga } = liga;
        const { data } = await backendApi.patch(`/league/${id}`, restoLiga);
        dispatch(onUpdateEvent({ ...liga, ...data, user }));
      } else {
        const { id, ...restoLiga } = liga;
        const { data } = await backendApi.post("/league/organizer", {
          ...restoLiga,
        });
        dispatch(onAddNewEvent(data));
      }

      Swal.fire({
        icon: "success",
        title: "Liga guardada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const borrarLiga = async (liga) => {
    try {
      await backendApi.delete(`/leagues/${liga.id}`);
      await dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const cargarLigas = async () => {
    try {
      const { data } = await backendApi.get("/leagues");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando ligas");
      console.log(error);
    }
  };

  const cargarLigasDelClub = async () => {
    try {
      const { data } = await backendApi.get("/team-league-statistics/club");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando ligas");
      console.log(error);
    }
  };

  const cargarLigasDelOrganizador = async () => {
    try {
      const { data } = await backendApi.get("/leagues/organizer");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando ligas");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    ligaActiva,
    ligas,
    hayLigaActiva: !!ligaActiva,

    //* Métodos
    setLigaActiva,
    borrarLiga,
    cargarLigas,
    guardarLigaOrganizador,
    cargarLigasDelClub,
    cargarLigasDelOrganizador,
  };
};