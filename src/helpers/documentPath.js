function documentPath(filename) {
  if (!filename) return null;
  return `${import.meta.env.VITE_API_URL}/files/documents/${filename}`;
}

export default documentPath;
