function ModalHeader({ titulo, onClose }) {
  return (
    <div className="modal-header">
      <h5 className="modal-title">{titulo}</h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default ModalHeader;
