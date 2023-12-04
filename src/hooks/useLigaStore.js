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
} from "store/liga/ligaSlice";

export const useLigaStore = () => {
  const dispatch = useDispatch();
  const {
    events: ligas,
    activeEvent: ligaActiva,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.liga);
  const { user } = useSelector((state) => state.auth);

  const setLigaActiva = async (liga) => {
    await dispatch(onSetActiveEvent(liga));
  };

  const guardarLigaOrganizador = async (liga) => {
    try {
      if (liga.id.length !== 0) {
        const { id, organizerId, winnerId, ...restoLiga } = liga;
        const { data } = await backendApi.patch(`/leagues/${id}`, {
          ...restoLiga,
          winnerId: Number(winnerId),
        });
        dispatch(
          onUpdateEvent({
            ...liga,
            ...data,
            user,
          })
        );
      } else {
        const { id, ...restoLiga } = liga;
        const { data } = await backendApi.post("/leagues/organizer", {
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

  const guardarLigaAdministrador = async (liga) => {
    try {
      if (liga.id.length !== 0) {
        const { id, organizerId, winnerId, ...restoLiga } = liga;
        const { data } = await backendApi.patch(`/leagues/${id}`, {
          ...restoLiga,
          winnerId: Number(winnerId),
        });
        dispatch(
          onUpdateEvent({
            ...liga,
            ...data,
            user,
          })
        );
      } else {
        const { id, organizerId, ...restoLiga } = liga;
        const { data } = await backendApi.post("/leagues/", {
          ...restoLiga,
          organizerId: Number(organizerId),
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
        await backendApi.delete(`/leagues/${liga.id}`);
        await dispatch(onDeleteEvent());

        Swal.fire({
          icon: "success",
          title: "Liga borrada",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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

  const cargarTodasLasLigas = async () => {
    try {
      const { data } = await backendApi.get("/leagues");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando ligas");
      console.log(error);
    }
  };

  const cargarTotalLigasDelOrganizador = async () => {
    try {
      const { data } = await backendApi.get("/leagues/organizer/count");
      return data;
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const limpiarLiga = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error limpiando ligas");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    ligaActiva,
    ligas,
    hayLigaActiva: !!ligaActiva,
    isLoading,

    //* Métodos
    setLigaActiva,
    borrarLiga,
    cargarLigas,
    guardarLigaOrganizador,
    guardarLigaAdministrador,
    cargarLigasDelClub,
    cargarLigasDelOrganizador,
    cargarTotalLigasDelOrganizador,
    cargarTodasLasLigas,
    limpiarLiga,
  };
};
