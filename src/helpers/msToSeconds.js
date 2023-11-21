function msToSeconds(milliseconds) {
  const seconds = Math.ceil((milliseconds % 60000) / 1000);
  return seconds === 60 ? "00" : String(seconds).padStart(2, "0");
}

export default msToSeconds;
