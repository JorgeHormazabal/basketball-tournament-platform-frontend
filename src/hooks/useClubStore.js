import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "../api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useClubStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.club);
  //const { user } = useSelector((state) => state.auth);
  const { user } = { name: 2 };

  const setActiveEvent = async (clubEvent) => {
    await dispatch(onSetActiveEvent(clubEvent));
  };

  const startSavingEvent = async (clubEvent) => {
    try {
      if (clubEvent.id.length !== 0) {
        const { id, name, password } = clubEvent;
        await backendApi.patch(`/clubs/${id}`, { name, password });
        dispatch(onUpdateEvent({ ...clubEvent, user }));
      } else {
        const { id, ...club } = clubEvent;
        const { data } = await backendApi.post("/clubs", club);
        dispatch(onAddNewEvent({ ...clubEvent, id: data.id }));
      }

      Swal.fire({
        icon: "success",
        title: "Club Guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      console.log(activeEvent, activeEvent.id);
      await backendApi.delete(`/clubs/${activeEvent.id}`);
      await dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await backendApi.get("/clubs");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
