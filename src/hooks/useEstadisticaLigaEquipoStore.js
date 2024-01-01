import { backendApi } from "api";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/estadisticaLigaEquipo/estadisticaLigaEquipoSlice";
import Swal from "sweetalert2";

export const useEstadisticaLigaEquipoStore = () => {
  const dispatch = useDispatch();
  const {
    events: estadisticasLigaEquipo,
    activeEvent: estadisticaLigaEquipoActiva,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.estadisticaLigaEquipo);
  const { user } = useSelector((state) => state.auth);

  const setEstadisticaLigaEquipoActiva = async (estadistica) => {
    await dispatch(onSetActiveEvent(estadistica));
  };

  const agregarEquipoALiga = async (ligaId, equipoId, actualizar) => {
    try {
      const { data } = await backendApi.post(`/team-league-statistics`, {
        teamId: Number(equipoId),
        leagueId: Number(ligaId),
      });
      dispatch(onAddNewEvent(data));
      Swal.fire({
        icon: "success",
        title: "Equipo Agregado a la Liga",
        showConfirmButton: false,
        timer: 1500,
      });
      actualizar();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const cargarEstadisticasDeLiga = async (ligaId) => {
    try {
      const { data } = await backendApi.get(
        `/team-league-statistics/league/${ligaId}`
      );
      console.log("cargando estadisticas", data);
      dispatch(onLoadEvents(data.sort((a, b) => b.points - a.points)));
    } catch (error) {
      console.log("Error cargando estadisticas");
      console.log(error);
    }
  };
  const reCargarEstadisticasDeLiga = async (ligaId) => {
    try {
      const { data } = await backendApi.get(
        `/team-league-statistics/league/${ligaId}`
      );
      console.log("RECARGANDO estadisticas", data);
      const orderArr = data.sort((a, b) => b.points - a.points);
      orderArr.forEach((o) => dispatch(onUpdateEvent(o)));
    } catch (error) {
      console.log("Error cargando estadisticas");
      console.log(error);
    }
  };

  const cargarTodasLasEstadisticasDeLiga = async (ligas) => {
    try {
      const routes = ligas.map(
        (liga) => `/team-league-statistics/league/${liga.id}`
      );

      for (const [index, route] of routes.entries()) {
        const { data } = await backendApi.get(route);
        const ligaId = ligas[index].id;

        const dataWithLigaId = data.map((item) => ({ ...item, ligaId }));

        dispatch(onLoadEvents(dataWithLigaId));
      }
    } catch (error) {
      console.log("Error cargando todas las estadisticas");
      console.log(error);
    }
  };

  const limpiarEstadisticasDeLiga = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error cargando estadisticas");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    estadisticaLigaEquipoActiva,
    estadisticasLigaEquipo,
    hayEstadisticaLigaEquipoActivaActiva: !!estadisticaLigaEquipoActiva,
    isLoading,

    //* Métodos
    setEstadisticaLigaEquipoActiva,
    /*
    borrarLiga,
    cargarLigas,
    guardarLiga,
    */
    cargarEstadisticasDeLiga,
    reCargarEstadisticasDeLiga,
    agregarEquipoALiga,
    limpiarEstadisticasDeLiga,
    cargarTodasLasEstadisticasDeLiga,
  };
};
