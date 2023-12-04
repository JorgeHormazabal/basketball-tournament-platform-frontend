import { useAuthStore } from "hooks";
import "../Dashboard.scss";
import { BienvenidaTromu } from "components/club/PerfilClub/BienvenidaTromu";
import { useEffect } from "react";
import { useState } from "react";
import { ModalPerfilAdministrador } from "components/administrador/ModalPerfilAdministrador/ModalPerfilAdministrador";
import { imagePath } from "helpers";

export function PerfilAdmin() {
  const { user, cargarTotal } = useAuthStore();
  const [totales, setTotales] = useState(null);
  useEffect(() => {
    cargarTotal().then((data) => setTotales(data));
    console.log(user);
  }, []);

  return (
    <div className="dashboard-page">
      <BienvenidaTromu />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 pt-5">
            <div className="row shadow p-3 rounded">
              <div className="col-sm-4 bg-primary text-white rounded-left fondo">
                <div className="card-body text-center">
                  <img
                    className="w-75 mt-4"
                    src={imagePath(user?.image) || "img/icon.png"}
                  />
                  <h2 className="fw-bold mt-4">{user.name}</h2>
                  <p className="rol">{user.role}</p>
                </div>
              </div>
              <div className="col-sm-8 bg-white rounded-right ps-5">
                <h3 className="mt-3 text-center">Detalles de Administrador</h3>
                <hr className="mt-0 w-100"></hr>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">Correo: </p>
                    <br />
                    <h6 className="text-muted d-inline">{user.email}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">Celular:</p>
                    <br />
                    <h6 className="text-muted d-inline">{user.phone}</h6>
                  </div>
                </div>
                <hr className="bg-primary" />
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">N° de Clubs: </p>
                    <h6 className="text-muted d-inline">
                      {totales?.totalClubes}
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">
                      N° de Organizadores:{" "}
                    </p>
                    <h6 className="text-muted d-inline">
                      {totales?.totalOrganizadores}
                    </h6>
                  </div>
                </div>
                <hr className="bg-primary" />
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">N° de Ligas: </p>
                    <h6 className="text-muted d-inline">
                      {totales?.totalLigas}
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">N° de Equipos: </p>
                    <h6 className="text-muted d-inline">
                      {totales?.totalEquipos}
                    </h6>
                  </div>
                </div>
                <hr className="bg-primary" />
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">
                      N° de Partidos:{" "}
                    </p>
                    <h6 className="text-muted d-inline">
                      {totales?.totalPartidos}
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-weight-bold d-inline">
                      N° de Jugadores:{" "}
                    </p>
                    <h6 className="text-muted d-inline">
                      {totales?.totalJugadores}
                    </h6>
                  </div>
                </div>
                <hr className="mt-3 w-100"></hr>
                <div className="buttons text-center">
                  <button
                    className="w-50 btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAdministrador"
                    onClick={() => {}}
                  >
                    Editar perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalPerfilAdministrador />
    </div>
  );
}
