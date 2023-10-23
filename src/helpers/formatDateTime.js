function formatDateTime(dateTimeString) {
  const year = dateTimeString.slice(0, 4);
  const month = dateTimeString.slice(5, 7);
  const day = dateTimeString.slice(8, 10);
  const hours = dateTimeString.slice(11, 13);
  const minutes = dateTimeString.slice(14, 16);
  const formattedDateTime = `${day}/${month}/${year}  ${hours}:${minutes}`;
  return formattedDateTime;
}

export default formatDateTime;
