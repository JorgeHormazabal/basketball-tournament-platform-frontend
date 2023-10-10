import { useEffect } from "react";
import { useAuthStore, useForm } from "../../../hooks";
import "./login.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export function Login() {
  const { startLogin, errorMessage, checkAuthToken } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const navigate = useNavigate();

  const loginSubmit = async (event) => {
    event.preventDefault();
    const role = await startLogin({
      email: loginEmail,
      password: loginPassword,
    });
    redireccionar(role);
  };

  const redireccionar = (role) => role && navigate(`/${role}`);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
    checkAuthToken().then((role) => redireccionar(role));
  }, [errorMessage]);

  return (
    <>
      <div className="login-box">
        <img src="/src/assets/img/icon.png" className="avatar" />
        <h1>Iniciar Sesión</h1>
        <form onSubmit={loginSubmit}>
          <label>Correo</label>
          <input
            type="text"
            placeholder="Ingrese su correo"
            name="loginEmail"
            value={loginEmail}
            onChange={onLoginInputChange}
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            name="loginPassword"
            value={loginPassword}
            onChange={onLoginInputChange}
          />
          <input type="submit" value="Ingresar" />
        </form>
      </div>
    </>
  );
}
