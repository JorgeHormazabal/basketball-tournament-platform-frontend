import React from "react";
import { BienvenidaTromu } from "components/club/PerfilClub/BienvenidaTromu";
import { useAuthStore, useLigaStore } from "hooks";
import { useEffect } from "react";
import { useState } from "react";

export function PerfilOrganizador() {
  const { user } = useAuthStore();
  const { cargarTotalLigasDelOrganizador } = useLigaStore();
  const [total, setTotal] = useState({ leagueCount: 0, matchesCount: 0 });

  useEffect(() => {
    cargarTotalLigasDelOrganizador().then((data) => setTotal(data));
  });

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
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/800px-Golden_State_Warriors_logo.svg.png"
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
                    <h6 className="text-muted">987986545</h6>
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
                  <button className="w-50 btn btn-secondary">
                    Editar perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
