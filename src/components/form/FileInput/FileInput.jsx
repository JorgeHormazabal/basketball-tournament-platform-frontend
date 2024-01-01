export default function FileInput({ title, handleOnChangeFile }) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="clave" className="form-label">
          {title}
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa-solid fa-image"></i>
          </span>

          <input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            className="form-control"
            onChange={handleOnChangeFile}
          />
        </div>
      </div>
    </>
  );
}
