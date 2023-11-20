import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { MagicMotion } from "react-magic-motion";

export default function Tabla({
  cabeceras,
  filas,
  data,
  editar,
  borrar,
  modalId,
  modalId2,
  modalIdEstadistica,
  modalIdInformeEquipo,
  mostrarJugador,
  mostrarEditar = true,
  mostrarEstadistica,
  mostrarDetalles = false,
  mostrarInformeEquipo,
  elementosPorPagina = 12,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(data.length / elementosPorPagina);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * elementosPorPagina;
  const endIndex = startIndex + elementosPorPagina;

  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="table-responsive">
          <table className="table table-sm">
            <thead className="table-light">
              <tr>
                <th className="text-end" scope="col">
                  #
                </th>
                {cabeceras.map((cabecera) => (
                  <th scope="col" key={cabecera}>
                    {cabecera}
                  </th>
                ))}
                <th scope="col" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((objeto, index) => (
                <tr key={startIndex + index}>
                  <th className="pt-2 text-end" scope="row">
                    {startIndex + index + 1}
                  </th>
                  {filas.map((propiedad) => (
                    <td key={propiedad} className="pt-2 text-start">
                      {propiedad === "password"
                        ? "* * * * * * * *"
                        : objeto[propiedad]}
                    </td>
                  ))}
                  <td className="align-items-center justify-content-center">
                    <div className="btn-group" role="group">
                      {mostrarDetalles && (
                        <button
                          className="btn btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalId2}`}
                          onClick={() => mostrarJugador(objeto)}
                        >
                          <i className="fa-solid fa-eye"></i> Ver más
                        </button>
                      )}
                      {mostrarEditar && (
                        <button
                          className="btn btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalId}`}
                          onClick={() => editar(objeto)}
                        >
                          <i className="fa-solid fa-edit"></i> Editar
                        </button>
                      )}
                      {mostrarInformeEquipo && (
                        <button
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalIdInformeEquipo}`}
                          onClick={() => editar(objeto)}
                        >
                          <i className="fa-solid fa-edit"></i> Informe
                          Estadisticas
                        </button>
                      )}
                      {mostrarEstadistica && (
                        <button
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalIdEstadistica}`}
                          onClick={() => editar(objeto)}
                        >
                          <i className="fa-solid fa-edit"></i> Estadisticas
                        </button>
                      )}
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
    </div>
  );
}
