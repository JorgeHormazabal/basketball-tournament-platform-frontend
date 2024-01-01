import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  SelectInput,
  TextInput,
} from "components/form";
import {
  useEstadisticaLigaEquipoStore,
  useLigaStore,
  usePartidoStore,
} from "hooks";
import { useEquipoStore } from "hooks/useEquipoStore";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const nuevoPartidoVacio = {
  id: "",
  dateTime: new Date(),
  leagueId: "",
  place: "",
  homeId: "",
  awayId: "",
};

export const ModalPartido = ({ forceTrigger }) => {
  const { partidoActivo, guardarPartido, setPartidoActivo } = usePartidoStore();
  const { ligaActiva } = useLigaStore();
  const { equipos, cargarEquiposDeLiga } = useEquipoStore();
  const { estadisticasLigaEquipo } = useEstadisticaLigaEquipoStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  const titulo = useMemo(
    () => (partidoActivo === null ? "Nuevo Partido" : "Editar Partido"),
    [partidoActivo]
  );

  useEffect(() => {
    cargarEquiposDeLiga(ligaActiva.id);
    if (partidoActivo !== null) {
      reset({
        id: partidoActivo.id,
        dateTime: partidoActivo.dateTime.slice(0, -8),
        place: partidoActivo.place,
        homePoints: partidoActivo.homePoints,
        awayPoints: partidoActivo.awayPoints,
      });
    } else {
      reset({ ...nuevoPartidoVacio, leagueId: ligaActiva.id });
    }
  }, [partidoActivo, estadisticasLigaEquipo]);

  const onSubmit = async (data) => {
    if (!getValues("id") && data.homeId === data.awayId) {
      Swal.fire("Error al guardar", "Equipo seleccionado dos veces.", "error");
    } else {
      await guardarPartido(data, forceTrigger);
    }
  };

  const onClose = () => {
    setPartidoActivo(null);
    reset({ ...nuevoPartidoVacio, leagueId: ligaActiva.id });
  };

  return (
    <div id="modalPartido" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />
            {!getValues("id") ? (
              <>
                <SelectInput
                  label="Equipo Local"
                  icon="fa-solid fa-user"
                  register={register}
                  errors={errors}
                  name="homeId"
                  validation={{ required: true }}
                  list={equipos}
                  displayLabel={(equipo) =>
                    `${equipo.club.name} - ${equipo?.division?.category}`
                  }
                />
                <SelectInput
                  label="Equipo Visitante"
                  icon="fa-solid fa-user"
                  register={register}
                  errors={errors}
                  name="awayId"
                  validation={{ required: true }}
                  list={equipos}
                  displayLabel={(equipo) =>
                    `${equipo.club.name} - ${equipo?.division?.category}`
                  }
                />
              </>
            ) : (
              <>
                <TextInput
                  label="Puntaje Local"
                  placeholder="0"
                  icon="fa-solid fa-user"
                  register={register}
                  type="number"
                  errors={errors}
                  name="homePoints"
                  validation={{ required: true }}
                />
                <TextInput
                  label="Puntaje Visita"
                  placeholder="0"
                  icon="fa-solid fa-user"
                  register={register}
                  type="number"
                  errors={errors}
                  name="awayPoints"
                  validation={{ required: true }}
                />
              </>
            )}
            <TextInput
              label="Fecha y hora del partido"
              placeholder="0"
              icon="fa-solid fa-calendar-days"
              register={register}
              type="datetime-local"
              errors={errors}
              name="dateTime"
              validation={{ required: true }}
            />
            <TextInput
              label="Lugar"
              placeholder="Gimnasio Municipal"
              icon="fa-solid fa-map-pin"
              register={register}
              errors={errors}
              name="place"
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
