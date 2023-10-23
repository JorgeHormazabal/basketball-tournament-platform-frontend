function formatDate(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Obtén los componentes de la fecha y hora
  const year = dateTime.getFullYear();
  const month =
    dateTime.getMonth() + 1 < 10
      ? "0" + (dateTime.getMonth() + 1)
      : dateTime.getMonth() + 1;
  const day =
    dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate();

  // Formatea la fecha y hora en un formato legible para los humanos
  const formattedDateTime = `${day}/${month}/${year}`; //

  return formattedDateTime;
}

export default formatDate;
