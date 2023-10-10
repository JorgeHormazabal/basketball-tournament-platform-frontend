import { useEffect, useState, useMemo } from "react";
import { useJugadorStore } from "hooks";
import "./ModalJugador.scss";
import { useEquipoStore } from "hooks/useEquipoStore";

const jugadorVacio = {
  id: "",
  rut: "",
  name: "",
  birthdate: "",
  teamId: 0,
};

export const ModalJugador = () => {
  const { jugadorActivo, guardarJugador } = useJugadorStore();
  const { equipos, cargarEquipos } = useEquipoStore();
  const [formValues, setFormValues] = useState(jugadorVacio);

  const titulo = useMemo(
    () => (jugadorActivo === null ? "Nuevo jugador" : "Editar jugador"),
    [jugadorActivo]
  );

  useEffect(() => {
    cargarEquipos();
    if (jugadorActivo !== null) {
      setFormValues({ ...jugadorActivo, teamId: jugadorActivo.team.id });
    } else {
      setFormValues(jugadorVacio);
    }
  }, [jugadorActivo]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await guardarJugador(formValues);
  };

  return (
    <div id="modalJugador" className="modal fade" aria-hidden="true">
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
            {!formValues.id && ( // Check if formValues.id is falsy
              <>
                <div className="mb-3">
                  <label htmlFor="rut" className="form-label">
                    Rut del jugador
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      id="rut"
                      name="rut" // Corrected name attribute
                      className="form-control"
                      placeholder="21369852-1"
                      value={formValues.rut}
                      onChange={onInputChanged}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre del jugador
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      id="nombre"
                      name="name" // Corrected name attribute
                      className="form-control"
                      placeholder="Ana López Gómez"
                      value={formValues.name}
                      onChange={onInputChanged}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de nacimiento de la jugadora
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      id="fechaNacimiento"
                      name="birthdate" // Corrected name attribute
                      className="form-control"
                      placeholder="1999-03-25"
                      value={formValues.birthdate}
                      onChange={onInputChanged}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-3">
              <label htmlFor="equipo" className="form-label">
                Equipo
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <select
                  id="equipo"
                  name="teamId"
                  className="form-control"
                  value={formValues.teamId}
                  onChange={onInputChanged}
                >
                  <option value="">Seleccionar Equipo</option>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.displayClub} - {equipo.displayDivision}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-grid col-6 mx-auto">
              <button type="submit" className="btn btn-secondary">
                <i className="fa-solid fa-floppy-disk"></i> Guardar jugadora
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
