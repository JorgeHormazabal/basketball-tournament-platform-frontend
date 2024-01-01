import { useState } from "react";

export const useFileInput = () => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);

  const onCloseFileInput = () => {
    setFile("");
    setPreview(null);
    document.getElementById("file").value = "";
  };

  const handleOnChangeImage = ({ target }) => {
    setFile(target.files[0]);
    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
  };

  const handleOnChangeFile = ({ target }) => {
    setFile(target.files[0]);
    const file = new FileReader();
    file.readAsDataURL(target.files[0]);
  };
  return {
    file,
    preview,
    onCloseFileInput,
    handleOnChangeImage,
    handleOnChangeFile,
  };
};
