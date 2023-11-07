function objectToFormData(obj, validate = false) {
  const formData = new FormData();
  if (validate) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] && obj[key].length > 0) {
        formData.append(key, obj[key]);
      }
    });
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }
  return formData;
}

export default objectToFormData;
