export default function BotonAgregar({ titulo, boton, abrir, modalId }) {
  return (
    <div className="row mt-3">
      <div className="col d-flex justify-content-between align-items-start">
        <h1>{titulo}</h1>
        <div className="">
          <button
            onClick={abrir}
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
          >
            <i className="fa-solid fa-plus"></i>
            {boton}
          </button>
        </div>
      </div>
    </div>
  );
}
