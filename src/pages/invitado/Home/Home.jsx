import "./home.css"
import { Link } from "react-router-dom";
import { liga1, EquiposTabla } from "../Ligas/Ligas"
import { encuentros, TablaPasados } from "../Pasados/Pasados";
import { CardsProximos } from "../Proximos/Proximos";
const encuentrosproximos = encuentros.slice(0, 2);
const encuentrospasados = encuentros.slice(2, 6);

export function Home(){
  return (
    <>

      {/* HEADER  */}  

     <div className="Home">
      <div className="tituloHome">
        <h1 id="Primero">¡Bienvenido a Tromü!</h1>
        <h1 id="Segundo">Ligas de Baloncesto</h1>
      </div>
      </div>
    
      {/* PROXIMOS PARTIDOS  */}  

      <div className="Proximos">
      <h2 id="cuarto">Próximos Enfrentamientos</h2> 
      <CardsProximos encuentros={encuentrosproximos} />
      <br />
      </div>


      {/* PARTIDOS PASADOS  */} 
      <div className="contenedorpasado">
      <div className="Pasados">
      <h2 id="cuarto">Últimos Enfrentamientos</h2> 
      <TablaPasados encuentros={encuentrospasados} />
      </div>
      </div>
      <br />
      

      {/* DIV LIGAS  */}  

      <div className="Ligass">
      <h2 id="actualizacionligauno">Última Actualización de <strong>Liga Uno - Femenina</strong></h2> 
      <div className="LigasAPP">
      <div className="contenedorDeLiga">
        <EquiposTabla equipos={liga1.equipos} />
      </div>
    </div>
      </div>

      {/* DIV CONOCE MAS */}  

      <div className="botonesConoce">
        <div>
        <h1 id="tercero">¡Conoce más de Tromü!</h1>
        </div>
      <div className="botonesConoceDentro">
      <Link to="/ligas"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Todas las Ligas</button></Link>
      <Link to="/clubes"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Todos los Clubes</button></Link>
      </div>
      </div>
    </>
  )
}
