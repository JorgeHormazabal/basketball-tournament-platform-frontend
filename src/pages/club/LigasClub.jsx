import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import "../Dashboard.scss";
import Spinner from "components/Spinner/Spinner";
import { ModalEquipo } from "components/club/ModalEquipo/ModalEquipo";
import EstadisticaLigaTab from "components/club/EstadisticaLigaTab/EstadisticaLigaTab";
import {
  useEquipoStore,
  useEstadisticaLigaEquipoStore,
  usePartidoStore,
} from "hooks";

export function LigasClub() {
  const { cargarEquiposYPartidosDelClub, isLoading } = useEquipoStore();
  const [equipos, setEquipos] = useState(null);
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    cargarEquiposYPartidosDelClub().then((data) => setEquipos(data));
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const equiposPaginados = equipos ? equipos.slice(startIndex, endIndex) : null;

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <h1>Ligas </h1>
        <div className="mt-5">
          {equiposPaginados ? (
            equiposPaginados.map((equipo) => (
              <EstadisticaLigaTab
                key={equipo.id}
                teamLeagueParticipations={equipo.teamLeagueParticipations}
                division={equipo.division}
                coach={equipo.coach}
              />
            ))
          ) : (
            <Spinner />
          )}
          {equipos && equipos.length > itemsPerPage && (
            <ReactPaginate
              pageCount={Math.ceil(equipos.length / itemsPerPage)}
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
      <ModalEquipo />
    </div>
  );
}
