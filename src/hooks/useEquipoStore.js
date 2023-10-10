import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/equipo/equipoSlice";

export const useEquipoStore = () => {
  const dispatch = useDispatch();
  const { events: equipos, activeEvent: equipoActivo } = useSelector(
    (state) => state.equipo
  );
  const { user } = useSelector((state) => state.auth);

  const setEquipoActivo = async (equipo) => {
    await dispatch(onSetActiveEvent(equipo));
  };

  const guardarEquipo = async (equipo) => {
    try {
      if (equipo.id.length !== 0) {
        const { id, coach } = equipo;
        await backendApi.patch(`/teams/${id}`, { coach });
        dispatch(onUpdateEvent({ ...equipo, user }));
      } else {
        const { id, ...equipoResto } = equipo;
        const { data } = await backendApi.post("/teams", equipoResto);
        dispatch(onAddNewEvent({ ...data, id: id }));
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

  const borrarEquipo = async () => {
    try {
      await backendApi.delete(`/teams/${equipoActivo.id}`);
      await dispatch(onDeleteEvent());
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

  return {
    //* Propiedades
    equipoActivo,
    equipos,
    hayDivisionActiva: !!equipoActivo,

    //* Métodos
    setEquipoActivo,
    borrarEquipo,
    cargarEquipos,
    guardarEquipo,
  };
};
