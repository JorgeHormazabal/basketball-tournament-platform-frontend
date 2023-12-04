import { useEffect, useMemo } from "react";
import { useClubStore, useDivisionStore } from "hooks";
import "./ModalEquipo.scss";
import { useEquipoStore } from "hooks/useEquipoStore";
import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  TextInput,
  SelectInput,
} from "components/form";
import { useForm } from "react-hook-form";

const equipoVacio = {
  id: "",
  coach: "",
  clubId: "",
  divisionId: "",
};

export const ModalEquipo = () => {
  const { equipoActivo, guardarEquipo, setEquipoActivo } = useEquipoStore();
  const { cargarDivisiones, divisiones } = useDivisionStore();
  const { cargarClubes, clubes } = useClubStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const titulo = useMemo(
    () => (equipoActivo === null ? "Nuevo equipo" : "Editar equipo"),
    [equipoActivo]
  );

  useEffect(() => {
    cargarDivisiones();
    cargarClubes();
    if (equipoActivo !== null) {
      reset({
        ...equipoActivo,
        clubId: equipoActivo.club.id,
        divisionId: equipoActivo.division.id,
      });
    } else {
      reset({ ...equipoVacio });
    }
  }, [equipoActivo]);

  const onSubmit = async (data) => {
    await guardarEquipo(data);
  };

  const onClose = () => {
    setEquipoActivo(null);
    reset({ ...equipoVacio });
  };
  return (
    <div id="modalEquipo" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />

            <TextInput
              label="Nombre del entrenador"
              placeholder="Nombre del entrenador"
              icon="fa-solid fa-user"
              register={register}
              errors={errors}
              name="coach"
              validation={{ required: true }}
            />
            <SelectInput
              label="Division"
              icon="fa-solid fa-list"
              register={register}
              errors={errors}
              name="divisionId"
              validation={{ required: true }}
              list={divisiones}
              displayLabel={(division) => division.category}
            />
            {!getValues("id") && (
              <>
                <SelectInput
                  label="Club"
                  icon="fa-solid fa-user"
                  register={register}
                  errors={errors}
                  name="clubId"
                  validation={{ required: true }}
                  list={clubes}
                  displayLabel={(division) => division.name}
                />
              </>
            )}

            <ModalSave />
          </form>
          <ModalFooter onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
