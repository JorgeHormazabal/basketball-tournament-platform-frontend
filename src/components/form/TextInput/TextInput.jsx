import ErrorText from "../ErrorText/ErrorText";

export default function TextInput({
  label,
  placeholder,
  icon,
  type = "text",
  tip,
  register,
  errors,
  name,
  validation,
}) {
  const required = validation.required;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label mb-0">
        {label}
        {required && (
          <span className="fs-6 fst-italic text-muted"> Requerido</span>
        )}
      </label>
      {errors[name] && <ErrorText error={errors[name]} />}
      <div className="input-group">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
        <input
          id={name}
          type={type}
          className="form-control"
          title="La clave debe tener al menos 6 caracteres"
          placeholder={placeholder}
          {...register(name, validation)}
        />
      </div>
      {tip && <small className="fs-6 text-muted">{tip}</small>}
    </div>
  );
}
