function imagePath(filename) {
  return `${import.meta.env.VITE_API_URL}/files/images/${filename}`;
}

export default imagePath;
