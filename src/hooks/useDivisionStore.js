import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/division/divisionSlice";

export const useDivisionStore = () => {
  const dispatch = useDispatch();
  const { events: divisiones, activeEvent: divisionActiva } = useSelector(
    (state) => state.division
  );
  const { user } = useSelector((state) => state.auth);

  const setDivisionActivo = async (division) => {
    await dispatch(onSetActiveEvent(division));
  };

  const guardarDivision = async (division) => {
    try {
      if (division.id.length !== 0) {
        const { id, category } = division;
        await backendApi.patch(`/divisions/${id}`, { category });
        dispatch(onUpdateEvent({ ...division, user }));
      } else {
        const { id, ...divisionResto } = division;
        const { data } = await backendApi.post("/divisions", divisionResto);
        dispatch(onAddNewEvent({ ...data, id: id }));
      }

      Swal.fire({
        icon: "success",
        title: "Division guardada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const borrarDivision = async () => {
    try {
      await backendApi.delete(`/divisions/${divisionActiva.id}`);
      await dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const cargarDivisiones = async () => {
    try {
      const { data } = await backendApi.get("/divisions");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando divisiones");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    divisionActiva,
    divisiones,
    hayDivisionActiva: !!divisionActiva,

    //* Métodos
    setDivisionActivo,
    borrarDivision,
    cargarDivisiones,
    guardarDivision,
  };
};
