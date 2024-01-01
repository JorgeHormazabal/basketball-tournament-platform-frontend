import { useDispatch, useSelector } from "react-redux";
import { backendApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onUpdate,
} from "../store/auth/authSlice";

import { onLogout as onLogoutAuth } from "store/auth/authSlice";
import Swal from "sweetalert2";
import { useCleanStore } from "./useCleanStore";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const { limpiarStores } = useCleanStore();
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await backendApi.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token-init-date", new Date().getTime());
      await dispatch(
        onLogin({
          id: data.id,
          name: data.name,
          role: data.role,
          email: data.email,
          image: data.image,
          phone: data.phone,
        })
      );
      return data.role;
    } catch (error) {
      dispatch(startLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
      return null;
    }
  };

  //TODO: hacer end-point en backend
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const { data } = await backendApi.get("auth/profile");
      return data.role;
    } catch (error) {
      return null;
    }
  };

  const cargarTotal = async () => {
    try {
      const endpoints = [
        "clubs/count",
        "organizers/count",
        "players/count",
        "matches/count",
        "leagues/count",
        "teams/count",
      ];
      const requests = endpoints.map((endpoint) => backendApi.get(endpoint));
      const responses = await Promise.all(requests);
      const totals = responses.map((response) => response.data);
      const [
        totalClubes,
        totalOrganizadores,
        totalJugadores,
        totalPartidos,
        totalLigas,
        totalEquipos,
      ] = totals;

      return {
        totalOrganizadores,
        totalClubes,
        totalEquipos,
        totalLigas,
        totalPartidos,
        totalJugadores,
      };
    } catch (error) {
      console.error("Error al cargar los totales:", error);
      return {};
    }
  };

  const updateClubProfile = async (payload) => {
    try {
      const { data } = await backendApi.patch("/clubs/update-profile", payload);
      await dispatch(onUpdate(data));
      Swal.fire({
        icon: "success",
        title: "Perfil guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("Error al actualizar perfil", error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const updateOrganizadorProfile = async (payload) => {
    try {
      const { data } = await backendApi.patch(
        "/organizers/update-profile",
        payload
      );
      await dispatch(onUpdate(data));
      Swal.fire({
        icon: "success",
        title: "Perfil guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("Error al actualizar perfil", error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  const updateAdministradorProfile = async (payload) => {
    try {
      const { data } = await backendApi.patch("/admin/update-profile", payload);
      await dispatch(onUpdate(data));
      Swal.fire({
        icon: "success",
        title: "Perfil guardado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("Error al actualizar perfil", error);
      const errorMessage = error.response?.data?.msg || "Error al guardar";
      Swal.fire("Error al guardar", errorMessage, "error");
    }
  };

  /*
  //TODO: hacer end-point en backend
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await backendApi.get("auth/renew");
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };
  */

  const startLogout = (msg) => {
    localStorage.clear();
    dispatch(msg ? onLogoutAuth(msg) : onLogoutAuth());
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    limpiarStores();
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    cargarTotal,
    updateClubProfile,
    updateOrganizadorProfile,
    updateAdministradorProfile,
  };
};
