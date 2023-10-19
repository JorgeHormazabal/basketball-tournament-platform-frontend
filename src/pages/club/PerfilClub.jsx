import React, { useEffect } from "react";
import { useAuthStore } from "hooks";
import "../Dashboard.scss";
import { useEquipoStore } from "hooks/useEquipoStore";
import { useState } from "react";
import { BienvenidaTromu } from "components/club/PerfilClub/BienvenidaTromu"

export const CLUBID = 4;

export function PerfilClub() {
  const { user } = useAuthStore();
  const { cargarTotalDelClub } = useEquipoStore();
  const [total, setTotal] = useState({ totalTeams: 0, totalPlayers: 0 });

  useEffect(() => {
    cargarTotalDelClub().then((data) => setTotal(data));
  });



  return (
    <div className="dashboard-page">
      <BienvenidaTromu/>
      <div className="perfil">
        
        <div className="d-flex flex-row m-5">
          <div>
            <img
              src="https://seeklogo.com/images/L/leo-clubs-logo-8B01BF9C26-seeklogo.com.png"
            />
          </div>
          <div className="m-5">
            <p className="fs-3">Nombre: {user.name}</p>
            <p className="fs-4">Correo: {user.email}</p>
            <p className="fs-4">{total.totalTeams} equipos.</p>
            <p className="fs-4">{total.totalPlayers} jugadores.</p>
            <div className="buttons">
              <button className="btn btn-secondary">Editar perfil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
