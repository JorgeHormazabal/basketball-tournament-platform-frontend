import { useEffect, useState, useMemo } from "react";
import { useOrganizadorStore } from "hooks/useOrganizadorStore";
import "./ModalOrganizador.scss";
import { imagePath, objectToFormData } from "helpers";
import { useForm } from "react-hook-form";
import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  TextInput,
} from "components/form";
import useImageInput from "hooks/useImageInput";
import ModalImageInput from "components/form/ModalImageInput/ModalImageInput";

const organizadorVacio = {
  id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  image: "",
};

export const ModalOrganizador = () => {
  const { organizadorActivo, guardarOganizador, setOrganizadorActivo } =
    useOrganizadorStore();
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
      organizadorActivo === null ? "Nuevo organizador" : "Editar organizador",
    [organizadorActivo]
  );

  useEffect(() => {
    if (organizadorActivo !== null) {
      reset({ ...organizadorActivo });
    } else {
      reset({ ...organizadorVacio });
    }
  }, [organizadorActivo]);

  const onSubmit = async (data) => {
    await guardarOganizador(data, file);
  };

  const onClose = () => {
    setOrganizadorActivo(null);
    onCloseImageInput();
    reset({ ...organizadorVacio });
  };

  return (
    <div id="modalOrganizador" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" />

            <TextInput
              label="Nombre del organizador"
              placeholder="Nombre del organizador"
              icon="fa-solid fa-user"
              register={register}
              errors={errors}
              name="name"
              validation={{ required: true }}
            />

            {!getValues("id") && (
              <TextInput
                label="Correo del organizador"
                placeholder="Correo del organizador"
                icon="fa-solid fa-envelope"
                register={register}
                type="email"
                errors={errors}
                name="email"
                validation={{
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Correo inválido",
                  },
                }}
              />
            )}

            <TextInput
              label="Contraseña del organizador"
              placeholder="Contraseña del organizador"
              icon="fa-solid fa-key"
              register={register}
              type="password"
              tip="La clave debe tener al menos 6 caracteres"
              errors={errors}
              name="password"
              validation={{ required: !getValues("id"), minLength: 6 }}
            />
            <TextInput
              label="Celular del organizador"
              placeholder="Celular del organizador"
              icon="fa-solid fa-phone"
              register={register}
              errors={errors}
              name="phone"
              validation={{ required: true }}
            />

            <ModalImageInput
              title="Logo"
              handleOnChangeImage={handleOnChangeImage}
              preview={preview}
              image={
                imagePath(organizadorActivo?.image) || "img/default_club.png"
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
