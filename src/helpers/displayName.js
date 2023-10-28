function displayName(name) {
  const parts = name.split(" ");
  return parts.length === 4
    ? `${parts[0]} ${parts[2][0]}.`
    : `${parts[0]} ${parts[1][0]}.`;
}

export default displayName;
