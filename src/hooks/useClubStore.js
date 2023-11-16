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
} from "store/club/clubSlice";
import { objectToFormData } from "helpers";

export const useClubStore = () => {
  const dispatch = useDispatch();
  const {
    events: clubes,
    activeEvent: clubActivo,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.club);
  const { user } = useSelector((state) => state.auth);

  const setClubActivo = async (clubEvent) => {
    await dispatch(onSetActiveEvent(clubEvent));
  };

  const guardarClub = async (club, file = undefined) => {
    try {
      let info;
      if (club.id && club.id.length !== 0) {
        const { id, name, password, phone } = club;
        info = objectToFormData({ name, password, phone }, true);
        if (file) info.append("file", file);
        const { data } = await backendApi.patch(`/clubs/${id}`, info);
        dispatch(onUpdateEvent({ ...club, ...data, user }));
      } else {
        info = objectToFormData(club, true);
        if (file) info.append("file", file);
        const { data } = await backendApi.post("/clubs", info);
        dispatch(onAddNewEvent(data));
      }

      Swal.fire({
        icon: "success",
        title: "Club guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const borrarClub = async (club) => {
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
        await backendApi.delete(`/clubs/${club.id}`);
        await dispatch(onDeleteEvent());
  
        Swal.fire({
          icon: 'success',
          title: 'Club borrado',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  };
  

  const cargarClubes = async () => {
    try {
      const { data } = await backendApi.get("/clubs");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  const limpiarClub = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error limpiando clubes");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    clubActivo,
    clubes,
    hayClubSeleccionado: !!clubActivo,
    isLoading,

    //* Métodos
    setClubActivo,
    borrarClub,
    cargarClubes,
    guardarClub,
    limpiarClub,
  };
};
