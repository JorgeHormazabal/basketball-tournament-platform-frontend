import "./pasado.css"
import { equipo1, equipo2, equipo3, equipo4, equipo5 } from "../Ligas/Ligas.jsx"

function Encuentro(local, visitante, puntosLocal, puntosVisitantes, fecha, liga, lugar, hora) {
  this.local = local;
  this.visitante = visitante;
  this.puntosLocal = puntosLocal;
  this.puntosVisitantes = puntosVisitantes;
  this.fecha = fecha;
  this.liga = liga;
  this.lugar = lugar;
  this.hora = hora;
}

const partido1 = new Encuentro(equipo1, equipo2, 105, 92, "5 de Noviembre","Femi-BioMaule","Casa del deporte, Chillán", "15:00");
const partido2 = new Encuentro(equipo3, equipo4, 62, 80, "6 de Noviembre","Femi-BioMaule","Cancha Municipal, Chillán Viejo", "13:00");
const partido3 = new Encuentro(equipo5, equipo1, 77, 58, "7 de Noviembre","Femi-BioMaule","UDEC, Chillán", "15:00");
const partido4 = new Encuentro(equipo4, equipo2, 90, 107, "8 de Noviembre","Femi-BioMaule","UBB sede Fernando May, Chillán", "14:00");
export const encuentros = [partido1, partido2, partido3, partido4,partido1, partido2, partido3, partido4];


export function TablaPasados({ encuentros }) {
  return (
    <table>
      <thead>
        <tr>
          <th >&nbsp;Liga</th>
          <th className="text-start">Local</th>
          <th className="text-center">Resultado</th>
          <th className="text-end">Visita</th>
          <th>Lugar</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {encuentros.map((encuentro, index) => (
          <tr key={index}>
            <td className="text-start">{encuentro.liga}</td>
            <td className="text-start"><img src={encuentro.local.imagen}/> &nbsp; {encuentro.local.nombre}</td>
            <td className="text-center">{encuentro.puntosLocal} - {encuentro.puntosVisitantes}</td>
            <td className="text-end">{encuentro.visitante.nombre}&nbsp;<img src={encuentro.visitante.imagen}/></td>
            <td className="text-start">{encuentro.lugar}</td>
            <td className="text-start">{encuentro.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Pasados() {
  return (
    <div className="PartidosPasadosAPP">
      <div className="titulos">
        <h1>Partidos Pasados</h1>
      </div>
      <div className="contenedorDeLiga">
      <TablaPasados encuentros={encuentros} />
      </div>
    </div>
  );
}
