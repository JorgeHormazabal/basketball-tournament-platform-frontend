import React from "react";
import "../Dashboard.scss";
import { useJugadorStore } from "hooks";
import { useEffect } from "react";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { ModalJugador } from "components/club/ModalJugador/ModalJugador";
import { ModalDetallesJugador } from "components/club/ModalDetallesJugador/ModalDetallesJugador";

export function JugadoresClub() {
  const { jugadores, setJugadorActivo, borrarJugador, cargarJugadoresDelClub } =
    useJugadorStore();

  const borrar = async (jugador) => {
    setJugadorActivo(jugador);
    borrarJugador(jugador);
  };

  const editarModal = (jugador) => {
    setJugadorActivo(jugador);
  };

  const mostrarJugador = (jugador) => {
    setJugadorActivo(jugador);
  };

  const abrirModal = () => {
    setJugadorActivo(null);
  };
  useEffect(() => {
    cargarJugadoresDelClub();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <BotonAgregar
          titulo="Jugadores"
          boton="Agregar jugadora"
          abrir={abrirModal}
          modalId={"modalJugador"}
        />
        {jugadores.length > 0 ? (
          <Tabla
            cabeceras={["Nombre", "Rut", "Fecha nacimiento", "Division"]}
            filas={["name", "rut", "displayBirthdate", "displayDivision"]}
            data={jugadores}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalJugador"}
            modalId2={"ModalDetallesJugador"}
            mostrarDetalles={true}
            mostrarEditar={false}
            mostrarJugador={mostrarJugador}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <ModalJugador />
      <ModalDetallesJugador/>
    </div>
  );
}
