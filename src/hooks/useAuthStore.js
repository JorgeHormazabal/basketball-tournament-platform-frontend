import { useDispatch, useSelector } from "react-redux";
import { backendApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

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
      dispatch(onLogout("Credenciales incorrectas"));
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

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
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
