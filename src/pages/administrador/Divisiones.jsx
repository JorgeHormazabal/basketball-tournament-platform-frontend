import { useEffect } from "react";

import "../Dashboard.scss";
import BotonAgregar from "components/BotonAgregar/BotonAgregar";
import Tabla from "components/Tabla/Tabla";
import Spinner from "components/Spinner/Spinner";
import { useDivisionStore } from "hooks";
import { ModalDivision } from "components/administrador/ModalDivision/ModalDivision";

export function Divisiones() {
  const {
    divisiones,
    setDivisionActivo,
    borrarDivision,
    cargarDivisiones,
    isLoading,
  } = useDivisionStore();
  //const { openDateModal } = useUiClub();

  const borrar = (club) => {
    setDivisionActivo(club);
    borrarDivision(club);
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
        {isLoading ? (
          <Spinner />
        ) : (
          <Tabla
            cabeceras={["Categorías"]}
            filas={["category"]}
            data={divisiones}
            editar={editarModal}
            borrar={borrar}
            modalId={"modalDivision"}
          />
        )}
      </div>
      <ModalDivision />
    </div>
  );
}
