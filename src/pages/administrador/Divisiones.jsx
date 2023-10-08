import { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "functions/alertas";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Spinnerr } from "functions/Spinner";

export function Divisiones() {
  const url = "https://blue-fair-mackerel.cyclic.cloud/api/divisions/";
  const [diviciones, setdiviciones] = useState([]);
  const [id, setId] = useState("");
  const [categoria, setCategoria] = useState("");
  const [operacion, SetOperacion] = useState(1);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    getdiviciones();
  }, []);

  const getdiviciones = async () => {
    const res = await axios.get(url);
    setdiviciones(res.data);
  };

  const openModal = (op, id, categoria) => {
    setId("");
    setCategoria("");
    SetOperacion(op);
    if (op === 1) {
      setTitulo("Agregar Divisiones");
    } else if (op === 2) {
      setTitulo("Editar Divisiones");
      setId(id);
      setCategoria(categoria);
    }
    window.setTimeout(function () {
      document.getElementById("categoria").focus();
    }, 500);
  };

  const validar = async () => {
    var parametros;
    var metodo;
    var id2;
    if (categoria.trim() === "") {
      showAlert("Escriba la categoria de la division", "warning");
    } else {
      if (operacion === 1) {
        id2 = "nada";
        parametros = {
          category: categoria.trim(),
        };
        metodo = "POST";
        enviarSolicitud(metodo, parametros, id2);
      } else if (operacion === 2) {
        id2 = id;
        console.log(url + id, { category: categoria });
        await axios
          .patch(url + id, { category: categoria })
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
        getdiviciones();
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
    getdiviciones();
  };

  const borrarDivisiones = (id, categoria) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que desea eliminar esta categoría "' + categoria + '"?',
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
        showAlert("La categoría NO fue eliminada", "info");
      }
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Divisiones</h1>
              <div className="d-grid mx-auto">
                <button
                  onClick={() => openModal(1)}
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#modaldiviciones"
                >
                  <i className="fa-solid fa-plus"></i> Agregar Divisiones
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
                    <th id="headtable">Categorías</th>
                    <th id="headtable">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group">
                  {diviciones.length === 0 && Spinnerr()}
                  {diviciones.map((Division, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{Division.category}</td>
                      <td className="w-25">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#modaldiviciones"
                            onClick={() =>
                              openModal(2, Division.id, Division.category)
                            }
                          >
                            <i className="fa-solid fa-edit"></i> Editar
                          </button>
                          <button
                            onClick={() =>
                              borrarDivisiones(Division.id, Division.category)
                            }
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

      <div id="modaldiviciones" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#EC661B", color: "#000" }}
            >
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
                <label htmlFor="categoria" className="form-label">
                  Nombre de la División
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="text"
                    id="categoria"
                    className="form-control"
                    placeholder="Nombre de la División"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-grid col-6 mx-auto">
                <button className="btn btn-success" onClick={() => validar()}>
                  <i className="fa-solid fa-floppy-disk"></i> Guardar Divisiones
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
