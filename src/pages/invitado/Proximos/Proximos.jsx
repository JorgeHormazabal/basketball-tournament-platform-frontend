import "./proximos.css";
import { usePartidoStore } from "hooks";
import { useEffect, useState } from "react";
import { imagePath, formatDateTime } from "helpers";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";

export function CardsProximos({ encuentros, limit, mostrarPaginacion = true }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const encuentrosFuturos = encuentros.filter((encuentro) => {
    const encuentroFecha = new Date(encuentro.dateTime).getTime();
    const fechaAyer = yesterday.getTime();
    return encuentroFecha > fechaAyer;
  });

  const encuentrosOrdenados = encuentrosFuturos.sort((a, b) => {
    const fechaA = new Date(a.dateTime).getTime();
    const fechaB = new Date(b.dateTime).getTime();
    return fechaA - fechaB;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedEncuentros = limit
    ? encuentrosOrdenados.slice(0, limit)
    : encuentrosOrdenados.slice(startIndex, endIndex);

  const pageCount = Math.ceil(encuentrosOrdenados.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div
      className="encuentros-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="encuentros-list">
        {paginatedEncuentros.map((encuentro, index) => (
          <div key={index} className="encuentro-card">
            <div className="equipo-info">
              <img
                src={
                  encuentro.home.club.image
                    ? imagePath(encuentro.home.club.image)
                    : "img/default_club.png"
                }
                alt={encuentro.home.club.name}
              />
              <h3>{encuentro.home.club.name}</h3>
              <div className="vs">V/S</div>
              <h3>{encuentro.away.club.name}</h3>
              <img
                src={
                  encuentro.away.club.image
                    ? imagePath(encuentro.away.club.image)
                    : "img/default_club.png"
                }
              />
            </div>
            <div className="fila2">
              <span>{encuentro.league.name}</span>&emsp;-&emsp;
              <span>{encuentro.place}</span>&emsp;-&emsp;
              <span>{formatDateTime(encuentro.dateTime)}</span>
            </div>
            <div className="fila3 mt-3">
              <button
                className="btn btn-success"
                onClick={() => navigate(`/tablero/${encuentro.id}`)}
              >
                Ver Marcador en vivo
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {pageCount > 2 && (
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination justify-content-center mt-3"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        )}
      </div>
    </div>
  );
}

export function Proximos() {
  const { partidos, cargarPartidos } = usePartidoStore();
  useEffect(() => {
    cargarPartidos();
  }, [cargarPartidos]);

  return (
    <div className="ProximosAPP">
      <div className="titulos">
        <h1>Próximos Partidos</h1>
      </div>
      <CardsProximos encuentros={partidos} />
    </div>
  );
}
