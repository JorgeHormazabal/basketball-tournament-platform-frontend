import React from "react";
import { formatDate } from "helpers";

export default function CardLiga({ liga, editar }) {
  const fechaActual = new Date();
  const fechaInicio = new Date(liga.startDate);
  const fechaFin = new Date(liga.endDate);
  let header;
  if (fechaInicio <= fechaActual && fechaActual <= fechaFin) {
    header = "En curso";
  } else if (fechaActual < fechaInicio) {
    header = "Sin empezar";
  } else {
    header = "Finalizado";
  }
  return (
    <div className="card text-center">
      <div className="card-header">
        {liga.organizer.name}
        <h6>{header}</h6>
        </div>
      <div className="card-body">
        <h5 className="card-title mb-4">{liga.name}</h5>
        <p className="card-text">
          {liga.winner ? liga?.winner?.name : "Sin ganador"}
        </p>
        <p className="card-text">
          Fecha de inicio: {formatDate(liga.startDate)}
        </p>
        <p className="card-text">Fecha de fin: {formatDate(liga.endDate)}</p>
      </div>
      <button
        className="btn btn-primary btn--details mx-auto mb-2"
        onClick={() => editar(liga)}
      >
        Detalles
      </button>
    </div>
  );
}
