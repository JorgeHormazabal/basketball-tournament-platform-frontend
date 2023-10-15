import React, { useEffect } from "react";
import { useClubStore } from "hooks/useClubStore";

export const CLUBID = 4;

export function MiClub() {
  const { clubes, cargarClubes } = useClubStore();

  useEffect(() => {
    cargarClubes();
  }, [cargarClubes]);

  const club = clubes.find((club) => club.id === CLUBID);

  if (!club) {
    return <div>Club no encontrado</div>;
  }

  return (
    <div>
      <h2>Detalles del Club</h2>
      <p>ID: {club.id}</p>
      <p>Nombre: {club.name}</p>
      <p>Correo: {club.email}</p>
      <p>Contraseña: {club.password}</p>
    </div>
  );
}


