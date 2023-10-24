import {
  useEstadisticaLigaEquipoStore,
  useLigaStore,
  usePartidoStore,
  useEquipoStore,
} from "hooks";
import "../Dashboard.scss";
import { useEffect } from "react";
import TablaPartidosOrganizador from "components/organizador/TablaPartidosOrganizador/TablaPartidosOrganizador";
import { BotonAgregar, Spinner } from "components";
import { ModalPartido } from "components/organizador/ModalPartido/ModalPartido";
import "./organizador.css";
import { useNavigate } from "react-router";
import { ModalLiga } from "components/organizador/ModalLiga/ModalLiga";
import { TablaPosiciones } from "components/organizador/TablaPosiciones/TablaPosiciones";
import { formatDate } from "helpers";
import { ModalAgregarEquipo } from "components/organizador/ModalAgregarEquipo/ModalAgregarEquipo";

export default function EditarLigaOrganizador() {
  const { ligaActiva, setLigaActiva, borrarLiga } = useLigaStore();
  const { partidos, cargarPartidosDeLaLiga, setPartidoActivo, borrarPartido } =
    usePartidoStore();
  const { estadisticasLigaEquipo, cargarEstadisticasDeLiga } =
    useEstadisticaLigaEquipoStore();
  const navigate = useNavigate();
    const { equipos, cargarEquiposFueraDeLiga } = useEquipoStore();
    const navigate = useNavigate();

  useEffect(() => {}, [ligaActiva]);

  const borrar = (jugador) => {
    setPartidoActivo(jugador);
    borrarPartido(jugador);
  };
  const borrarEstaLiga = (ligaActiva) => {
    setLigaActiva(ligaActiva);
    borrarLiga(ligaActiva);
    navigate("/organizador/ligas");
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

  useEffect(() => {
    cargarPartidosDeLaLiga(ligaActiva.id);
    cargarEstadisticasDeLiga(ligaActiva.id);
    cargarEquiposFueraDeLiga(ligaActiva.id)
  });

  return (
    <div className="dashboard-page">
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
                          {ligaActiva.winner.name
                            ? ligaActiva.winner.name
                            : "Sin ganador"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="heading d-block">Reglas</span>
                        <span className="subheadings">{ligaActiva.rules}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="heading d-block">Fecha de inicio</span>
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
          <h3 className="m-0">Tabla de puntuaciones</h3>
          {partidos.length > 0 ? (
            <TablaPosiciones equipos={estadisticasLigaEquipo} />
          ) : (
            <Spinner />
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
          {partidos.length > 0 ? (
            <TablaPartidosOrganizador
              partidos={partidos}
              editar={editarModal}
              borrar={borrar}
              modalId="modalPartido"
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <ModalPartido />
      <ModalLiga />
      <ModalAgregarEquipo/>
    </div>
  );
}
