import './login.css';
export function Login() {
  return (
    <>
     <div className="login-box">
      <img src="/src/assets/img/icon.png" className="avatar"/>
      <h1>Login</h1>
      <form>
        <label>Correo</label>
        <input  type="text" placeholder="Ingrese su correo"/>
        <label>Contraseña</label>
        <input type="password" placeholder="Ingrese su contraseña"/>
        <input type="submit" value="Ingresar"/>
      </form>
    </div>
    </>
  )
}
