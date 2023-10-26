import { useEquipoStore, useLigaStore, useEstadisticaLigaEquipoStore} from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ModalAgregarEquipo() {
  const { ligaActiva } = useLigaStore();
  const { cargarEquiposFueraDeLiga } = useEquipoStore();
  const { agregarLiga } = useEstadisticaLigaEquipoStore();
  const [equipos, setEquipos] = useState([]);
  const [equipoId, setEquipoId] = useState("");
  

  const onInputChanged = (event) => {
    setEquipoId(event.target.value);
  };

  useEffect(() => {
    cargarEquiposFueraDeLiga(ligaActiva.id).then((data) => setEquipos(data));
  }, [ligaActiva]);
  
  console.log(ligaActiva.id)
  console.log(equipoId)
  
  return (
    <div id="modalAgregarEquipo" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Equipo a la liga</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <form className="modal-body" >
            <input type="hidden" id="id" />
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
                      name="equipo"
                      className="form-control"
                      value={equipoId}
                      onChange={onInputChanged}
                    >
                      <option value="">Seleccionar Equipo</option>
                      {equipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                           {equipo.club.name} - {equipo.id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-grid col-6 mx-auto">
              <button className="btn btn-secondary" type="button" onClick={() => agregarLiga(ligaActiva.id,equipoId)}>
                <i className="fa-solid fa-floppy-disk"></i> Agregar Equipo
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
  )
}
