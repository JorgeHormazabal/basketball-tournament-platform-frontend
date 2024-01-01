import { BienvenidaTromu } from "components/club/PerfilClub/BienvenidaTromu";
import { ModalPerfilOrganizador } from "components/organizador/ModalPerfilOrganizador/ModalPerfilOrganizador";
import { imagePath } from "helpers";
import { useAuthStore, useLigaStore } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function PerfilOrganizador() {
  const { user } = useAuthStore();
  const { cargarTotalLigasDelOrganizador } = useLigaStore();
  const [total, setTotal] = useState({ leagueCount: 0, matchesCount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    cargarTotalLigasDelOrganizador().then((data) => setTotal(data));
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
                    src={
                      user.image
                        ? imagePath(user.image)
                        : "img/default_club.png"
                    }
                  />
                  <h2 className="fw-bold mt-4">{user.name}</h2>
                  <p className="rol">{user.role}</p>
                </div>
              </div>
              <div className="col-sm-8 bg-white rounded-right">
                <h3 className="mt-3 text-center">Detalles del organizador</h3>
                <hr className="mt-0 w-100"></hr>
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-weight-bold">Correo:</p>
                    <h6 className="text-muted">{user.email}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-weight-bold">Celular:</p>
                    <h6 className="text-muted">{user.phone}</h6>
                  </div>
                </div>
                <hr className="bg-primary" />
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-weight-bold">N° de Ligas:</p>
                    <h6 className="text-muted">{total.leagueCount}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-weight-bold">N° de Partidos:</p>
                    <h6 className="text-muted">{total.matchesCount}</h6>
                  </div>
                </div>
                <hr className="mt-0 w-100"></hr>
                <div className="buttons text-center">
                  <button
                    className="w-50 btn btn-primary"
                    onClick={() => {
                      navigate(
                        `/panel/${user.name.replace(/\s/g, "")}${user.id}`
                      );
                    }}
                  >
                    Iniciar Amistoso
                  </button>
                </div>
                <div className="buttons text-center">
                  <button
                    className="mt-1 w-50 btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalOrganizador"
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
      <ModalPerfilOrganizador />
    </div>
  );
}
