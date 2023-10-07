//rnf
import { useEffect } from "react";
import { useState } from "react";

export const ModalClubes = ({ titulo, club, validar }) => {
  const [formClub, setFormClub] = useState({ ...club });
  console.log(titulo);
  useEffect(() => {
    setFormClub({ ...club });
  }, [club]);
  const actualizarClub = (campo, valor) => {
    setFormClub({ ...formClub, [campo]: valor });
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
          <div className="modal-body">
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
                  value={formClub.nombre}
                  onChange={(e) => actualizarClub("nombre", e.target.value)}
                />
              </div>
            </div>
            {!club.id && (
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
                    className="form-control"
                    placeholder="Correo del club"
                    value={formClub.correo}
                    onChange={(e) => actualizarClub("correo", e.target.value)}
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
                  className="form-control"
                  placeholder="Contraseña del club"
                  value={formClub.clave}
                  onChange={(e) => actualizarClub("clave", e.target.value)}
                />
              </div>
            </div>

            <div className="d-grid col-6 mx-auto">
              <button
                className="btn btn-success"
                onClick={() => validar(formClub)}
              >
                <i className="fa-solid fa-floppy-disk"></i> Guardar Club
              </button>
            </div>
          </div>
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
