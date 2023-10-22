function formattedDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Obtén los componentes de la fecha y hora
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Los meses van de 0 (enero) a 11 (diciembre)
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // Formatea la fecha y hora en un formato legible para los humanos
  const formattedDateTime = `${day}/${month}/${year}`; //${hours}:${minutes}

  return formattedDateTime;
}

export default formattedDateTime;
