import { useEffect, useState } from "react";
import axios from "axios";
import { showAlert } from "../functions/alertas";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2';
import { Spinnerr } from '../functions/Spinner'

export function Clubes() {
  const url = "https://blue-fair-mackerel.cyclic.cloud/api/clubs/";
  const [clubes, setClubes] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [operacion, SetOperacion] = useState(1);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    getClubes();
  }, []);

  const getClubes = async () => {
    const res = await axios.get(url);
    setClubes(res.data);
  };

  const openModal = (op, id, nombre, correo, clave) =>{
    setId('');
    setNombre('');
    setCorreo('');
    setClave('');
    SetOperacion(op);
    if (op===1){
        setTitulo('Agregar Club')
    } else if (op === 2){
      setTitulo('Editar Club')
      setId(id);
      setNombre(nombre);
      setCorreo(correo);
      setClave(clave);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500)

  }

  const validar = () => {
    var parametros;
    var metodo;
    if(nombre.trim()===''){
        showAlert('Escribe el nombre del club','warning');
    } else if(correo.trim()===''){
        showAlert('Escribe el correo del club','warning');
    } else if(clave.trim()===''){
        showAlert('Escribe la contraseña del club','warning');
    }
    else{
      if(operacion===1){
        parametros={name:nombre.trim(),email:correo.trim(),password:clave.trim()}
        metodo= 'POST'
      }else if(operacion===2){
        parametros={id:id,name:nombre.trim(),email:correo.trim(),password:clave.trim()}
        metodo= 'PATCH'
      }
      enviarSolicitud(metodo,parametros);
    }
  }

  const enviarSolicitud = async(metodo,parametros)=>{
      await axios({method:metodo, url: url, data:parametros}).then(function(respuesta){
        var tipo = respuesta.data[0];
        showAlert('Club Guardado','success');
        if(tipo === 'success'){
          document.getElementById('btnCerrar').click();
        }
      }).catch(function(error){
        showAlert('Error en la solicitud', 'error');
        console.log(error);
      })
      getClubes();
  }

  const borrarClub = (id, nombre) =>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title:'¿Seguro que desea eliminar el club "'+nombre+'"?',
      icon: 'question', text: 'Esta accion no se podrá restablecer',
      showCancelButton:true,confirmButtonText:'Si, Eliminar', cancelButtonText:'Cancelar' 
    }).then((result)=>{
      if (result.isConfirmed) {
        setId(id);
        enviarSolicitud('DELETE',{id:id});
      }
      else{
        showAlert('El producto NO fue eliminado','info');
      }
    })
  }

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button
                onClick={()=>openModal(1)}
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#modalClubes"
              >
                <i className="fa-solid fa-circle-plus"></i> Agregar Club
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Contraseña</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {clubes.length===0&&Spinnerr()}
                  {clubes.map((club, index) => (
                    <tr key={index}>
                      <td>{club.id}</td>
                      <td>{club.name}</td>
                      <td>{club.email}</td>
                      <td>{club.password}</td>
                      <td>
                        <button className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modalClubes' onClick={()=>openModal(2,club.id,club.name,club.email,club.password)}>
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button onClick={()=>borrarClub(club.id,club.name)} className="btn btn-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div id="modalClubes" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{titulo}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" />
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre del club"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="text"
                  id="correo"
                  className="form-control"
                  placeholder="Correo del club"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-key"></i>
                </span>
                <input
                  type="text"
                  id="clave"
                  className="form-control"
                  placeholder="Contraseña del club"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                />
              </div>

              <div className="d-grid col-6 mx-auto">
                <button className="btn btn-success" onClick={()=>validar()}>
                  <i className="fa-solid fa-floppy-disk"></i> Guardar Club
                </button>
              </div>
              <div className="modal-footer">
                <button id='btnCerrar' type="button" className="btn btn-danger" data-bs-dismiss='modal'>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
