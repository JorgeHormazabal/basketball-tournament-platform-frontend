import React from "react";
import "../Dashboard.scss";
import { useJugadorStore } from "hooks";
import { useEffect } from "react";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { ModalJugador } from "components/club/ModalJugador/ModalJugador";
import { ModalDetallesJugador } from "components/club/ModalDetallesJugador/ModalDetallesJugador";
import { ModalEstadisticaJugador } from "components/club/ModalEstadisticaJugador/ModalEstadisticaJugador";

export function JugadoresClub() {
  const {
    jugadores,
    setJugadorActivo,
    borrarJugador,
    cargarJugadoresDelClub,
    isLoading,
  } = useJugadorStore();

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
    console.log("cargarJugadoresDelClub");
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
        {isLoading ? (
          <Spinner />
        ) : (
          <Tabla
            cabeceras={["Nombre", "Rut", "Fecha nacimiento", "División"]}
            filas={["name", "rut", "displayBirthdate", "displayDivision"]}
            data={jugadores}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalJugador"}
            modalId2={"ModalDetallesJugador"}
            modalIdEstadistica={"ModalEstadisticaJugador"}
            mostrarDetalles={true}
            mostrarEditar={false}
            mostrarEstadistica={true}
            mostrarJugador={mostrarJugador}
          />
        )}
      </div>
      <ModalJugador />
      <ModalDetallesJugador />
      <ModalEstadisticaJugador />
    </div>
  );
}
