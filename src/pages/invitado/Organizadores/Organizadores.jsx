import { imagePath } from "helpers";
import { useOrganizadorStore } from "hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Organizadores.css";

export function Organizadores() {
  const { organizadores, cargarOrganizadores } = useOrganizadorStore();
  const navigate = useNavigate();

  useEffect(() => {
    cargarOrganizadores();
  }, []);
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
        <h1>Organizadores</h1>
      </div>
      <div className="sliderContainer">
        <Slider {...settings}>
          {Object.values(organizadores).map((organizador) => (
            <div key={organizador.id} className="equipo-card">
              <img
                src={
                  organizador.image
                    ? imagePath(organizador.image)
                    : "img/default_club.png"
                }
                alt={`Logo de ${organizador.name}`}
              />
              <h2>{organizador.name}</h2>
              <div className="buttons text-center">
                <button
                  className="w-50 btn btn-primary"
                  onClick={() => {
                    navigate(
                      `/tablero/${organizador.name.replace(/\s/g, "")}${
                        organizador.id
                      }`
                    );
                  }}
                >
                  Visualizar Tablero
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
