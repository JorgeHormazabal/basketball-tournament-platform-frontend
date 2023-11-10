import { useEffect } from "react";

import "../Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useJugadorStore } from "hooks";
import { ModalJugador } from "components/administrador/ModalJugador/ModalJugador";
import { ModalDetallesJugador } from "components/club/ModalDetallesJugador/ModalDetallesJugador";

export function Jugadores() {
  const {
    jugadores,
    setJugadorActivo,
    borrarJugador,
    cargarJugadores,
    isLoading,
  } = useJugadorStore();
  const borrar = (jugador) => {
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
    cargarJugadores();
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
            cabeceras={[
              "Nombre",
              "Rut",
              "Fecha nacimiento",
              "Club",
              "División",
            ]}
            filas={[
              "name",
              "rut",
              "displayBirthdate",
              "displayTeam",
              "displayDivision",
            ]}
            data={jugadores}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalJugador"}
            modalId2={"ModalDetallesJugador"}
            mostrarDetalles={true}
            mostrarEditar={false}
            mostrarJugador={mostrarJugador}
          />
        )}
      </div>
      <ModalJugador />
      <ModalDetallesJugador />
    </div>
  );
}
