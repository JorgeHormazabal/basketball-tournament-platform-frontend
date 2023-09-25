import Spinner from 'react-bootstrap/Spinner';

export function Spinnerr() {
  return (
    <>
      <br />
      <Spinner animation="grow" variant="info"/> <span>Generando Tabla... </span>
    </>
  );
}