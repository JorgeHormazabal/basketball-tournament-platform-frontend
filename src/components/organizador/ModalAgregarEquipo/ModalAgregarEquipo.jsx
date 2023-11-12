import {
  useEquipoStore,
  useLigaStore,
  useEstadisticaLigaEquipoStore,
} from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ModalAgregarEquipo() {
  const { ligaActiva } = useLigaStore();
  const { cargarEquiposFueraDeLiga } = useEquipoStore();
  const { agregarEquipoALiga } = useEstadisticaLigaEquipoStore();
  const [equipos, setEquipos] = useState([]);
  const [equipoId, setEquipoId] = useState("");

  const onInputChanged = (event) => {
    setEquipoId(event.target.value);
  };

  const onClose = (nuevoPartidoVacio) => {
    setEquipoId("");
  };

  useEffect(() => {
    cargarEquiposFueraDeLiga(ligaActiva.id).then((data) => setEquipos(data));
  }, [ligaActiva]);

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
              onClick={onClose}
            ></button>
          </div>
          <form className="modal-body">
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
                  {equipos?.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.club.name} - {equipo?.division?.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-grid col-6 mx-auto">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={async () => {
                  console.log(equipos);
                  await agregarEquipoALiga(ligaActiva.id, equipoId);
                  cargarEquiposFueraDeLiga(ligaActiva.id).then((data) =>
                    setEquipos(data)
                  );
                }}
              >
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
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
