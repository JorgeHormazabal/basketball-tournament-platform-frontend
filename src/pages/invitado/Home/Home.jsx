import { TablaPosiciones } from "components/organizador/TablaPosiciones/TablaPosiciones";
import {
  useEstadisticaLigaEquipoStore,
  useLigaStore,
  usePartidoStore,
} from "hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CardsProximos, TablaPasados } from "..";
import "./home.css";

export function Home() {
  const { partidos, cargarPartidos } = usePartidoStore();
  const { cargarTodasLasLigas, ligas } = useLigaStore();
  const { estadisticasLigaEquipo, cargarTodasLasEstadisticasDeLiga } =
    useEstadisticaLigaEquipoStore();
  useEffect(() => {
    cargarPartidos();
    cargarTodasLasLigas();
  });
  useEffect(() => {
    if (ligas.length > 0) {
      cargarTodasLasEstadisticasDeLiga([ligas[0]]);
    }
  }, [ligas, cargarTodasLasEstadisticasDeLiga]);

  const filtrarEstadisticasPrimeraLiga = () => {
    if (ligas.length > 0) {
      return estadisticasLigaEquipo.filter(
        (equipo) => equipo.ligaId === ligas[0].id
      );
    }
    return [];
  };
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
        <CardsProximos
          encuentros={partidos}
          limit={2}
          mostrarPaginacion={false}
        />
        <br />
      </div>

      {/* PARTIDOS PASADOS  */}
      <div className="contenedorpasado">
        <div className="Pasados">
          <h2 id="cuarto">Últimos Enfrentamientos</h2>
          <div className="contenedorDeLiga">
            <TablaPasados
              encuentros={partidos}
              limit={3}
              mostrarPaginacion={false}
            />
          </div>
        </div>
      </div>
      <br />

      {/* DIV LIGAS  */}
      <div className="Ligass">
        <h2 id="actualizacionligauno">
          Última Actualización de{" "}
          <strong>{ligas.length > 0 ? ligas[0].name : ""}</strong>
        </h2>
        <div className="LigasAPP">
          <div className="contenedorDeLiga">
            <TablaPosiciones equipos={filtrarEstadisticasPrimeraLiga()} />
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
