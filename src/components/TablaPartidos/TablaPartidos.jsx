import { formatDateTime } from "helpers";
import { useNavigate } from "react-router";

export default function TablaPartidos({ partidos, equipoId }) {
  const navigate = useNavigate();
  const onNavigate = async (id) => {
    navigate(`/club/estadistica-partido/${equipoId}/${id}`);
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">
              Ingresar
              <br />
              Estadisticas
            </th>
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
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => onNavigate(objeto.id)}
                >
                  <i className="fa-solid fa-play"></i>
                </button>
              </td>
              <td className="text-start">{formatDateTime(objeto.dateTime)}</td>
              <td className="text-start">{objeto.place}</td>
              <td className="text-start">{objeto.home.club.name}</td>
              <td className="text-start">{objeto.away.club.name}</td>
              <td className="text-center">{objeto.homePoints}</td>
              <td className="text-center">{objeto.awayPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
