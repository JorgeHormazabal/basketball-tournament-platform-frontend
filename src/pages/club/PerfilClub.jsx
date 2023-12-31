import React, { useEffect } from "react";
import { useAuthStore } from "hooks";
import "../Dashboard.scss";
import { useEquipoStore } from "hooks/useEquipoStore";
import { useState } from "react";
import { BienvenidaTromu } from "components/club/PerfilClub/BienvenidaTromu";
import { imagePath } from "helpers";
import { ModalPerfilClub } from "components";

export function PerfilClub() {
  const { user } = useAuthStore();
  const { cargarTotalDelClub } = useEquipoStore();
  const [total, setTotal] = useState({ totalTeams: 0, totalPlayers: 0 });

  useEffect(() => {
    cargarTotalDelClub().then((data) => setTotal(data));
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
                <h3 className="mt-3 text-center">Detalles del Club</h3>
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
                    <p className="font-weight-bold">N° de Equipos:</p>
                    <h6 className="text-muted">{total.totalTeams}</h6>
                  </div>
                  <div className="col-sm-6">
                    <p className="font-weight-bold">N° de Jugadoras:</p>
                    <h6 className="text-muted">{total.totalPlayers}</h6>
                  </div>
                </div>
                <hr className="mt-0 w-100"></hr>
                <div className="buttons text-center">
                  <button
                    className="w-50 btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalClub"
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
      <ModalPerfilClub />
    </div>
  );
}
