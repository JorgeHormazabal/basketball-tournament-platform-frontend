import { BotonAgregar, Spinner } from "components";
import { ModalAgregarEquipo } from "components/organizador/ModalAgregarEquipo/ModalAgregarEquipo";
import { ModalLiga } from "components/organizador/ModalLiga/ModalLiga";
import { ModalPartido } from "components/organizador/ModalPartido/ModalPartido";
import TablaPartidosOrganizador from "components/organizador/TablaPartidosOrganizador/TablaPartidosOrganizador";
import { TablaPosiciones } from "components/organizador/TablaPosiciones/TablaPosiciones";
import { formatDate } from "helpers";
import {
  useEquipoStore,
  useEstadisticaLigaEquipoStore,
  useLigaStore,
  usePartidoStore,
} from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../Dashboard.scss";
import "./organizador.css";

export function EditarLigaAdministrador() {
  const { ligaActiva, setLigaActiva, borrarLiga } = useLigaStore();
  const {
    isLoading: isLoadingPartidos,
    partidos,
    cargarPartidosDeLaLiga,
    setPartidoActivo,
    borrarPartido,
    limpiarPartido,
  } = usePartidoStore();
  const {
    isLoading: isLoadingEstadisticas,
    estadisticasLigaEquipo,
    cargarEstadisticasDeLiga,
    limpiarEstadisticasDeLiga,
  } = useEstadisticaLigaEquipoStore();
  const { cargarEquiposFueraDeLiga, limpiarEquipo } = useEquipoStore();
  const [setTotalEquipos] = useState([]);

  useEffect(() => {
    limpiarEquipo();
    cargarEquiposFueraDeLiga(ligaActiva.id).then((data) =>
      setTotalEquipos(data)
    );
    if (ligaActiva) {
      limpiarPartido();
      limpiarEstadisticasDeLiga();
      cargarPartidosDeLaLiga(ligaActiva.id);
      cargarEstadisticasDeLiga(ligaActiva.id);
    }
  }, [ligaActiva]);

  const navigate = useNavigate();

  const borrar = (jugador) => {
    setPartidoActivo(jugador);
    borrarPartido(jugador);
  };
  const borrarEstaLiga = (ligaActiva) => {
    setLigaActiva(ligaActiva);
    borrarLiga(ligaActiva);
    navigate("/administrador/ligas").then(() => setLigaActiva(null));
  };

  const editarModal = (jugador) => {
    setPartidoActivo(jugador);
  };

  const editarModalLiga = (ligaActiva) => {
    setLigaActiva(ligaActiva);
  };
  const abrirModal = () => {
    setPartidoActivo(null);
  };
  const goBack = () => {
    navigate(-1).then(() => setLigaActiva(null));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-light"
        style={{ marginTop: "10px", marginLeft: "26vh", fontSize: "22px" }}
        onClick={goBack}
      >
        <i className="fa-solid fa-arrow-left"></i> Volver
      </button>
      <div className="dashboard-page" style={{ marginTop: "12px" }}>
        <div className="container-fluid">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>{ligaActiva.name}</h1>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-warning me-md-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalLiga"
                onClick={() => editarModalLiga(ligaActiva)}
              >
                <i className="fa-solid fa-edit"></i> Editar
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => borrarEstaLiga(ligaActiva)}
              >
                <i className="fa-solid fa-trash"></i> Borrar
              </button>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-md-12 border-right">
              <div className="status p-3">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="heading d-block">Ganador</span>
                          <span className="subheadings">
                            {ligaActiva.winner
                              ? ligaActiva?.winner?.name
                              : "Sin ganador"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="heading d-block">Reglas</span>
                          <span className="subheadings">
                            {ligaActiva.rules}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="heading d-block">
                            Fecha de inicio
                          </span>
                          <span className="subheadings">
                            {formatDate(ligaActiva.startDate)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <span className="heading d-block">Fecha de fin</span>
                          <span className="subheadings">
                            {formatDate(ligaActiva.endDate)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="ps-4">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h3 className="m-0">Tabla de puntuaciones</h3>
              <button
                className="btn btn-primary me-md-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalAgregarEquipo"
              >
                <i className="fa-solid fa-plus"></i> Agregar Equipo
              </button>
            </div>
            {isLoadingEstadisticas ? (
              <Spinner />
            ) : (
              <TablaPosiciones equipos={estadisticasLigaEquipo} />
            )}
          </div>
          <div className="ps-4 pt-4">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <h3 className="m-0">Partidos</h3>
              <BotonAgregar
                modalId="modalPartido"
                abrir={abrirModal}
                boton=" Crear Partido"
              />
            </div>
            {isLoadingPartidos > 0 ? (
              <Spinner />
            ) : (
              <TablaPartidosOrganizador
                partidos={partidos}
                editar={editarModal}
                borrar={borrar}
                modalId="modalPartido"
              />
            )}
          </div>
        </div>
        <ModalPartido />
        <ModalLiga />
        <ModalAgregarEquipo />
      </div>
    </>
  );
}
