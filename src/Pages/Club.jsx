import { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../functions/alertas";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "./pages.css";
import Tabla from "../Components/Tabla/Tabla";
import { ModalClubes } from "../Components/ModalClubes/ModalClubes";
import BotonAgregar from "../Components/BotonAgregar/BotonAgregar";

import "./Dashboard.scss";

export function Club() {
  const url = "https://blue-fair-mackerel.cyclic.cloud/api/clubs/";
  const [clubes, setClubes] = useState([]);
  const [titulo, setTitulo] = useState("");

  const [club, setClub] = useState({
    id: "",
    nombre: "",
    correo: "",
    clave: "",
  });

  useEffect(() => {
    getClubes();
  }, []);

  const getClubes = async () => {
    const res = await axios.get(url);
    setClubes(res.data);
  };

  const openModal = ({ op, id, name, email, password }) => {
    if (op === 1) {
      setTitulo("Agregar Club");
      setClub({ id: "", nombre: "", correo: "", clave: "" });
    } else if (op === 2) {
      setTitulo("Editar Club");
      setClub({ id: id, nombre: name, correo: email, clave: password });
    }
    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validar = async (operacion, id, nombre, correo, clave) => {
    let parametros;
    let metodo;
    let id2;
    if (nombre.trim() === "") {
      showAlert("Escribe el nombre del club", "warning");
    } else if (correo.trim() === "") {
      showAlert("Escribe el correo del club", "warning");
    } else if (clave.trim() === "") {
      showAlert("Escribe la contraseña del club", "warning");
    } else {
      if (operacion === 1) {
        id2 = "nada";
        parametros = {
          name: club.nombre.trim(),
          email: club.correo.trim(),
          password: club.clave.trim(),
        };
        metodo = "POST";
        enviarSolicitud(metodo, parametros, id2);
      } else if (operacion === 2) {
        id2 = id;
        await axios
          .patch(url + id, { name: club.nombre, password: club.clave })
          .then(function (respuesta) {
            let tipo = respuesta.data[0];
            showAlert("Accion Realizada", "success");
            if (tipo === "success") {
              document.getElementById("btnCerrar").click();
            }
          })
          .catch(function (error) {
            showAlert("Error en la solicitud", "error");
            console.log(error);
          });
        getClubes();
      }
    }
  };

  const enviarSolicitud = async (metodo, parametros, id) => {
    let url2 = url;
    if (metodo == "POST") {
      url2 = url;
    }
    if (metodo == "DELETE") {
      url2 = url + id;
    }

    await axios({ method: metodo, url: url2, data: parametros })
      .then(function (respuesta) {
        let tipo = respuesta.data[0];
        showAlert("Accion Realizada", "success");
        if (tipo === "success") {
          document.getElementById("btnCerrar").click();
        }
      })
      .catch(function (error) {
        showAlert("Error en la solicitud", "error");
        console.log(error);
      });
    getClubes();
  };

  const borrarClub = ({ id, name }) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que desea eliminar el club "' + name + '"?',
      icon: "question",
      text: "Esta acción no se podrá restablecer",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        enviarSolicitud("DELETE", { id }, id);
      } else {
        showAlert("El club NO fue eliminado", "info");
      }
    });
  };

  const editar = (data) => openModal({ op: 2, ...data });
  const borrar = (data) => borrarClub(data);

  return (
    <div className="dashboard-page">
      <div className="container-fluid">
        <BotonAgregar
          titulo="Clubes"
          boton="Agregar Club"
          abrir={() => openModal({ op: 1 })}
        />
        {clubes.length > 0 && (
          <Tabla
            cabeceras={["id", "Nombre", "Correo", "Contraseña", "Acciones"]}
            filas={["id", "name", "email", "password"]}
            data={clubes}
            editar={editar}
            borrar={borrar}
          />
        )}
      </div>
      <ModalClubes titulo={titulo} validar={validar} club={club} />
    </div>
  );
}
