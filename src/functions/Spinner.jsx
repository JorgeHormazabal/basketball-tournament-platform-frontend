import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

export function Spinnerr() {
  return (
    <>
      <Button variant="secondary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Cargando...
      </Button>
    </>
  );
}