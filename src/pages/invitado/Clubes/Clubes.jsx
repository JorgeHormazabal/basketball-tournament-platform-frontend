import { useEffect, useState } from "react";
import { useClubStore, useJugadorStore } from "hooks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imagePath } from "helpers";
import "./clubes.css";
import ReactPaginate from "react-paginate";

export function Clubes() {
  const { clubes, cargarClubes, clubActivo, setClubActivo } = useClubStore();
  const { jugadores, cargarJugadoresDeUnClub, limpiarJugador } =
    useJugadorStore();

  useEffect(() => {
    cargarClubes();
  }, []);

  useEffect(() => {
    if (clubActivo) {
      limpiarJugador(clubActivo);
      cargarJugadoresDeUnClub(clubActivo);
    }
  }, [clubActivo]);

  const mostrarJugadoras = (club) => {
    setClubActivo(club);
  };

  function getAge(birthdate) {
    const date = new Date(birthdate);
    const year = date.getFullYear();
    const age = new Date().getFullYear() - year;

    return age;
  }
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCount = Math.ceil(jugadores.length / itemsPerPage);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
  };

  return (
    <div className="ClubesAPP">
      <div className="titulos">
        <h1>Clubes y Jugadoras</h1>
      </div>
      <div className="sliderContainer">
        <Slider {...settings}>
          {Object.values(clubes).map((club) => (
            <div
              key={club.id}
              className="equipo-card"
              onClick={() => mostrarJugadoras(club)}
            >
              <img
                src={
                  club.image ? imagePath(club.image) : "img/default_club.png"
                }
                alt={`Logo de ${club.name}`}
              />
              <h2>{club.name}</h2>
            </div>
          ))}
        </Slider>
      </div>

      {clubActivo && (
        <div className="jugadorasMostrar">
          <div className="subtitulo">
            <h2>{clubActivo.name}</h2>
          </div>

          <div className="jugadoras-list">
            {jugadores.slice(startIndex, endIndex).map((jugador) => (
              <div key={jugador.id} className="jugadora-card">
                <img
                  src={
                    jugador.image
                      ? imagePath(jugador.image)
                      : "img/default_player.png"
                  }
                />
                <h3>{jugador.name}</h3>
                <p>
                  Edad: {getAge(jugador.birthdate)}&nbsp; Posición:{" "}
                  {jugador.position ? jugador.position : "No Definida"}
                </p>
              </div>
            ))}
          </div>
          <div>
            {pageCount > 1 && (
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination justify-content-center mt-3"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
