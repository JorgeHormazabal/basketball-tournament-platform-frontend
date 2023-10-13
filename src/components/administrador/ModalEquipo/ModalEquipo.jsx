import { useEffect, useState, useMemo } from "react";
import { useClubStore, useDivisionStore } from "hooks";
import "./ModalEquipo.scss";
import { useEquipoStore } from "hooks/useEquipoStore";

const equipoVacio = {
  id: "",
  coach: "",
  clubId: 0,
  divisionId: 0,
};

export const ModalEquipo = () => {
  const { equipoActivo, guardarEquipo } = useEquipoStore();
  const { cargarDivisiones, divisiones } = useDivisionStore();
  const { cargarClubes, clubes } = useClubStore();
  const [formValues, setFormValues] = useState(equipoVacio);

  const titulo = useMemo(
    () => (equipoActivo === null ? "Nuevo equipo" : "Editar equipo"),
    [equipoActivo]
  );

  useEffect(() => {
    cargarDivisiones();
    cargarClubes();
    if (equipoActivo !== null) {
      setFormValues({
        ...equipoActivo,
        clubId: equipoActivo.club.id,
        divisionId: equipoActivo.division.id,
      });
    } else {
      setFormValues(equipoVacio);
    }
  }, [equipoActivo]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await guardarEquipo(formValues);
  };

  return (
    <div id="modalEquipo" className="modal fade" aria-hidden="true">
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
            <div className="mb-3">
              <label htmlFor="coach" className="form-label">
                Nombre del entrenador
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="text"
                  id="coach"
                  name="coach" // Corrected name attribute
                  className="form-control"
                  placeholder="Jose Tapia"
                  value={formValues.coach}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="division" className="form-label">
                Division
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <select
                  id="division"
                  name="divisionId"
                  className="form-control"
                  value={formValues.divisionId}
                  onChange={onInputChanged}
                >
                  <option value="">Seleccionar Division</option>
                  {divisiones.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {!formValues.id && ( // Check if formValues.id is falsy
              <>
                <div className="mb-3">
                  <label htmlFor="club" className="form-label">
                    Club
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <select
                      id="club"
                      name="clubId"
                      className="form-control"
                      value={formValues.clubId}
                      onChange={onInputChanged}
                    >
                      <option value="">Seleccionar Club</option>
                      {clubes.map((club) => (
                        <option key={club.id} value={club.id}>
                          {club.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

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
