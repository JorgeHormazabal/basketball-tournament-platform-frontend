import React from "react";
import { useState } from "react";

export default function useImageInput() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);

  const onCloseImageInput = () => {
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
  return { file, preview, onCloseImageInput, handleOnChangeImage };
}
