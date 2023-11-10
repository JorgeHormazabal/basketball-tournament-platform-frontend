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
} from "store/organizador/organizadorSlice";
import { objectToFormData } from "helpers";

export const useOrganizadorStore = () => {
  const dispatch = useDispatch();
  const {
    events: organizadores,
    activeEvent: organizadorActivo,
    isLoadingEvents: isLoading,
  } = useSelector((state) => state.organizador);
  const { user } = useSelector((state) => state.auth);

  const setOrganizadorActivo = async (organizador) => {
    await dispatch(onSetActiveEvent(organizador));
  };

  const guardarOganizador = async (organizador, file = undefined) => {
    try {
      let info;
      if (organizador.id && organizador.id.length !== 0) {
        const { id, name, password, phone } = organizador;
        info = objectToFormData({ name, password, phone }, true);
        if (file) info.append("file", file);
        const { data } = await backendApi.patch(`/organizers/${id}`, info);
        dispatch(onUpdateEvent({ ...organizador, ...data, user }));
      } else {
        info = objectToFormData(organizador, true);
        if (file) info.append("file", file);
        const { data } = await backendApi.post("/organizers", info);
        dispatch(onAddNewEvent(data));
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

  const borrarOrganizador = async (organizador) => {
    try {
      await backendApi.delete(`/organizers/${organizador.id}`);
      await dispatch(onDeleteEvent());

      Swal.fire({
        icon: "success",
        title: "Organizador borrado",
        showConfirmButton: false,
        timer: 1500,
      });
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

  const limpiarOrganizador = async () => {
    try {
      dispatch(onLogoutEvent());
    } catch (error) {
      console.log("Error limpiando partidos");
      console.log(error);
    }
  };

  return {
    //* Propiedades
    organizadorActivo,
    organizadores,
    hayOrganizadorSeleccionado: !!organizadorActivo,
    isLoading,

    //* Métodos
    setOrganizadorActivo,
    borrarOrganizador,
    cargarOrganizadores,
    guardarOganizador,
    limpiarOrganizador,
  };
};
