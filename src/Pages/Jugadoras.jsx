import { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../functions/alertas";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Spinnerr } from "../functions/Spinner";
import "./pages.css";

export function Jugadoras() {
  const url = "https://blue-fair-mackerel.cyclic.cloud/api/players/";
  const [jugadoras, setjugadoras] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [rut, setrut] = useState("");
  const [cumpleanos, setcumpleanos] = useState("");
  const [operacion, SetOperacion] = useState(1);
  const [titulo, setTitulo] = useState("");

  const [equipos, setequipos] = useState([]);
  const [equipo, setequipo] = useState("");

  useEffect(() => {
    fetch('https://blue-fair-mackerel.cyclic.cloud/api/teams')
      .then((response) => response.json())
      .then((data) => {
        setequipos(data);
      })
      .catch((error) => {
        console.error('Error al cargar los clubes:', error);
      });
  }, []);

  useEffect(() => {
    getjugadoras();
  }, []);

  const getjugadoras = async () => {
    const res = await axios.get(url);
    setjugadoras(res.data);
  };

  const openModal = (op, id, nombre, rut, cumpleanos) => {
    setId("");
    setNombre("");
    setrut("");
    setcumpleanos("");
    SetOperacion(op);
    if (op === 1) {
      setTitulo("Agregar Jugadora");
    } else if (op === 2) {
      setTitulo("Editar Jugadora");
      setId(id);
      setNombre(nombre);
      setrut(rut);
      setcumpleanos(cumpleanos);
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
      showAlert("Escribe el nombre de la jugadora", "warning");
    } else if (rut.trim() === "") {
      showAlert("Escribe el Rut de la jugadora", "warning");
    } else if (cumpleanos.trim() === "") {
      showAlert("Escribe la fecha de nacimineto de la jugadora", "warning");
    } else {
      if (operacion === 1) {
        id2 = "nada";
        parametros = {
          name: nombre.trim(),
          rut: rut.trim(),
          birthdate: cumpleanos.trim(),
          teamId: parseInt(equipo.trim())
        };
        metodo = "POST";
        enviarSolicitud(metodo, parametros, id2);
      } else if (operacion === 2) {
        id2 = id;
        await axios
          .patch(url + id, { teamId: parseInt(equipo) })
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
        getjugadoras();
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
    getjugadoras();
  };

  const borrarClub = (id, nombre) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que desea eliminar la jugadora "' + nombre + '"?',
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
        showAlert("La jugadora NO fue eliminada", "info");
      }
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Jugadoras</h1>
              <div className="d-grid mx-auto">
                <button
                  onClick={() => openModal(1)}
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#modaljugadoras"
                >
                  <i className="fa-solid fa-plus"></i> Agregar Jugadora
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
                    <th id="headtable">Rut</th>
                    <th id="headtable">Fecha de nacimineto</th>
                    <th id="headtable">Equipo</th>
                    <th id="headtable">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group" >
                {jugadoras.length === 0 && Spinnerr()}
                  {jugadoras.map((jugadora, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{jugadora.name}</td>
                      <td>{jugadora.rut}</td>
                      <td>{jugadora.birthdate}</td>
                      <td>{jugadora.team.club.name}</td>
                      <td className="w-25">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#modaljugadoras"
                            onClick={()=>openModal(2,jugadora.id,jugadora.name,jugadora.rut,jugadora.birthdate)}
                          >
                            <i className="fa-solid fa-edit"></i> Editar
                          </button>
                          <button
                            onClick={() => borrarClub(jugadora.id, jugadora.name)}
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

      <div id="modaljugadoras" className="modal fade" aria-hidden="true">
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
            Nombre de la jugadora
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              id="nombre"
              className="form-control"
              placeholder="Nombre de la jugadora"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="rut" className="form-label">
            Rut de la jugadora
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="text"
              id="rut"
              className="form-control"
              placeholder="Ej: 21369852-1"
              value={rut}
              onChange={(e) => setrut(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="cumpleanos" className="form-label">
            Fecha de nacimiento de la jugadora
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-key"></i>
            </span>
            <input
              type="text"
              id="cumpleanos"
              className="form-control"
              placeholder="Ej: 1999-03-25"
              value={cumpleanos}
              onChange={(e) => setcumpleanos(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="equipo" className="form-label">
            Equipo
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
            <select
                id="equipo"
                className="form-control"
                value={equipo}
                onChange={(e) => setequipo(e.target.value)}
            > 
              <option value="">Seleccionar Equipo</option> 
                {equipos.map((equipoo) => (
                <option key={equipoo.id} value={equipoo.id}>
                {equipoo.coach}
                </option>
              ))}
            </select>
            </div>
          </div>

        <div className="d-grid col-6 mx-auto">
          <button className="btn btn-success" onClick={() => validar()}>
            <i className="fa-solid fa-floppy-disk"></i> Guardar Club
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
