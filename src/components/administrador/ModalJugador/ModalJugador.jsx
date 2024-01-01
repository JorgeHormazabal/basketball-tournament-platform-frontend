import { useEffect, useMemo } from "react";
import { useJugadorStore } from "hooks";
import "./ModalJugador.scss";
import { useEquipoStore } from "hooks/useEquipoStore";
import { objectToFormData } from "helpers";
import { useForm } from "react-hook-form";
import { useFileInput } from "hooks";
import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  TextInput,
  SelectInput,
  ModalImageInput,
} from "components/form";
const jugadorVacio = {
  id: "",
  rut: "",
  name: "",
  birthdate: new Date(),
  teamId: "0",
  phone: "",
  email: "",
  emergencyName: "",
  emergencyPhone: "",
  height: "",
  weight: "",
  position: "",
  shirtNumber: "",
  shirtSize: "",
  shortsSize: "",
  shoeSize: "",
  clinicalDetail: "",
};

export const ModalJugador = () => {
  const { jugadorActivo, guardarJugador, setJugadorActivo } = useJugadorStore();
  const { equipos, cargarEquipos } = useEquipoStore();
  const { file, preview, onCloseFileInput, handleOnChangeImage } =
    useFileInput();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const titulo = useMemo(
    () => (jugadorActivo === null ? "Nuevo jugador" : "Editar jugador"),
    [jugadorActivo]
  );

  useEffect(() => {
    cargarEquipos();
    if (jugadorActivo !== null) {
      reset({ ...jugadorActivo, teamId: jugadorActivo.team.id });
    } else {
      reset({ ...jugadorVacio });
    }
  }, [jugadorActivo]);

  const onSubmit = async (data) => {
    const {
      rut,
      name,
      birthdate,
      displayDivision,
      displayTeam,
      team,
      displayBirthdate,
      ...restoJugador
    } = data;
    const formData = objectToFormData(jugadorActivo ? restoJugador : data);
    if (file) formData.append("file", file);
    await guardarJugador(formData);
  };

  const onClose = () => {
    setJugadorActivo(null);
    onCloseFileInput();
    reset(jugadorVacio);
  };

  return (
    <div id="modalJugador" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />

            {!getValues("id") && (
              <>
                <TextInput
                  label="Nombre del jugador"
                  placeholder="Ana López Gómez"
                  icon="fa-solid fa-user"
                  register={register}
                  type="text"
                  errors={errors}
                  name="name"
                  validation={{ required: true }}
                />
                <TextInput
                  label="Rut del jugador"
                  placeholder="21.369.852-1"
                  icon="fa-solid fa-user"
                  register={register}
                  type="text"
                  errors={errors}
                  name="rut"
                  validation={{
                    required: true,
                    pattern: {
                      value: /\b(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])\b/gm,
                      message: "Rut inválido",
                    },
                  }}
                />
                <TextInput
                  label="Fecha de nacimiento de la jugadora"
                  placeholder="Ana López Gómez"
                  icon="fa-regular fa-calendar"
                  register={register}
                  type="date"
                  errors={errors}
                  name="birthdate"
                  validation={{ required: true }}
                />
              </>
            )}
            <SelectInput
              label="Equipo"
              icon="fa-solid fa-list"
              register={register}
              errors={errors}
              name="teamId"
              validation={{ required: true }}
              list={equipos}
              displayLabel={(equipo) =>
                `${equipo.displayClub} - ${equipo.displayDivision}`
              }
            />
            <TextInput
              label="Teléfono"
              placeholder="997475479"
              icon="fa-solid fa-phone"
              register={register}
              type="text"
              errors={errors}
              name="phone"
              validation={{ required: false }}
            />
            <TextInput
              label="Correo Electrónico"
              placeholder="contacto@gmail.com"
              icon="fa-solid fa-envelope"
              register={register}
              type="email"
              errors={errors}
              name="email"
              validation={{
                required: false,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Correo inválido",
                },
              }}
            />
            <TextInput
              label="Nombre de Contacto de Emergencia"
              placeholder="Fabiola Perez (Mamá)"
              icon="fa-solid fa-user"
              register={register}
              type="text"
              errors={errors}
              name="emergencyName"
              validation={{ required: false }}
            />
            <TextInput
              label="Teléfono de Contacto de Emergencia"
              placeholder="997475479"
              icon="fa-solid fa-phone"
              register={register}
              type="text"
              errors={errors}
              name="emergencyPhone"
              validation={{ required: false }}
            />
            <TextInput
              label="Altura (cm)"
              placeholder="0"
              icon="fa-solid fa-ruler"
              register={register}
              type="number"
              errors={errors}
              name="height"
              validation={{ required: false }}
            />
            <TextInput
              label="Peso (kg)"
              placeholder="0"
              icon="fa-solid fa-balance-scale"
              register={register}
              type="number"
              errors={errors}
              name="weight"
              validation={{ required: false }}
            />
            <TextInput
              label="Posición"
              placeholder="0"
              icon="fa-solid fa-chess-king"
              register={register}
              type="text"
              errors={errors}
              name="position"
              validation={{ required: false }}
            />
            <TextInput
              label="Número de Camiseta"
              placeholder="0"
              icon="fa-solid fa-tshirt"
              register={register}
              type="number"
              errors={errors}
              name="shirtNumber"
              validation={{ required: false }}
            />
            <TextInput
              label="Talla de Camiseta"
              placeholder="L"
              icon="fa-solid fa-tshirt"
              register={register}
              type="text"
              errors={errors}
              name="shirtSize"
              validation={{ required: false }}
            />
            <TextInput
              label="Talla de Shorts"
              placeholder="M"
              icon="fa-solid fa-tshirt"
              register={register}
              type="text"
              errors={errors}
              name="shortsSize"
              validation={{ required: false }}
            />
            <TextInput
              label="Talla de Zapatos"
              placeholder="40"
              icon="fa-solid fa-shoe-prints"
              register={register}
              type="text"
              errors={errors}
              name="shoeSize"
              validation={{ required: false }}
            />
            <TextInput
              label="Detalles Clínicos"
              placeholder="Asmatica, lesión en la rodilla"
              icon="fa-solid fa-notes-medical"
              register={register}
              type="text"
              errors={errors}
              name="clinicalDetail"
              validation={{ required: false }}
            />
            <ModalImageInput
              title="Foto del jugador"
              handleOnChangeImage={handleOnChangeImage}
              preview={preview}
              image={
                jugadorActivo?.image ? jugadorActivo.image : "img/player.png"
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
