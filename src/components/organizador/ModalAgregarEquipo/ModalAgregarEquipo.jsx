import {
  ModalFooter,
  ModalHeader,
  ModalSave,
  SelectInput,
} from "components/form";
import {
  useEquipoStore,
  useLigaStore,
  useEstadisticaLigaEquipoStore,
} from "hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function ModalAgregarEquipo() {
  const { ligaActiva } = useLigaStore();
  const { cargarEquiposFueraDeLiga } = useEquipoStore();
  const { agregarEquipoALiga } = useEstadisticaLigaEquipoStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();
  const [equipos, setEquipos] = useState([]);

  const onClose = (nuevoPartidoVacio) => {
    reset({ equipoId: "" });
  };

  const onSubmit = async (data) => {
    await agregarEquipoALiga(ligaActiva.id, data.equipoId);
    cargarEquiposFueraDeLiga(ligaActiva.id).then((data) => setEquipos(data));
  };

  useEffect(() => {
    cargarEquiposFueraDeLiga(ligaActiva.id).then((data) => setEquipos(data));
  }, [ligaActiva]);

  return (
    <div id="modalAgregarEquipo" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo="Agregar equipo a liga" onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />

            <SelectInput
              label="Equipo"
              icon="fa-solid fa-user"
              register={register}
              errors={errors}
              name="equipoId"
              validation={{ required: true }}
              list={equipos}
              displayLabel={(equipo) =>
                `${equipo.club.name} - ${equipo?.division?.category}`
              }
            />
            <ModalSave />
          </form>
          <ModalFooter onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
