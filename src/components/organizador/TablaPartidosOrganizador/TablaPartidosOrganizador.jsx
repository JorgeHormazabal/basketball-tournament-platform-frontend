import { formatDate } from "helpers";

export default function TablaPartidosOrganizador({ partidos }) {
  return (
    <div className="table-responsive py-3">
      <table className="table table-sm ">
        <thead className="table-light">
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Lugar</th>
            <th scope="col">Local</th>
            <th scope="col">Visitante</th>
            <th scope="col">Puntos Local</th>
            <th scope="col">Puntos Visitantes</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map((objeto, index) => (
            <tr key={index}>
              <td className="text-start">{formatDate(objeto.dateTime)}</td>
              <td className="text-start">{objeto.place}</td>
              <td className="text-start">{objeto.home.club.name}</td>
              <td className="text-start">{objeto.away.club.name}</td>
              <td className="text-start">{objeto.homePoints}</td>
              <td className="text-start">{objeto.awayPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
