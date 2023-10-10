import { useEffect } from "react";

import "./Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useDivisionStore } from "hooks";
import { ModalDivision } from "components/administrador/ModalDivision/ModalDivision";

export function Divisiones() {
  const { divisiones, setDivisionActivo, borrarDivision, cargarDivisiones } =
    useDivisionStore();
  //const { openDateModal } = useUiClub();

  const borrar = (club) => {
    setDivisionActivo(club);
    borrarDivision();
  };

  const editarModal = (club) => {
    setDivisionActivo(club);
  };
  const abrirModal = () => {
    setDivisionActivo(null);
  };

  useEffect(() => {
    cargarDivisiones();
  });

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <BotonAgregar
          titulo="Divisiones"
          boton="Agregar division"
          abrir={abrirModal}
          modalId={"modalDivision"}
        />
        {divisiones.length > 0 ? (
          <Tabla
            cabeceras={["id", "Categorías"]}
            filas={["category"]}
            data={divisiones}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalDivision"}
          />
        ) : (
          <Spinner />
        )}
      </div>
      <ModalDivision />
    </div>
  );
}
