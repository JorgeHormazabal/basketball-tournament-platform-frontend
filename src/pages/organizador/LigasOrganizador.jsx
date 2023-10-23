import { Spinner } from "components";
import CardLiga from "components/organizador/CardLiga/CardLiga";
import { useEstadisticaLigaEquipoStore, useLigaStore } from "hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LigasOrganizador() {
  const { cargarLigasDelOrganizador, ligas, setLigaActiva } = useLigaStore();
  const navigate = useNavigate();

  const editarLiga = (liga) => {
    setLigaActiva(liga);
    navigate("/organizador/liga");
  };

  useEffect(() => {
    cargarLigasDelOrganizador();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <h1>Ligas </h1>
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
    </div>
  );
}
