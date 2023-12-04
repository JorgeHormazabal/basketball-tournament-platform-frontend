import { useEffect, useMemo } from "react";
import { useClubStore } from "hooks/useClubStore";
import "./ModalClubes.scss";
import { useForm } from "react-hook-form";
import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  TextInput,
} from "components/form";
import ModalImageInput from "components/form/ModalImageInput/ModalImageInput";
import useImageInput from "hooks/useImageInput";

const clubVacio = {
  id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  image: "",
};

export const ModalClubes = () => {
  const { clubActivo, guardarClub, setClubActivo } = useClubStore();
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
    () => (clubActivo === null ? "Nuevo Club" : "Editar Club"),
    [clubActivo]
  );

  useEffect(() => {
    if (clubActivo !== null) {
      reset({ ...clubActivo });
    } else {
      reset({ ...clubVacio });
    }
  }, [clubActivo, reset]);

  const onSubmit = async (data) => {
    await guardarClub(data, file);
  };

  const onClose = () => {
    setClubActivo(null);
    onCloseImageInput();
    reset(clubVacio);
  };

  return (
    <div id="modalClub" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />

            <TextInput
              label="Nombre del club"
              placeholder="Nombre del club"
              icon="fa-solid fa-user"
              register={register}
              errors={errors}
              name="name"
              validation={{ required: true }}
            />

            {!getValues("id") && (
              <TextInput
                label="Correo del club"
                placeholder="Correo del club"
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
              label="Contraseña del club"
              placeholder="Contraseña del club"
              icon="fa-solid fa-key"
              register={register}
              type="password"
              tip="La clave debe tener al menos 6 caracteres"
              errors={errors}
              name="password"
              validation={{ required: !getValues("id"), minLength: 6 }}
            />

            <TextInput
              label="Celular del club"
              placeholder="Celular del club"
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
                clubActivo?.image ? clubActivo.image : "img/default_club.png"
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
