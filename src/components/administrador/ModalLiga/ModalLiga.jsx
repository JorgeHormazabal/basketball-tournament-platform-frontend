import { useEffect, useState, useMemo } from "react";
import { useEquipoStore, useLigaStore, useOrganizadorStore } from "hooks";
import "./ModalLiga.scss";
import { useForm } from "react-hook-form";
import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  SelectInput,
  TextInput,
} from "components/form";

const nuevaLigaVacia = {
  id: "",
  name: "",
  rules: "",
  organizerId: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const ModalLiga = () => {
  const { ligaActiva, guardarLigaAdministrador } = useLigaStore();
  const { equipos, cargarEquiposDeLiga } = useEquipoStore();
  const { organizadores, cargarOrganizadores } = useOrganizadorStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const titulo = useMemo(
    () => (ligaActiva === null ? "Nueva Liga" : "Editar Liga"),
    [ligaActiva]
  );

  useEffect(() => {
    if (ligaActiva !== null) {
      cargarEquiposDeLiga(ligaActiva.id);
      reset({
        id: ligaActiva.id,
        name: ligaActiva.name,
        rules: ligaActiva.rules,
        startDate: ligaActiva.startDate,
        endDate: ligaActiva.endDate,
        winnerId: ligaActiva.winnerId,
        organizerId: ligaActiva.organizerId,
      });
    }
  }, [ligaActiva]);

  useEffect(() => {
    cargarOrganizadores();
  });

  const onSubmit = async (data) => {
    await guardarLigaAdministrador(data);
  };

  const onClose = () => {
    reset({ ...nuevaLigaVacia });
  };

  return (
    <div id="modalLiga" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
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
                <TextInput
                  label="Reglas de la liga"
                  placeholder="Normales"
                  icon="fa-solid fa-book"
                  register={register}
                  errors={errors}
                  name="rules"
                  validation={{ required: true }}
                />
                <SelectInput
                  label="Organizador"
                  icon="fa-solid fa-user"
                  register={register}
                  errors={errors}
                  name="organizerId"
                  validation={{ required: true }}
                  list={organizadores}
                  displayLabel={(organizador) => organizador.name}
                />
              </>
            ) : (
              <>
                <SelectInput
                  label="Ganador"
                  icon="fa-solid fa-trophy"
                  register={register}
                  errors={errors}
                  name="winnerId"
                  validation={{ required: true }}
                  list={equipos}
                  displayLabel={(equipo) =>
                    `${equipo.club.name} - ${equipo.id}`
                  }
                />
              </>
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
