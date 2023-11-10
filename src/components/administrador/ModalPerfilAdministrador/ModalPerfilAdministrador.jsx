import { useEffect, useState, useMemo } from "react";
import "./ModalPerfilAdministrador.scss";
import { useAuthStore } from "hooks";
import { objectToFormData } from "helpers";

export const ModalPerfilAdministrador = () => {
  const { user: administrador, updateAdministradorProfile } = useAuthStore();
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    phone: "",
  });
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);

  const titulo = useMemo(
    () =>
      administrador === null ? "Nuevo administrador" : "Editar administrador",
    [administrador]
  );

  useEffect(() => {
    setFormValues({
      name: administrador.name || "",
      password: administrador.password || "",
      phone: administrador.phone || "",
    });
  }, []);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleOnChangeImage = ({ target }) => {
    setFile(target.files[0]);
    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = objectToFormData(formValues, true);
    if (file) data.append("file", file);
    updateAdministradorProfile(data);
  };

  return (
    <div id="modalAdministrador" className="modal fade" aria-hidden="true">
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
                Nombre del administrador
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre del administrador"
                  value={formValues.name}
                  name="name"
                  onChange={onInputChanged}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="clave" className="form-label">
                Contraseña del administrador
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="text"
                  id="clave"
                  name="password"
                  className="form-control"
                  placeholder="Contraseña del administrador"
                  value={formValues.password}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Numero del administrador
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  placeholder="Numero del administrador"
                  value={formValues.phone}
                  name="phone"
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="clave" className="form-label">
                Logo
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-key"></i>
                </span>

                <input
                  id="file"
                  type="file"
                  name="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleOnChangeImage}
                />
              </div>
            </div>
            {preview && (
              <p>
                <img
                  className="m-auto d-block"
                  width="200px"
                  src={preview}
                  alt="Upload preview"
                />
              </p>
            )}

            <div className="d-grid col-6 mx-auto">
              <button type="submit" className="btn btn-secondary">
                <i className="fa-solid fa-floppy-disk"></i> Guardar
                administrador
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
