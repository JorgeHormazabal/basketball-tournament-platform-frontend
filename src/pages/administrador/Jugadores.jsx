import { useEffect } from "react";

import "./Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useJugadorStore } from "hooks";
import { ModalJugador } from "components/administrador/ModalJugador/ModalJugador";

export function Jugadores() {
  const { jugadores, setJugadorActivo, borrarJugador, cargarJugadores } =
    useJugadorStore();
  const borrar = (jugador) => {
    setJugadorActivo(jugador);
    borrarJugador();
  };

  const editarModal = (jugador) => {
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
        {jugadores.length > 0 ? (
          <Tabla
            cabeceras={[
              "id",
              "Nombre",
              "Rut",
              "Fecha nacimiento",
              "Club",
              "Division",
            ]}
            filas={[
              "name",
              "rut",
              "birthdate",
              "displayTeam",
              "displayDivision",
            ]}
            data={jugadores}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalJugador"}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <ModalJugador />
    </div>
  );
}
