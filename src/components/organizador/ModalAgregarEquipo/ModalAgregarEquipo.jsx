import { useEquipoStore, useLigaStore} from "hooks";
import { useEffect} from "react";

export function ModalAgregarEquipo() {
    const { ligaActiva } = useLigaStore();
    const {equipos, cargarEquiposFueraDeLiga} = useEquipoStore();

    useEffect(() => {
        cargarEquiposFueraDeLiga(ligaActiva.id);
      });
    

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
                  <label htmlFor="winnerId" className="form-label">
                    Ganador
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-trophy"></i>
                    </span>
                    <select
                      id="winnerId"
                      name="winnerId"
                      className="form-control"
                      value
                      onChange
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
              <button type="submit" className="btn btn-secondary">
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
