import { useJugadorStore } from "hooks";
import { useEffect, useState } from "react";
import { imagePath } from "helpers";
import { useEstadisticaJugadorStore } from "hooks/useEstadisticaJugadores";
import "./ModalEstadisticaJugador.scss";

export const ModalEstadisticaJugador = () => {
  const { jugadorActivo } = useJugadorStore();
  const { estadisticasJugadorActivo } = useEstadisticaJugadorStore();

  useEffect(() => {}, [jugadorActivo]);
  const calculateTotalPoints = (estadistica) => {
    return (
      estadistica.points + estadistica.doubleDoubles + estadistica.threePointers
    );
  };

  const calculateValoracion = (estadistica) => {
    return (
      calculateTotalPoints(estadistica) +
      estadistica.turnovers +
      estadistica.assists +
      estadistica.offensiveRebounds +
      estadistica.defensiveRebounds -
      estadistica.losses
    );
  };

  return (
    <div id="ModalEstadisticaJugador" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Estadisticas del Jugador</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column justify-content-start align-items-center">
            <p className="fw-bold">Nombre</p>
            <p>{jugadorActivo?.name}</p>
            <div className="container mt-4 p-0">
              <table className="table table-sm fs-6 text">
                <thead>
                  <tr>
                    <th>Fecha del Partido</th>
                    <th>Equipo Local</th>
                    <th>Equipo Visitante</th>
                    <th>Faltas</th>
                    <th>Puntos</th>
                    <th>Dobles Dobles</th>
                    <th>Triples</th>
                    <th>Pérdidas</th>
                    <th>Rebotes Ofensivos</th>
                    <th>Rebotes Defensivos</th>
                    <th>Asistencias</th>
                    <th>Pérdidas</th>
                    <th>Puntos Totales</th>
                    <th>Valoración</th>
                  </tr>
                </thead>
                <tbody>
                  {jugadorActivo?.playersStatistics.map(
                    (estadistica, index) => (
                      <tr key={index}>
                        {console.log(estadistica)}
                        <td>
                          {new Date(
                            estadistica.match.dateTime
                          ).toLocaleString()}
                        </td>
                        <td>{estadistica.match.home.club.name}</td>
                        <td>{estadistica.match.away.club.name}</td>
                        <td>{estadistica.fouls}</td>
                        <td>{estadistica.points}</td>
                        <td>{estadistica.doubleDoubles}</td>
                        <td>{estadistica.threePointers}</td>
                        <td>{estadistica.turnovers}</td>
                        <td>{estadistica.offensiveRebounds}</td>
                        <td>{estadistica.defensiveRebounds}</td>
                        <td>{estadistica.assists}</td>
                        <td>{estadistica.losses}</td>
                        <td>{calculateTotalPoints(estadistica)}</td>
                        <td>{calculateValoracion(estadistica)}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              id="btnCerrar"
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
