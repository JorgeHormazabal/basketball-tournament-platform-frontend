export default function Tabla({ cabeceras, filas, data, editar, borrar }) {
  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="table-responsive">
          <table className="table table-bordered border-black">
            <thead className="table-primary">
              <tr>
                {cabeceras.map((cabecera) => (
                  <th key={cabecera}>{cabecera}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group">
              {data.map((objeto, index) => (
                <tr key={index}>
                  {filas.map((propiedad) => (
                    <td key={propiedad}>{objeto[propiedad]}</td>
                  ))}
                  <td className="w-25">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#modalClubes"
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
