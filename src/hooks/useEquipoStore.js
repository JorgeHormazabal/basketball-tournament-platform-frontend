import { backendApi } from "api";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/equipo/equipoSlice";
import Swal from "sweetalert2";

export const useEquipoStore = () => {
  const dispatch = useDispatch();
  const {
    events: equipos,
    activeEvent: equipoActivo,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.equipo);
  const { user } = useSelector((state) => state.auth);

  const setEquipoActivo = async (equipo) => {
    await dispatch(await onSetActiveEvent(equipo));
  };

  const guardarEquipo = async (equipo) => {
    try {
      if (equipo.id.length !== 0) {
        const { id, coach, divisionId } = equipo;
        const { data } = await backendApi.patch(`/teams/${id}`, {
          coach,
          divisionId: Number(divisionId),
        });
        if (data.division) data.displayDivision = data.division.category;
        dispatch(onUpdateEvent({ ...equipo, ...data }));
      } else {
        const { id, ...equipoResto } = equipo;
        const { data } = await backendApi.post("/teams", {
          ...equipoResto,
          clubId: Number(equipoResto.clubId),
          divisionId: Number(equipoResto.divisionId),
        });
        data.displayDivision = data.division.category;
        data.displayClub = data.club.name;
        dispatch(onAddNewEvent(data));
      }

      Swal.fire({
        icon: "success",
        title: "Equipo guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const borrarEquipo = async (equipo) => {
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
        await backendApi.delete(`/teams/${equipo.id}`);
        await dispatch(onDeleteEvent());

        Swal.fire({
          icon: "success",
          title: "Equipo borrado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const cargarEquipos = async () => {
    try {
      const { data } = await backendApi.get("/teams");
      data.forEach((team) => {
        team.displayClub = team.club.name;
        team.displayDivision = team.division.category;
      });
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const cargarEquiposDelClub = async () => {
    try {
      const { data } = await backendApi.get("/teams/owned/");
      data.forEach((team) => {
        team.displayDivision = team.division.category;
      });
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const cargarEquiposYPartidosDelClub = async () => {
    try {
      const { data } = await backendApi.get("/clubs/leagues/");
      return data;
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const cargarEquiposDeLiga = async (ligaId) => {
    try {
      const { data } = await backendApi.get(`/leagues/${ligaId}/clubs`);
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const cargarEquiposFueraDeLiga = async (ligaId) => {
    try {
      const { data: equiposTotales } = await backendApi.get("/teams");
      const { data: equiposDeLiga } = await backendApi.get(
        `/leagues/${ligaId}/clubs`
      );
      const equiposFueraDeLiga = equiposTotales.filter(
        (equipo) =>
          !equiposDeLiga.some((equipoLiga) => equipoLiga.id === equipo.id)
      );
      console.log(equiposTotales, equiposDeLiga, equiposFueraDeLiga);
      return equiposFueraDeLiga;
    } catch (error) {
      console.log("Error cargando equipos fuera de la liga");
      console.log(error);
    }
  };

  const cargarTotalDelClub = async () => {
    try {
      const { data } = await backendApi.get("/teams/club/count/");
      return data;
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const limpiarEquipo = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error limpiando equipos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    equipoActivo,
    equipos,
    hayEquipoActivo: !!equipoActivo,
    isLoading,

    //* Métodos
    setEquipoActivo,
    borrarEquipo,
    cargarEquipos,
    cargarEquiposDelClub,
    cargarEquiposYPartidosDelClub,
    cargarEquiposDeLiga,
    guardarEquipo,
    cargarTotalDelClub,
    cargarEquiposFueraDeLiga,
    limpiarEquipo,
  };
};
