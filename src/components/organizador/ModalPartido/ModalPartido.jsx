import { useEffect, useState, useMemo } from "react";
import { useJugadorStore, useLigaStore, usePartidoStore } from "hooks";
import "./ModalJugador.scss";
import { useEquipoStore } from "hooks/useEquipoStore";

const nuevoPartidoVacio = {
  id: "",
  dateTime: new Date(),
  leagueId: "",
  place: "",
  homeId: "",
  awayId: "",
};

export const ModalPartido = () => {
  const { partidoActivo, guardarPartido } = usePartidoStore();
  const { ligaActiva } = useLigaStore();
  const { equipos, cargarEquiposDeLiga } = useEquipoStore();
  const [formValues, setFormValues] = useState(nuevoPartidoVacio);

  const titulo = useMemo(
    () => (partidoActivo === null ? "Nuevo Partido" : "Editar Partido"),
    [partidoActivo]
  );

  useEffect(() => {
    cargarEquiposDeLiga(ligaActiva.id);
    console.log(partidoActivo?.dateTime);
    if (partidoActivo !== null) {
      setFormValues({
        id: partidoActivo.id,
        dateTime: partidoActivo.dateTime.slice(0, -8),
        place: partidoActivo.place,
        homePoints: partidoActivo.homePoints,
        awayPoints: partidoActivo.awayPoints,
      });
    } else {
      setFormValues({ ...nuevoPartidoVacio, leagueId: ligaActiva.id });
    }
  }, [partidoActivo]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await guardarPartido(formValues);
  };

  return (
    <div id="modalPartido" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <form className="modal-body" onSubmit={onSubmit}>
            <input type="hidden" id="id" />
            {!formValues.id ? (
              <>
                <div className="mb-3">
                  <label htmlFor="homeId" className="form-label">
                    Equipo Local
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <select
                      id="homeId"
                      name="homeId"
                      className="form-control"
                      value={formValues.homeId}
                      onChange={onInputChanged}
                    >
                      <option value="">Seleccionar Club</option>
                      {equipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                          {equipo.club.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="awayId" className="form-label">
                    Equipo Visitante
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <select
                      id="awayId"
                      name="awayId"
                      className="form-control"
                      value={formValues.awayId}
                      onChange={onInputChanged}
                    >
                      <option value="">Seleccionar Club</option>
                      {equipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                          {equipo.club.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="homePoints" className="form-label">
                    Puntaje Local
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="number"
                      id="homePoints"
                      name="homePoints"
                      placeholder=""
                      className="form-control"
                      value={formValues.homePoints}
                      onChange={onInputChanged}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="awayPoints" className="form-label">
                    Puntaje Visita
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="number"
                      id="awayPoints"
                      name="awayPoints"
                      placeholder=""
                      className="form-control"
                      value={formValues.awayPoints}
                      onChange={onInputChanged}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="fechaHora" className="form-label">
                Fecha y hora del partido
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-calendar-days"></i>
                </span>
                <input
                  type="datetime-local"
                  id="fechaHora"
                  name="dateTime"
                  className="form-control"
                  value={formValues.dateTime}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="place" className="form-label">
                Lugar
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-map-pin"></i>
                </span>
                <input
                  type="text"
                  id="place"
                  name="place"
                  placeholder=""
                  className="form-control"
                  value={formValues.place}
                  onChange={onInputChanged}
                />
              </div>
            </div>

            <div className="d-grid col-6 mx-auto">
              <button type="submit" className="btn btn-secondary">
                <i className="fa-solid fa-floppy-disk"></i> Guardar partido
              </button>
            </div>
          </form>
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
