import { useEffect } from "react";
import { useState } from "react";
import { useClubStore } from "../../hooks";
import { useMemo } from "react";

export const ModalClubes = () => {
  const newClub = {
    id: "",
    name: "",
    email: "",
    password: "",
  };
  const { activeEvent, startSavingEvent } = useClubStore();
  const [formValues, setFormValues] = useState(newClub);

  const titulo = useMemo(
    () => (activeEvent === null ? "Nuevo Club" : "Editar Club"),
    [activeEvent]
  );

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    } else {
      setFormValues(newClub);
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await startSavingEvent(formValues);
  };

  return (
    <div id="modalClubes" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#EC661B", color: "#000" }}
          >
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
              <label htmlFor="nombre" className="form-label">
                Nombre del club
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre del club"
                  value={formValues.name}
                  name="name" // Corrected name attribute
                  onChange={onInputChanged}
                />
              </div>
            </div>
            {!formValues.id && ( // Check if formValues.id is falsy
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo del club
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    id="correo"
                    name="email" // Corrected name attribute
                    className="form-control"
                    placeholder="Correo del club"
                    value={formValues.email}
                    onChange={onInputChanged}
                  />
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="clave" className="form-label">
                Contraseña del club
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="text"
                  id="clave"
                  name="password" // Corrected name attribute
                  className="form-control"
                  placeholder="Contraseña del club"
                  value={formValues.password}
                  onChange={onInputChanged}
                />
              </div>
            </div>

            <div className="d-grid col-6 mx-auto">
              <button type="submit" className="btn btn-success">
                <i className="fa-solid fa-floppy-disk"></i> Guardar Club
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
