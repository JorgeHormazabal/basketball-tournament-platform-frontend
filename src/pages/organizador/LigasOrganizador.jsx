import { Spinner } from "components";
import CardLiga from "components/organizador/CardLiga/CardLiga";
import { useLigaStore } from "hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { BotonAgregar } from "components";
import { ModalLiga } from "components/organizador/ModalLiga/ModalLiga";

export default function LigasOrganizador() {
  const { cargarLigasDelOrganizador, ligas, setLigaActiva } = useLigaStore();
  const navigate = useNavigate();

  const editarLiga = (liga) => {
    setLigaActiva(liga);
    navigate("/organizador/liga");
  };

  const abrirModal = () => {
    setLigaActiva(null);
  };

  useEffect(() => {
    cargarLigasDelOrganizador();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1 className="m-0">Ligas</h1>
            <BotonAgregar modalId="modalLiga" abrir={abrirModal} boton=" Crear Liga"/>
          </div>
        <div className="mt-5">
          {ligas.length > 0 ? (
            <div className="d-flex flex-wrap">
              {ligas.map((liga) => (
                <CardLiga key={liga.id} liga={liga} editar={editarLiga} />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <ModalLiga/>
    </div>
  );
}
