import { useAuthStore } from "hooks";
import "../Dashboard.scss";
import { BienvenidaTromu } from "components/club/PerfilClub/BienvenidaTromu";

export function PerfilAdmin() {
    const { user } = useAuthStore();

  return (
    <div className="dashboard-page">
        <BienvenidaTromu />

        <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-10 pt-5">
        <div className="row shadow p-3 rounded">
          <div className="col-sm-4 bg-primary text-black rounded-left fondo">
            <div className="card-body text-center">
              <img className="w-75 mt-4" src="img/icon.png"/>
              <h2 className="font-weight-bold mt-4">{user.name}</h2>
              <p className="rol">{user.role}</p>
            </div>
          </div>
          <div className="col-sm-8 bg-white rounded-right">
            <h3 className="mt-3 text-center">Detalles de Administrador</h3>
            <hr className="mt-0 w-100"></hr>
            <div className="row">
              <div className="col-sm-6">
                <p className="font-weight-bold">Correo:</p>
                <h6 className="text-muted">{user.email}</h6>
              </div>
              <div className="col-sm-6">
                <p className="font-weight-bold">Correo:</p>
                <h6 className="text-muted">{user.email}</h6>
              </div>
            </div>
            <hr className="bg-primary"/>
            <div className="row">
              <div className="col-sm-6">
                <p className="font-weight-bold">N° de Clubs:</p>
                <h6 className="text-muted">3</h6>
              </div>
              <div className="col-sm-6">
                <p className="font-weight-bold">N° de Ligas:</p>
                <h6 className="text-muted">2</h6>
              </div>
            </div>
            <hr className="mt-0 w-100"></hr>
            <div className="buttons text-center">
              <button className="w-50 btn btn-secondary">Editar perfil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}
