import { useEffect, useMemo } from "react";
import "./ModalPerfilAdministrador.scss";
import { useAuthStore } from "hooks";
import { objectToFormData } from "helpers";
import useImageInput from "hooks/useImageInput";
import { useForm } from "react-hook-form";
import {
  ModalFooter,
  ModalHeader,
  ModalImageInput,
  ModalSave,
  TextInput,
} from "components/form";

export const ModalPerfilAdministrador = () => {
  const { user: administrador, updateAdministradorProfile } = useAuthStore();
  const { file, preview, onCloseImageInput, handleOnChangeImage } =
    useImageInput();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const titulo = useMemo(
    () =>
      administrador === null ? "Nuevo administrador" : "Editar administrador",
    [administrador]
  );

  useEffect(() => {
    reset({
      name: administrador.name || "",
      password: administrador.password || "",
      phone: administrador.phone || "",
    });
  }, []);

  const onClose = () => {
    onCloseImageInput();
    //reset(clubVacio);
  };

  const onSubmit = async (data) => {
    const dataForm = objectToFormData(data, true);
    if (file) dataForm.append("file", file);
    updateAdministradorProfile(dataForm);
  };

  return (
    <div id="modalAdministrador" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />

            <TextInput
              label="Nombre"
              placeholder="Nombre"
              icon="fa-solid fa-user"
              register={register}
              errors={errors}
              name="name"
              validation={{ required: true }}
            />

            <TextInput
              label="Contraseña"
              placeholder="Contraseña"
              icon="fa-solid fa-key"
              register={register}
              errors={errors}
              type="password"
              tip="La clave debe tener al menos 6 caracteres"
              name="password"
              validation={{ required: false, minLength: 6 }}
            />
            <TextInput
              label="Numero"
              placeholder="9123456789"
              icon="fa-solid fa-user"
              register={register}
              errors={errors}
              name="phone"
              validation={{ required: false }}
            />

            <ModalImageInput
              title="Logo"
              handleOnChangeImage={handleOnChangeImage}
              preview={preview}
              image={
                administrador?.image
                  ? administrador.image
                  : "img/default_club.png"
              }
            />

            <ModalSave />
          </form>
          <ModalFooter onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
