import { formatDateTime } from "helpers";

export default function TablaPartidosOrganizador({
  partidos,
  editar,
  borrar,
  modalId,
}) {
  return (
    <div className="table-responsive py-3">
      <table className="table table-sm ">
        <thead className="table-light">
          <tr>
            <th className="text-center" scope="col">Fecha</th>
            <th scope="col">Lugar</th>
            <th scope="col">Local</th>
            <th scope="col">Visitante</th>
            <th scope="col">Puntos Local</th>
            <th scope="col">Puntos Visitantes</th>
            <th className="text-center" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((objeto, index) => (
            <tr key={index}>
              <td className="text-start">{formatDateTime(objeto.dateTime)}</td>
              <td className="text-start">{objeto.place}</td>
              <td className="text-start">{objeto.home.club.name}</td>
              <td className="text-start">{objeto.away.club.name}</td>
              <td className="text-center">{objeto.homePoints}</td>
              <td className="text-center">{objeto.awayPoints}</td>
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
  );
}
