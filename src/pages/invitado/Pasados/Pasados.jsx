import { usePartidoStore } from "hooks";
import { useEffect, useState } from "react";
import { imagePath, formatDateTime } from "helpers";
import ReactPaginate from 'react-paginate';

export function TablaPasados({ encuentros, limit, mostrarPaginacion = true }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const encuentrosPasados = encuentros.filter((encuentro) => {
    const encuentroFecha = new Date(encuentro.dateTime).getTime();
    const fechaActual = new Date().getTime();
    return encuentroFecha < fechaActual;
  });

  const encuentrosOrdenados = encuentrosPasados.sort((a, b) => {
    const fechaA = new Date(a.dateTime).getTime();
    const fechaB = new Date(b.dateTime).getTime();
    return fechaB - fechaA;
  });

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const ultimosEncuentros = limit
    ? encuentrosOrdenados.slice(0, limit)
    : encuentrosOrdenados.slice(startIndex, endIndex);

  const pageCount = Math.ceil(encuentrosOrdenados.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>&nbsp;Liga</th>
            <th className="text-start">Local</th>
            <th className="text-center">Resultado</th>
            <th className="text-end">Visita</th>
            <th>Lugar</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ultimosEncuentros.map((encuentro) => (
            <tr key={encuentro.id}>
              <td className="text-start">{encuentro.league.name}</td>
              <td className="text-end">
                {" "}
                {encuentro.home.club.name} &nbsp;{" "}
                <img
                  src={
                    encuentro.home.club.image
                      ? imagePath(encuentro.home.club.image)
                      : "/img/default_club.png"
                  }
                />
              </td>
              <td className="text-center">
                {encuentro.homePoints} - {encuentro.awayPoints}
              </td>
              <td className="text-start">
                {" "}
                <img
                  src={
                    encuentro.away.club.image
                      ? imagePath(encuentro.away.club.image)
                      : "/img/default_club.png"
                  }
                />
                &nbsp;{encuentro.away.club.name}
              </td>
              <td className="text-start">{encuentro.place}</td>
              <td className="text-start">{formatDateTime(encuentro.dateTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarPaginacion && (
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
  );
}

export function Pasados() {
  const { partidos, cargarPartidos } = usePartidoStore();

  useEffect(() => {
    cargarPartidos();
  }, [cargarPartidos]);

  return (
    <div className="PartidosPasadosAPP">
      <div className="titulos">
        <h1>Partidos Pasados</h1>
      </div>
      <div className="contenedorDeLiga">
        <TablaPasados encuentros={partidos} />
      </div>
    </div>
  );
}
