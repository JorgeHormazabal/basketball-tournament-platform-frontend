function msToMinutes(milliseconds) {
  const seconds = milliseconds % 60000;
  if (seconds > 60000 - 1000) return Math.ceil(milliseconds / 60000);
  return Math.floor(milliseconds / 60000);
}

export default msToMinutes;
