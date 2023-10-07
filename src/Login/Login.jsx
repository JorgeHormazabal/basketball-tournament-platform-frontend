import { useEffect } from "react";
import { useAuthStore, useForm } from "../hooks";
import "./login.css";
import Swal from "sweetalert2";
const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export function Login() {
  const { startLogin, errorMessage } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <>
      <div className="login-box">
        <img src="/src/assets/img/icon.png" className="avatar" />
        <h1>Login</h1>
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
