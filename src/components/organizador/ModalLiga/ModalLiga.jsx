import { useEffect, useState, useMemo } from "react";
import {
  useEquipoStore,
  useEstadisticaLigaEquipoStore,
  useLigaStore,
} from "hooks";
import "./ModalLiga.scss";

const nuevaLigaVacia = {
  id: "",
  name: "",
  rules: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const ModalLiga = () => {
  const { ligaActiva, guardarLigaOrganizador } = useLigaStore();
  const [formValues, setFormValues] = useState(nuevaLigaVacia);
  const { equipos, cargarEquiposDeLiga } = useEquipoStore();
  const { estadisticasLigaEquipo } = useEstadisticaLigaEquipoStore();
  const [equiposGanadores, setEquiposGanadores] = useState([]);

  const titulo = useMemo(
    () => (ligaActiva === null ? "Nueva Liga" : "Editar Liga"),
    [ligaActiva]
  );

  useEffect(() => {
    if (estadisticasLigaEquipo) {
      const maxPuntos = Math.max(
        ...estadisticasLigaEquipo.map((obj) => obj.points)
      );
      setEquiposGanadores(
        estadisticasLigaEquipo
          .filter((obj) => obj.points === maxPuntos)
          .map((obj) => obj.id)
      );
    }
    if (ligaActiva !== null) {
      setFormValues({
        id: ligaActiva.id,
        name: ligaActiva.name,
        rules: ligaActiva.rules,
        startDate: ligaActiva.startDate,
        endDate: ligaActiva.endDate,
        winnerId: ligaActiva.winnerId,
      });
      cargarEquiposDeLiga(ligaActiva.id);
    } else {
      setFormValues(nuevaLigaVacia);
    }
  }, [ligaActiva, estadisticasLigaEquipo]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await guardarLigaOrganizador(formValues);
  };

  const onClose = () => {
    !ligaActiva && setFormValues(nuevaLigaVacia);
  };

  return (
    <div id="modalLiga" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
              onClick={onClose}
            ></button>
          </div>
          <form className="modal-body" onSubmit={onSubmit}>
            <input type="hidden" id="id" />
            {!formValues.id ? (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="LigaUno"
                      className="form-control"
                      value={formValues.name}
                      onChange={onInputChanged}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="rules" className="form-label">
                    Reglas
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-book"></i>
                    </span>
                    <input
                      type="text"
                      id="rules"
                      name="rules"
                      placeholder="Normales"
                      className="form-control"
                      value={formValues.rules}
                      onChange={onInputChanged}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="winnerId" className="form-label">
                    Ganador
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-trophy"></i>
                    </span>
                    <select
                      id="winnerId"
                      name="winnerId"
                      className="form-control"
                      value={formValues.winnerId}
                      onChange={onInputChanged}
                    >
                      <option value="">Seleccionar Equipo</option>
                      {equipos.map((equipo) => {
                        return (
                          equiposGanadores.includes(equipo.id) && (
                            <option key={equipo.id} value={equipo.club.id}>
                              {equipo.club.name} - {equipo.id}
                            </option>
                          )
                        );
                      })}
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Fecha de Inicio
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-calendar-days"></i>
                </span>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="form-control"
                  value={formValues.startDate}
                  onChange={onInputChanged}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">
                Fecha de Fin
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-calendar-days"></i>
                </span>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="form-control"
                  value={formValues.endDate}
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
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
