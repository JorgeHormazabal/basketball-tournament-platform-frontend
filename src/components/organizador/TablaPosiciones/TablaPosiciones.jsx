export function TablaPosiciones({equipos} ) {
  return (
    <div className="table-responsive py-3">
      <table className="table table ">
        <thead className="table-light">
          <tr>
            <th className="text-start" scope="col">&nbsp;POS</th>
            <th className="text-start" scope="col">Equipo</th>
            <th className="text-center" scope="col">PG</th>
            <th className="text-center" scope="col">PP</th>
            <th className="text-center" scope="col">PUNTOS</th>
            <th className="text-center" scope="col">PTS. FAV.</th>
            <th className="text-center" scope="col">PTS. CON.</th>
          </tr>
        </thead>
        <tbody>
        
          {equipos.map((objeto, index) => (
            <tr key={index}>
              <td className="text-start align-middle">&nbsp;&nbsp;&nbsp;{index+1}</td>
              <td className="text-start align-middle"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Oklahoma_City_Thunder.svg/800px-Oklahoma_City_Thunder.svg.png" />&nbsp;&nbsp;&nbsp;
              {objeto.team.club.name}
              </td>
              <td className="text-center align-middle">{objeto.matchesWon}</td>
              <td className="text-center align-middle">{objeto.matchesLost}</td>
              <td className="text-center align-middle">{objeto.points}</td>
              <td className="text-center align-middle">{objeto.favorablePoints}</td>
              <td className="text-center align-middle">{objeto.pointsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}