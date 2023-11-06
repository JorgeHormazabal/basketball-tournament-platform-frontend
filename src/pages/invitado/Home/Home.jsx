import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { usePartidoStore } from "hooks";
import { useEffect } from "react"; 
import { CardsProximos } from "..";
import { TablaPasados } from "..";

export function Home() {
  const navigate = useNavigate();
  const { partidos, cargarPartidos } = usePartidoStore();
  useEffect(() => {
    cargarPartidos();
  });

  return (
    <>
      <button onClick={() => navigate("/tablero/3")}>TABLERO--TEMPORAL</button>
      <button onClick={() => navigate("/panel/3")}>PANEL--TEMPORAL</button>
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
        <CardsProximos encuentros={partidos} limit={2} />
        <br />
      </div>

      {/* PARTIDOS PASADOS  */}
      <div className="contenedorpasado">
        <div className="Pasados">
          <h2 id="cuarto">Últimos Enfrentamientos</h2>
          <TablaPasados encuentros={partidos} limit={3}/>
        </div>
      </div>
      <br />

      {/* DIV LIGAS  */}
      <div className="Ligass">
        <h2 id="actualizacionligauno">
          Última Actualización de <strong>Liga Uno - Femenina</strong>
        </h2>
        <div className="LigasAPP">
          <div className="contenedorDeLiga">
            {/*<EquiposTabla equipos={liga1.equipos} />*/}
          </div>
        </div>
      </div>

      {/* DIV CONOCE MAS */}
      <div className="botonesConoce">
        <div>
          <h1 id="tercero">¡Conoce más de Tromü!</h1>
        </div>
        <div className="botonesConoceDentro">
          <Link to="/ligas">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Todas las Ligas
            </button>
          </Link>
          <Link to="/clubes">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Todos los Clubes
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
