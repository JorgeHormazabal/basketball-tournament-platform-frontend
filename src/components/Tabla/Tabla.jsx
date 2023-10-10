export default function Tabla({
  cabeceras,
  filas,
  data,
  editar,
  borrar,
  modalId,
}) {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="table-responsive">
          <table className="table">
            <thead className="table-light">
              <tr>
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
                  <th scope="row">{objeto.id}</th>
                  {filas.map((propiedad) => (
                    <td key={propiedad}>{objeto[propiedad]}</td>
                  ))}
                  <td className="d-flex align-items-center justify-content-center">
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
      </div>
    </div>
  );
}
