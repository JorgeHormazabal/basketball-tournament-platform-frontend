import { useEffect, useState, useMemo } from "react";
import {
  useEquipoStore,
  useEstadisticaLigaEquipoStore,
  useFileInput,
  useLigaStore,
} from "hooks";
import "./ModalLiga.scss";
import { useForm } from "react-hook-form";
import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  SelectInput,
  TextInput,
  FileInput,
} from "components/form";

const nuevaLigaVacia = {
  id: "",
  name: "",
  rules: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const ModalLiga = () => {
  const { ligaActiva, guardarLigaOrganizador } = useLigaStore();
  const { equipos, cargarEquiposDeLiga } = useEquipoStore();
  const { estadisticasLigaEquipo } = useEstadisticaLigaEquipoStore();
  const [equiposGanadores, setEquiposGanadores] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();
  const { file, onCloseFileInput, handleOnChangeFile } = useFileInput();

  const titulo = useMemo(
    () => (ligaActiva === null ? "Nueva Liga" : "Editar Liga"),
    [ligaActiva]
  );

  useEffect(() => {
    if (estadisticasLigaEquipo) {
      const maxPuntos = Math.max(
        ...estadisticasLigaEquipo.map((obj) => obj.points)
      );
      setEquiposGanadores(
        estadisticasLigaEquipo
          .filter((obj) => obj.points === maxPuntos)
          .map((obj) => obj.id)
      );
    }
    if (ligaActiva !== null) {
      reset({
        id: ligaActiva.id,
        name: ligaActiva.name,
        rules: ligaActiva.rules,
        startDate: ligaActiva.startDate,
        endDate: ligaActiva.endDate,
        winnerId: ligaActiva.winnerId,
      });
      cargarEquiposDeLiga(ligaActiva.id);
    } else {
      reset(nuevaLigaVacia);
    }
  }, [ligaActiva, estadisticasLigaEquipo]);

  const onSubmit = async (data) => {
    await guardarLigaOrganizador(data, file);
  };

  const onClose = () => {
    !ligaActiva && reset(nuevaLigaVacia);
  };

  return (
    <div id="modalLiga" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader onClose={onClose} titulo={titulo} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />

            {!getValues("id") ? (
              <>
                <TextInput
                  label="Nombre de la liga"
                  placeholder="Liga SuperCopa"
                  icon="fa-solid fa-user"
                  register={register}
                  errors={errors}
                  name="name"
                  validation={{ required: true }}
                />
                <FileInput
                  title="Reglas de la liga"
                  handleOnChangeFile={handleOnChangeFile}
                />
              </>
            ) : (
              <SelectInput
                label="Ganador"
                icon="fa-solid fa-trophy"
                register={register}
                errors={errors}
                name="winnerId"
                validation={{ required: false }}
                list={equipos.filter((equipo) =>
                  equiposGanadores.includes(equipo.id)
                )}
                displayLabel={(equipo) => `${equipo.club.name} - ${equipo.id}`}
              />
            )}

            <TextInput
              label="Fecha de Inicio"
              icon="fa-solid fa-calendar-days"
              register={register}
              type="date"
              errors={errors}
              name="startDate"
              validation={{ required: true }}
            />
            <TextInput
              label="Fecha de Fin"
              icon="fa-solid fa-calendar-days"
              register={register}
              type="date"
              errors={errors}
              name="endDate"
              validation={{ required: true }}
            />

            <ModalSave />
          </form>
          <ModalFooter onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
