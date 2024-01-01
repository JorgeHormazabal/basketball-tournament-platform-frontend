import ErrorText from "../ErrorText/ErrorText";

export default function SelectInput({
  label,
  icon,
  register,
  errors,
  name,
  validation,
  list,
  displayLabel,
}) {
  const required = validation.required;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
        {required && (
          <span className="fs-6 fst-italic text-muted"> Requerido</span>
        )}
        {errors[name] && <ErrorText type={errors[name]} />}
      </label>
      <div className="input-group">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
        <select
          id={name}
          className="form-control"
          {...register(name, validation)}
        >
          <option value="" selected disabled hidden>
            Seleccionar {label}
          </option>
          {list.map((obj) => (
            <option key={obj.id} value={obj.id}>
              {displayLabel(obj)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
