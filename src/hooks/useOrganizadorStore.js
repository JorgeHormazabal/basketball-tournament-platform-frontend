import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { backendApi } from "api";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "store/organizador/organizadorSlice";

export const useOrganizadorStore = () => {
  const dispatch = useDispatch();
  const { events: organizadores, activeEvent: organizadorActivo } = useSelector(
    (state) => state.organizador
  );
  const { user } = useSelector((state) => state.auth);

  const setOrganizadorActivo = async (organizador) => {
    await dispatch(onSetActiveEvent(organizador));
  };

  const guardarOganizador = async (organizador) => {
    try {
      if (organizador.id.length !== 0) {
        const { id, name, password } = organizador;
        await backendApi.patch(`/organizers/${id}`, { name, password });
        dispatch(onUpdateEvent({ ...organizador, user }));
      } else {
        const { id, ...organizadorResto } = organizador;
        const { data } = await backendApi.post("/organizers", organizadorResto);
        dispatch(onAddNewEvent({ ...data, id: id }));
      }

      Swal.fire({
        icon: "success",
        title: "Organizador guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const borrarOrganizador = async () => {
    try {
      await backendApi.delete(`/organizers/${organizadorActivo.id}`);
      await dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const cargarOrganizadores = async () => {
    try {
      const { data } = await backendApi.get("/organizers");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    organizadorActivo,
    organizadores,
    hayOrganizadorSeleccionado: !!organizadorActivo,

    //* Métodos
    setOrganizadorActivo,
    borrarOrganizador,
    cargarOrganizadores,
    guardarOganizador,
  };
};
