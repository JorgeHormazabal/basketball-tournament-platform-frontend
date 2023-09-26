import { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../functions/alertas";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Spinnerr } from "../functions/Spinner";
import "./pages.css";

export function Organizador() {
  const url = "https://blue-fair-mackerel.cyclic.cloud/api/organizers/";
  const [organizadores, setOrganizadores] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [operacion, SetOperacion] = useState(1);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    getOrganizadores();
  }, []);

  const getOrganizadores = async () => {
    const res = await axios.get(url);
    setOrganizadores(res.data);
  };

  const openModal = (op, id, nombre, correo, clave) => {
    setId("");
    setNombre("");
    setCorreo("");
    setClave("");
    SetOperacion(op);
    if (op === 1) {
      setTitulo("Agregar Organizador");
    } else if (op === 2) {
      setTitulo("Editar Organizador");
      setId(id);
      setNombre(nombre);
      setCorreo(correo);
      setClave(clave);
    }
    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validar = async () => {
    var parametros;
    var metodo;
    var id2;
    if (nombre.trim() === "") {
      showAlert("Escribe el nombre del organizador", "warning");
    } else if (correo.trim() === "") {
      showAlert("Escribe el correo del organizador", "warning");
    } else if (clave.trim() === "") {
      showAlert("Escribe la contraseña del organizador", "warning");
    } else {
      if (operacion === 1) {
        id2 = "nada";
        parametros = {
          name: nombre.trim(),
          email: correo.trim(),
          password: clave.trim(),
        };
        metodo = "POST";
        enviarSolicitud(metodo, parametros, id2);
      } else if (operacion === 2) {
        id2 = id;
        console.log(url + id, { name: nombre, email: correo, password: clave });
        await axios
          .patch(url + id, { name: nombre, password: clave })
          .then(function (respuesta) {
            var tipo = respuesta.data[0];
            showAlert("Accion Realizada", "success");
            if (tipo === "success") {
              document.getElementById("btnCerrar").click();
            }
          })
          .catch(function (error) {
            showAlert("Error en la solicitud", "error");
            console.log(error);
          });
        getOrganizadores();
      }
    }
  };

  const enviarSolicitud = async (metodo, parametros, id) => {
    var url2 = url;
    if (metodo == "POST") {
      url2 = url;
    }
    if (metodo == "DELETE") {
      url2 = url + id;
    }

    await axios({ method: metodo, url: url2, data: parametros })
      .then(function (respuesta) {
        var tipo = respuesta.data[0];
        showAlert("Accion Realizada", "success");
        if (tipo === "success") {
          document.getElementById("btnCerrar").click();
        }
      })
      .catch(function (error) {
        showAlert("Error en la solicitud", "error");
        console.log(error);
      });
    getOrganizadores();
  };

  const borrarorganizador = (id, nombre) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que desea eliminar el organizador "' + nombre + '"?',
      icon: "question",
      text: "Esta acción no se podrá restablecer",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
        enviarSolicitud("DELETE", { id: id }, id);
      } else {
        showAlert("El organizador NO fue eliminado", "info");
      }
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Organizadores</h1>
              <div className="d-grid mx-auto">
                <button
                  onClick={() => openModal(1)}
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#modalorganizadores"
                >
                  <i className="fa-solid fa-plus"></i> Agregar Organizador
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered border-black">
                <thead>
                  <tr>
                    <th id="headtable">#</th>
                    <th id="headtable">Nombre</th>
                    <th id="headtable">Correo</th>
                    <th id="headtable">Contraseña</th>
                    <th id="headtable">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group" >
                {organizadores.length === 0 && Spinnerr()}
                  {organizadores.map((organizador, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{organizador.name}</td>
                      <td>{organizador.email}</td>
                      <td>{organizador.password}</td>
                      <td className="w-25">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#modalorganizadores"
                            onClick={()=>openModal(2,organizador.id,organizador.name,organizador.email,organizador.password)}
                          >
                            <i className="fa-solid fa-edit"></i> Editar
                          </button>
                          <button
                            onClick={() => borrarorganizador(organizador.id, organizador.name)}
                            className="btn btn-danger"
                          >
                            <i className="fa-solid fa-trash"></i> Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id="modalorganizadores" className="modal fade" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header" style={{ backgroundColor: '#EC661B', color: '#000' }}>
        <h5 className="modal-title">{titulo}</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="close"
        ></button>
      </div>
      <div className="modal-body">
        <input type="hidden" id="id" />
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre del organizador
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              id="nombre"
              className="form-control"
              placeholder="Nombre del organizador"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo del organizador
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="text"
              id="correo"
              className="form-control"
              placeholder="Correo del organizador"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="clave" className="form-label">
            Contraseña del organizador
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-key"></i>
            </span>
            <input
              type="text"
              id="clave"
              className="form-control"
              placeholder="Contraseña del organizador"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>
        </div>

        <div className="d-grid col-6 mx-auto">
          <button className="btn btn-success" onClick={() => validar()}>
            <i className="fa-solid fa-floppy-disk"></i> Guardar Organizador
          </button>
        </div>
      </div>
      <div className="modal-footer">
        <button
          id="btnCerrar"
          type="button"
          className="btn btn-danger"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}