export default function formatDate(inputDate) {
  const dateParts = inputDate.split("-");
  if (dateParts.length !== 3) {
    return "Fecha inválida";
  }

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${month}/${day}/${year}`;
}
