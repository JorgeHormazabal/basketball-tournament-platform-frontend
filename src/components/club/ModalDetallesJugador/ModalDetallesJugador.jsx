import { useJugadorStore } from "hooks";
import { useEffect, useState } from "react";
import { ModalJugador } from "components/club/ModalJugador/ModalJugador";

export const ModalDetallesJugador = () => { 

  const { jugadorActivo, cargarJugadores } = useJugadorStore();

  useEffect(() => {
    cargarJugadores
  }, [jugadorActivo]);

  return (
    <div id="ModalDetallesJugador" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Información del Jugador</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div className="modal-body">
          <p className="fw-bold">Nombre</p>
          <p>{jugadorActivo?.name}</p>
          <p className="fw-bold">Rut</p>
          <p>{jugadorActivo?.rut}</p>
          <p className="fw-bold">Fecha de Nacimiento</p>
          <p>{jugadorActivo?.displayBirthdate}</p>
          <p className="fw-bold">Equipo</p>
          <p>{jugadorActivo?.displayDivision}</p>
          <p className="fw-bold">Telefono</p>
          <p>{jugadorActivo?.phone}</p>
          <p className="fw-bold">Correo</p>
          <p>{jugadorActivo?.email}</p>
          <p className="fw-bold">Nombre de Contacto de Emergencia</p>
          <p>{jugadorActivo?.emergencyName}</p>
          <p className="fw-bold">Número de Contacto de Emergencia</p>
          <p>{jugadorActivo?.emergencyPhone}</p>
          <p className="fw-bold">Altura</p>
          <p>{jugadorActivo?.height+" CM"}</p>
          <p className="fw-bold">Peso</p>
          <p>{jugadorActivo?.weight+" KG"}</p>
          <p className="fw-bold">Posición</p>
          <p>{jugadorActivo?.position}</p>
          <p className="fw-bold">Numero de Camiseta</p>
          <p>{jugadorActivo?.shirtNumber}</p>
          <p className="fw-bold">Talla de Camiseta</p>
          <p>{jugadorActivo?.shirtSize}</p>
          <p className="fw-bold">Talla de Short</p>
          <p>{jugadorActivo?.shortsSize}</p>
          <p className="fw-bold">Talla de Zapatillas</p>
          <p>{jugadorActivo?.shoeSize}</p>
          <p className="fw-bold">Detalles Clinicos</p>
          <p>{jugadorActivo?.clinicalDetail}</p>

          <div className="d-grid col-6 mx-auto">
            <button
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#modalJugador"
            >
            <i className="fa-solid fa-edit"></i> Editar Jugador
            </button>
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
      <ModalJugador />
    </div>
  );
};
