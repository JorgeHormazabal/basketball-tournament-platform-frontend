import { useEffect, useState, useMemo } from "react";
import { useOrganizadorStore } from "hooks/useOrganizadorStore";
import "./ModalOrganizador.scss";

const organizadorVacio = {
  id: "",
  name: "",
  email: "",
  password: "",
};

export const ModalOrganizador = () => {
  const { organizadorActivo, guardarOganizador } = useOrganizadorStore();
  const [formValues, setFormValues] = useState(organizadorVacio);

  const titulo = useMemo(
    () =>
      organizadorActivo === null ? "Nuevo organizador" : "Editar organizador",
    [organizadorActivo]
  );

  useEffect(() => {
    if (organizadorActivo !== null) {
      setFormValues({ ...organizadorActivo });
    } else {
      setFormValues(organizadorVacio);
    }
  }, [organizadorActivo]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await guardarOganizador(formValues);
  };

  return (
    <div id="modalOrganizador" className="modal fade" aria-hidden="true">
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
              <label htmlFor="nombre" className="form-label">
                Nombre del organizador
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre del organizador"
                  value={formValues.name}
                  name="name" // Corrected name attribute
                  onChange={onInputChanged}
                />
              </div>
            </div>
            {!formValues.id && ( // Check if formValues.id is falsy
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo del organizador
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
                    placeholder="Correo del organizador"
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
              <button type="submit" className="btn btn-secondary">
                <i className="fa-solid fa-floppy-disk"></i> Guardar organizador
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
