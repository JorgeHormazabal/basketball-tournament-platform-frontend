import { useEffect, useState, useMemo } from "react";
import { useJugadorStore } from "hooks";
import "./ModalJugador.scss";
import { useEquipoStore } from "hooks/useEquipoStore";
import { objectToFormData } from "helpers";

const jugadorVacio = {
  id: "",
  rut: "",
  name: "",
  birthdate: new Date(),
  teamId: "0",
  phone: "",
  email: "",
  emergencyName: "",
  emergencyPhone: "",
  height: "",
  weight: "",
  position: "",
  shirtNumber: "",
  shirtSize: "",
  shortsSize: "",
  shoeSize: "",
  clinicalDetail: "",
};

export const ModalJugador = () => {
  const { jugadorActivo, guardarJugador, setJugadorActivo } = useJugadorStore();
  const { equipos, cargarEquiposDelClub } = useEquipoStore();
  const [formValues, setFormValues] = useState(jugadorVacio);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);

  const titulo = useMemo(
    () => (jugadorActivo === null ? "Nuevo jugador" : "Editar jugador"),
    [jugadorActivo]
  );

  useEffect(() => {
    cargarEquiposDelClub();
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
    const {
      rut,
      name,
      birthdate,
      displayDivision,
      displayTeam,
      team,
      displayBirthdate,
      ...restoJugador
    } = formValues;
    const data = objectToFormData(jugadorActivo ? restoJugador : formValues);
    if (file) data.append("file", file);
    await guardarJugador(data);
  };

  const onClose = () => {
    setFile("");
    setPreview(null);
    setFormValues(jugadorVacio);
    document.getElementById("file").value = "";
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
              onClick={onClose}
            ></button>
          </div>
          <form className="modal-body" onSubmit={onSubmit}>
            <input type="hidden" id="id" />
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
            {!formValues.id && (
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
                      name="rut"
                      className="form-control"
                      placeholder="21.369.852-1"
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
                      name="name"
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
                      type="date"
                      id="fechaNacimiento"
                      name="birthdate"
                      className="form-control"
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
                      {equipo.division.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="997475479"
                  className="form-control"
                  value={formValues.phone}
                  onChange={onInputChanged}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="contacto@gmail.com"
                  className="form-control"
                  value={formValues.email}
                  onChange={onInputChanged}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="emergencyName" className="form-label">
                Nombre de Contacto de Emergencia
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="emergencyName"
                  name="emergencyName"
                  placeholder="Fabiola Perez (Mamá)"
                  className="form-control"
                  value={formValues.emergencyName}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="emergencyPhone" className="form-label">
                Teléfono de Contacto de Emergencia
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="text"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  placeholder="997475479"
                  className="form-control"
                  value={formValues.emergencyPhone}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="height" className="form-label">
                Altura (cm)
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-ruler"></i>
                </span>
                <input
                  type="number"
                  id="height"
                  name="height"
                  className="form-control"
                  value={formValues.height}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Peso (kg)
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-balance-scale"></i>
                </span>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className="form-control"
                  value={formValues.weight}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Posición
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-chess-king"></i>
                </span>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Alero"
                  className="form-control"
                  value={formValues.position}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="shirtNumber" className="form-label">
                Número de Camiseta
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-tshirt"></i>
                </span>
                <input
                  type="number"
                  id="shirtNumber"
                  name="shirtNumber"
                  placeholder="10"
                  className="form-control"
                  value={formValues.shirtNumber}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="shirtSize" className="form-label">
                Talla de Camiseta
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-tshirt"></i>
                </span>
                <input
                  type="text"
                  id="shirtSize"
                  name="shirtSize"
                  placeholder="L"
                  className="form-control"
                  value={formValues.shirtSize}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="shortsSize" className="form-label">
                Talla de Shorts
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-tshirt"></i>
                </span>
                <input
                  type="text"
                  id="shortsSize"
                  name="shortsSize"
                  className="form-control"
                  placeholder="M"
                  value={formValues.shortsSize}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="shoeSize" className="form-label">
                Talla de Zapatos
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-shoe-prints"></i>
                </span>
                <input
                  type="text"
                  id="shoeSize"
                  name="shoeSize"
                  placeholder="40"
                  className="form-control"
                  value={formValues.shoeSize}
                  onChange={onInputChanged}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="clinicalDetail" className="form-label">
                Detalles Clínicos
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-notes-medical"></i>
                </span>
                <textarea
                  id="clinicalDetail"
                  name="clinicalDetail"
                  className="form-control"
                  placeholder="Asmatica, lesión en la rodilla"
                  value={formValues.clinicalDetail}
                  onChange={onInputChanged}
                ></textarea>
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
