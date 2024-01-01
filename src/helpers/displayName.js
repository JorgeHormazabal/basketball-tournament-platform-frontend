const displayName = (name) => {
  if (!name) return "Jugador";
  const parts = name.split(" ");
  if (parts.length === 0) return "Jugador";
  if (parts.length === 1) return parts[0];
  if (parts.length === 4) return `${parts[0]} ${parts[2][0]}.`;
  return `${parts[0]} ${parts[1][0]}.`;
};

export default displayName;
