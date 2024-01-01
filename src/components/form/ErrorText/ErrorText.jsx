const errors = {
  required: "Por favor ingrese el campo.",
  minLength: "Largo insuficiente.",
};

export default function ErrorText({ error }) {
  console.log(error);
  return (
    <div className="text-start mt-0">
      <span className="fw-lighter text-danger fs-6">
        {error?.type === "pattern" ? error?.message : errors[error?.type]}
      </span>
    </div>
  );
}
