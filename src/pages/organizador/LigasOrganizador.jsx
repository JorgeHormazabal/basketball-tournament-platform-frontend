import { Spinner } from "components";
import CardLiga from "components/organizador/CardLiga/CardLiga";
import {
  useLigaStore,
  useEquipoStore,
  useCleanStore,
  usePartidoStore,
} from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BotonAgregar } from "components";
import { ModalLiga } from "components/organizador/ModalLiga/ModalLiga";
import ReactPaginate from 'react-paginate';

export default function LigasOrganizador() {
  const { cargarLigasDelOrganizador, ligas, setLigaActiva } = useLigaStore();
  const { limpiarStores } = useCleanStore();
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(ligas.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    cargarLigasDelOrganizador();
  }, []);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const ligasPaginadas = ligas.slice(startIndex, endIndex);

  const editarLiga = (liga) => {
    setLigaActiva(liga);
    navigate("/organizador/liga");
  };

  const abrirModal = () => {
    setLigaActiva(null);
  };

  useEffect(() => {
    limpiarStores();
    cargarLigasDelOrganizador();
  }, []);

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
          {ligas.length > 0 ? (
            <>
              <div className="d-flex flex-wrap">
                {ligasPaginadas.map((liga) => (
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
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <ModalLiga />
    </div>
  );
}
