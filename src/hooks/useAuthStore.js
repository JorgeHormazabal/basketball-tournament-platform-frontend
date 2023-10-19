import { useDispatch, useSelector } from "react-redux";
import { backendApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

import { onLogout as onLogoutAuth } from "store/auth/authSlice";
import { onLogoutEvent as onLogoutClub } from "store/club/clubSlice";
import { onLogoutEvent as onLogoutDivision } from "store/division/divisionSlice";
import { onLogoutEvent as onLogoutEquipo } from "store/equipo/equipoSlice";
import { onLogoutEvent as onLogoutEstadisticaLigaEquipo } from "store/estadisticaLigaEquipo/estadisticaLigaEquipoSlice";
import { onLogoutEvent as onLogoutJugador } from "store/jugador/jugadorSlice";
import { onLogoutEvent as onLogoutLiga } from "store/liga/ligaSlice";
import { onLogoutEvent as onLogoutOrganizador } from "store/organizador/organizadorSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
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
      //TODO: guardar imagen
      await dispatch(
        onLogin({ name: data.name, role: data.role, email: data.email })
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
    dispatch(onLogoutClub());
    dispatch(onLogoutDivision());
    dispatch(onLogoutEquipo());
    dispatch(onLogoutEstadisticaLigaEquipo());
    dispatch(onLogoutJugador());
    dispatch(onLogoutLiga());
    dispatch(onLogoutOrganizador());
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
  };
};
