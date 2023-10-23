export default function Tabla({
  cabeceras,
  filas,
  data,
  editar,
  borrar,
  modalId,
  modalId2,
  mostrarJugador,
  mostrarEditar = true,
  mostrarDetalles = false,
}) {
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
              {data.map((objeto, index) => (
                <tr key={index}>
                  <th className="pt-2 text-end" scope="row">
                    {index+1}
                  </th>
                  {filas.map((propiedad) => (
                    <td key={propiedad} className="pt-2 text-start">
                      {objeto[propiedad]}
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
      </div>
    </div>
  );
}
