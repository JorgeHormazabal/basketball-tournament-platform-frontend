import moment from 'moment';

function formatDate(dateTimeString) {
  const dateTime = moment(dateTimeString);

  // Formatea la fecha en el formato deseado
  const formattedDateTime = dateTime.format('DD/MM/YYYY');

  return formattedDateTime;
}
export default formatDate;

