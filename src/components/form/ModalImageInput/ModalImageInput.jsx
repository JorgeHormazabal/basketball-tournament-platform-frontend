import { useEffect } from "react";

export default function ModalImageInput({
  title,
  preview,
  handleOnChangeImage,
  image,
}) {
  useEffect(() => {
  }, [preview]);

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
            accept="image/png, image/jpg, image/jpeg"
            className="form-control"
            onChange={handleOnChangeImage}
          />
        </div>
      </div>
      {preview ? (
        <p>
          <img
            className="m-auto d-block"
            width="200px"
            src={preview}
            alt="Vista previa"
          />
        </p>
      ) : (
        <p>
          <img
            className="m-auto d-block"
            width="200px"
            src={image || "img/default_club.png"}
            alt="Vista previa"
          />
        </p>
      )}
    </>
  );
}
