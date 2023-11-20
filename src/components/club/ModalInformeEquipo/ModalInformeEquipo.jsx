import { useEquipoStore, useJugadorStore } from "hooks";
import { useEffect, useState } from "react";
import { ModalJugador } from "components/club/ModalJugador/ModalJugador";
import { imagePath } from "helpers";
import { backendApi } from "api";

export const ModalInformeEquipo = () => {
  const { equipoActivo } = useEquipoStore();
  const [form, setForm] = useState({ days: 1 });

  const onInputChanged = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  useEffect(() => {}, [equipoActivo]);

  const handleDownload = async () => {
    try {
      const response = await backendApi.get(
        `/player-statistics/export/${equipoActivo.id}/${form.days}`,
        {
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "estadisticas.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div id="modalGenerarExcel" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Generar Excel de Estadísticas</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="days" className="form-label">
                  Periodo de tiempo (en días):
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="days"
                  name="days"
                  placeholder="Ejemplo: 30"
                  value={form.days}
                  onChange={onInputChanged}
                  min="1"
                />
              </div>
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDownload}
                >
                  Descargar Excel
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
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
