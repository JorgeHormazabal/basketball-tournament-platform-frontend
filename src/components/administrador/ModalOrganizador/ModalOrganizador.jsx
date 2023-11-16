import { useEffect, useState, useMemo } from "react";
import { useOrganizadorStore } from "hooks/useOrganizadorStore";
import "./ModalOrganizador.scss";
import { imagePath, objectToFormData } from "helpers";

const organizadorVacio = {
  id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  image: "",
};

export const ModalOrganizador = () => {
  const { organizadorActivo, guardarOganizador } = useOrganizadorStore();
  const [formValues, setFormValues] = useState(organizadorVacio);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);

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
    await guardarOganizador(formValues, file);
  };

  const onClose = () => {
    setFile("");
    setPreview(null);
    setFormValues(organizadorVacio);
    document.getElementById("file").value = "";
  };

  const handleOnChangeImage = ({ target }) => {
    setFile(target.files[0]);
    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
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
              onClick={onClose}
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
                  name="name"
                  onChange={onInputChanged}
                />
              </div>
            </div>
            {!formValues.id && (
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
                    name="email"
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
                Contraseña del organizador
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
                  placeholder="Contraseña del organizador"
                  value={formValues.password}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Celular del organizador
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Celular del organizador"
                  value={formValues.phone}
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
                  <i className="fa-solid fa-image"></i>
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
            {preview ? (
              <p>
                <img
                  className="m-auto d-block"
                  width="200px"
                  src={preview}
                  alt="Upload preview"
                />
              </p>
            ) : (
              <p>
                <img
                  className="m-auto d-block"
                  width="200px"
                  src={
                    imagePath(organizadorActivo?.image) ||
                    "img/default_club.png"
                  }
                  alt="Upload preview"
                />
              </p>
            )}

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
