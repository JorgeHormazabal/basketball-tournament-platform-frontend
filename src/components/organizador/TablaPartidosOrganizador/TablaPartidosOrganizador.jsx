import { useState } from "react";
import { formatDateTime } from "helpers";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";

export default function TablaPartidosOrganizador({
  partidos,
  editar,
  borrar,
  modalId,
}) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(partidos.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedPartidos = partidos.slice(startIndex, endIndex);

  return (
    <div>
      <div className="table-responsive py-3">
        <table className="table table-sm">
          <thead className="table-light">
            <tr>
              <th scope="col" className="text-center">
                Iniciar
              </th>
              <th scope="col" className="text-center">
                Fecha
              </th>
              <th scope="col">Lugar</th>
              <th scope="col">Local</th>
              <th scope="col">Visitante</th>
              <th scope="col">PuntosLocal</th>
              <th scope="col">PuntosVisita</th>
              <th className="text-center" scope="col">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedPartidos.map((objeto, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate(`/panel/${objeto.id}`)}
                  >
                    <i className="fa-solid fa-play"></i>
                  </button>
                </td>
                <td className="text-start align-middle">
                  {formatDateTime(objeto.dateTime)}
                </td>
                <td className="text-start align-middle">{objeto.place}</td>
                <td className="text-start align-middle">
                  {objeto.home.club.name}
                </td>
                <td className="text-start align-middle">
                  {objeto.away.club.name}
                </td>
                <td className="text-center align-middle">
                  {objeto.homePoints}
                </td>
                <td className="text-center align-middle">
                  {objeto.awayPoints}
                </td>
                <td className="align-items-center justify-content-center">
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-secondary"
                      data-bs-toggle="modal"
                      data-bs-target={`#${modalId}`}
                      onClick={() => editar(objeto)}
                    >
                      <i className="fa-solid fa-edit"></i> Editar
                    </button>
                    <button
                      onClick={() => borrar(objeto)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i> Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
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
  );
}
