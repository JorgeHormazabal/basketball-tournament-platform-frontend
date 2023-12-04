export default function ModalFooter({ onClose }) {
  return (
    <div className="modal-footer">
      <button
        id="btnCerrar"
        type="button"
        className="btn btn-danger"
        data-bs-dismiss="modal"
        onClick={onClose}
      >
        Cerrar
      </button>
    </div>
  );
}
