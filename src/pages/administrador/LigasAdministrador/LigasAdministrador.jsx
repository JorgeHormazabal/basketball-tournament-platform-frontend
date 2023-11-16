import { Spinner, BotonAgregar } from "components";
import CardLiga from "components/administrador/CardLiga/CardLiga";
import { useLigaStore } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ModalLiga } from "components/administrador/ModalLiga/ModalLiga";
import ReactPaginate from 'react-paginate';

export function LigasAdministrador() {
  const { cargarTodasLasLigas, ligas, setLigaActiva, isLoading } =
    useLigaStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const editarLiga = (liga) => {
    setLigaActiva(liga);
    navigate("/administrador/liga");
  };

  const abrirModal = () => {
    setLigaActiva(null);
  };

  useEffect(() => {
    cargarTodasLasLigas();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageCount = Math.ceil(ligas.length / itemsPerPage);

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h1 className="m-0">Ligas</h1>
          <BotonAgregar
            modalId="modalLiga"
            abrir={abrirModal}
            boton=" Crear Liga"
          />
        </div>
        <div className="mt-5">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="d-flex flex-wrap">
                {ligas.slice(startIndex, endIndex).map((liga) => (
                  <div key={liga.id} className="col-md-4 mb-4">
                  <CardLiga key={liga.id} liga={liga} editar={editarLiga} />
                  </div>
                ))}
              </div>
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
            </>
          )}
        </div>
      </div>
      <ModalLiga />
    </div>
  );
}
