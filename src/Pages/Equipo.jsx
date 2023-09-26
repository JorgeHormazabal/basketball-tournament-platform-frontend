import { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../functions/alertas";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Spinnerr } from "../functions/Spinner";
import "./pages.css";

export function Equipo() {
  const url = "https://blue-fair-mackerel.cyclic.cloud/api/teams/";
  const [equipos, setequipos] = useState([]);
  const [id, setId] = useState("");
  const [club, setclub] = useState("");
  const [categoria, setcategoria] = useState("");
  const [entrenador, setentrenador] = useState("");
  const [operacion, SetOperacion] = useState(1);
  const [titulo, setTitulo] = useState("");

  const [clubes, setClubes] = useState([]);
  const [divisiones, setdivisiones] = useState([]);

  useEffect(() => {
    fetch('https://blue-fair-mackerel.cyclic.cloud/api/clubs')
      .then((response) => response.json())
      .then((data) => {
        setClubes(data);
      })
      .catch((error) => {
        console.error('Error al cargar los clubes:', error);
      });
  }, []);

  const handleClubChange = (e) => {
    setclub(e.target.value);
  };

  useEffect(() => {
    fetch('https://blue-fair-mackerel.cyclic.cloud/api/divisions')
      .then((response) => response.json())
      .then((data) => {
        setdivisiones(data);
      })
      .catch((error) => {
        console.error('Error al cargar las divisiones:', error);
      });
  }, []);

  useEffect(() => {
    getequipos();
  }, []);

  const getequipos = async () => {
    const res = await axios.get(url);
    setequipos(res.data);
  };

  const openModal = (op, id, categoria, club, entrenador) => {
    setId("");
    setcategoria("");
    setclub("");
    setentrenador("");
    SetOperacion(op);
    if (op === 1) {
      setTitulo("Agregar Equipo");
    } else if (op === 2) {
      setTitulo("Editar Equipo");
      setId(id);
      setcategoria(categoria);
      setclub(club);
      setentrenador(entrenador);
    }
  };

  const validar = async () => {
    var parametros;
    var metodo;
    var id2;
      if (operacion === 1) {
        id2 = "nada";
        parametros = {
          divisionId: parseInt(categoria.trim()),
          clubId: parseInt(club.trim()),
          coach: entrenador.trim(),
        };
        metodo = "POST";
        enviarSolicitud(metodo, parametros, id2);
      } else if (operacion === 2) {
        id2 = id;
        await axios
          .patch(url + id, {coach: entrenador, divisionId: parseInt(categoria) })
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
        getequipos();
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
    getequipos();
  };

  const borrarequipo = (id, entrenador) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que desea eliminar el club del enternador "' + entrenador + '"?',
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
        showAlert("El club NO fue eliminado", "info");
      }
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Equipos</h1>
              <div className="d-grid mx-auto">
                <button
                  onClick={() => openModal(1)}
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#modalequipos"
                >
                  <i className="fa-solid fa-plus"></i> Agregar Equipo
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
                    <th id="headtable">Club</th>
                    <th id="headtable">División</th>
                    <th id="headtable">Entrenador</th>
                    <th id="headtable">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group" >
                {equipos.length === 0 && Spinnerr()}
                  {equipos.map((equipo, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{equipo.club.name}</td>
                      <td>{equipo.division.category}</td>
                      <td>{equipo.coach}</td>
                      <td className="w-25">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#modalequipos"
                            onClick={()=>openModal(2,equipo.id,equipo.division,equipo.club,equipo.coach)}
                          >
                            <i className="fa-solid fa-edit"></i> Editar
                          </button>
                          <button
                            onClick={() => borrarequipo(equipo.id, equipo.coach)}
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

      <div id="modalequipos" className="modal fade" aria-hidden="true">
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
          <label htmlFor="club" className="form-label">
            Club
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
            <select
        id="club"
        className="form-control"
        value={club}
        onChange={handleClubChange}
      >
        <option value="">Selecciona un club</option>
        {clubes.map((club) => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            División
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-user"></i>
            </span>
            <select
                id="categoria"
                className="form-control"
                value={categoria}
                onChange={(e) => setcategoria(e.target.value)}
            > 
            <option value="">Seleccionar división</option> 
            {divisiones.map((division) => (
            <option key={division.id} value={division.id}>
            {division.category}
            </option>
            ))}
      </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="entrenador" className="form-label">
            Entrenador
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-key"></i>
            </span>
            <input
              type="text"
              id="entrenador"
              className="form-control"
              placeholder="Ingrese el nombre del entrenador"
              value={entrenador}
              onChange={(e) => setentrenador(e.target.value)}
            />
          </div>
        </div>

        <div className="d-grid col-6 mx-auto">
          <button className="btn btn-success" onClick={() => validar()}>
            <i className="fa-solid fa-floppy-disk"></i> Guardar club
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
