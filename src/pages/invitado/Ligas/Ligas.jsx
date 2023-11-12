import "./ligas.css";
import { useLigaStore, useEstadisticaLigaEquipoStore } from "hooks";
import { useEffect, useState } from "react";
import { TablaPosiciones } from "components/organizador/TablaPosiciones/TablaPosiciones";
import ReactPaginate from 'react-paginate';

export function Ligas() {
  const { cargarTodasLasLigas, ligas } = useLigaStore();
  const { estadisticasLigaEquipo, cargarTodasLasEstadisticasDeLiga, limpiarEstadisticasDeLiga } = useEstadisticaLigaEquipoStore();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    cargarTodasLasLigas();
  }, []);

  useEffect(() => {
    if (ligas.length > 0) {
      cargarTodasLasEstadisticasDeLiga(ligas);
    }
  }, [ligas, cargarTodasLasEstadisticasDeLiga, limpiarEstadisticasDeLiga]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageCount = Math.ceil(ligas.length / itemsPerPage);

  const filtrarEstadisticasPorLiga = (ligaId) => {
    return estadisticasLigaEquipo.filter(equipo => equipo.ligaId === ligaId);
  };

  return (
    <div className="LigasAPP">
      <div className="titulos">
        <h1>Tablas de posiciones</h1>
      </div>
      <div className="contenedorDeLiga">
        {ligas.slice(startIndex, endIndex).map((liga, index) => (
          <div key={index}>
            <h2>{liga.name}</h2>
            <TablaPosiciones equipos={filtrarEstadisticasPorLiga(liga.id)} />
          </div>
        ))}
        {pageCount > 1 && (
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={'pagination justify-content-center mt-3'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
          />
        )}
      </div>
    </div>
  );
}
