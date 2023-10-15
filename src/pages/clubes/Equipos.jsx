import React, { useEffect } from "react";
import { useEquipoStore } from "hooks/useEquipoStore";
import { CLUBID } from "./Club";

export function EquiposDeMiClub() {
  const { equipos, cargarEquipos } = useEquipoStore();

  useEffect(() => {
    cargarEquipos();
  }, [cargarEquipos]);

  const equiposDelClub = equipos.filter((equipo) => equipo.clubId === CLUBID);
  console.log(equiposDelClub)

  return (
    <div>
      <h2>Equipos del Club</h2>
      {equiposDelClub.length > 0 ? (
        <ul>
          {equiposDelClub.map((equipo) => (
            <li key={equipo.id}>
              <p>ID: {equipo.id}</p>
              <p>Nombre: {equipo.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No hay equipos en este club.</div>
      )}
    </div>
  );
}


