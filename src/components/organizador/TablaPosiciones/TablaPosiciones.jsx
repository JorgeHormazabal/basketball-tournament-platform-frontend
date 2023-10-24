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
              <td className="text-start">&nbsp;&nbsp;&nbsp;{index}</td>
              <td className="text-start"><img src="https://assets.stickpng.com/images/58419b70a6515b1e0ad75a50.png" />&nbsp;&nbsp;&nbsp;
              {objeto.team.club.name}
              </td>
              <td className="text-center">{objeto.matchesWon}</td>
              <td className="text-center">{objeto.matchesLost}</td>
              <td className="text-center">{objeto.points}</td>
              <td className="text-center">{objeto.favorablePoints}</td>
              <td className="text-center">{objeto.pointsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
