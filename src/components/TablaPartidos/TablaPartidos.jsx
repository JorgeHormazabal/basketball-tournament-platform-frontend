import Spinner from "components/Spinner/Spinner";
import { formatDateTime } from "helpers";
import { usePartidoStore } from "hooks";
import React from "react";
import { useEffect } from "react";

export default function TablaPartidos({ partidos }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Lugar</th>
            <th scope="col">Local</th>
            <th scope="col">Visitante</th>
            <th scope="col">Puntos Local</th>
            <th scope="col">Puntos Visitantes</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((objeto, index) => (
            <tr key={index}>
              <td className="text-start">{formatDateTime(objeto.dateTime)}</td>
              <td className="text-start">{objeto.place}</td>
              <td className="text-start">{objeto.home.club.name}</td>
              <td className="text-start">{objeto.away.club.name}</td>
              <td className="text-center">{objeto.homePoints}</td>
              <td className="text-center">{objeto.awayPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
