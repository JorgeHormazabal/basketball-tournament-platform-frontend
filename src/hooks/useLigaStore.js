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

  const guardarLiga = async (liga) => {
    try {
      //TODO:
      if (liga.id.length !== 0) {
        const { id, teamId } = liga;
        const { data } = await backendApi.patch(`/players/${id}`, {
          teamId: Number(teamId),
        });
        if (data.team) data.displayDivision = data.team.division.category;
        console.log(data);
        dispatch(onUpdateEvent({ ...liga, ...data, user }));
      } else {
        const { id, ...jugadorResto } = liga;
        const { data } = await backendApi.post("/players", {
          ...jugadorResto,
          teamId: Number(jugadorResto.teamId),
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

  return {
    //* Propiedades
    ligaActiva,
    ligas,
    hayLigaActiva: !!ligaActiva,

    //* Métodos
    setLigaActiva,
    borrarLiga,
    cargarLigas,
    guardarLiga,
    cargarLigasDelClub,
  };
};
