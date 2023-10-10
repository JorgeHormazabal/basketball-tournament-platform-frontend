import { useEffect, useState, useMemo } from "react";
import { useDivisionStore } from "hooks/useDivisionStore";
import "./ModalDivision.scss";

const divisionVacio = {
  id: "",
  category: "",
};

export const ModalDivision = () => {
  const { divisionActiva, guardarDivision } = useDivisionStore();
  const [formValues, setFormValues] = useState(divisionVacio);

  const titulo = useMemo(
    () => (divisionActiva === null ? "Nuevo division" : "Editar division"),
    [divisionActiva]
  );

  useEffect(() => {
    if (divisionActiva !== null) {
      setFormValues({ ...divisionActiva });
    } else {
      setFormValues(divisionVacio);
    }
  }, [divisionActiva]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await guardarDivision(formValues);
  };

  return (
    <div id="modalDivision" className="modal fade" aria-hidden="true">
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
              <label htmlFor="categoria" className="form-label">
                Categoria
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="categoria"
                  className="form-control"
                  placeholder="Categoria"
                  value={formValues.category}
                  name="category" // Corrected name attribute
                  onChange={onInputChanged}
                />
              </div>
            </div>

            <div className="d-grid col-6 mx-auto">
              <button type="submit" className="btn btn-secondary">
                <i className="fa-solid fa-floppy-disk"></i> Guardar division
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
