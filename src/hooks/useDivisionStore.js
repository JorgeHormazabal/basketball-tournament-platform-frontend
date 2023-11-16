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
} from "store/division/divisionSlice";

export const useDivisionStore = () => {
  const dispatch = useDispatch();
  const {
    events: divisiones,
    activeEvent: divisionActiva,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.division);
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
        dispatch(onAddNewEvent(data));
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

  const borrarDivision = async (division) => {
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
        await backendApi.delete(`/divisions/${division.id}`);
        await dispatch(onDeleteEvent());
  
        Swal.fire({
          icon: 'success',
          title: 'División borrada',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
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

  const limpiarDivision = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error limpiando divisiones");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    divisionActiva,
    divisiones,
    hayDivisionActiva: !!divisionActiva,
    isLoading,

    //* Métodos
    setDivisionActivo,
    borrarDivision,
    cargarDivisiones,
    guardarDivision,
    limpiarDivision,
  };
};
