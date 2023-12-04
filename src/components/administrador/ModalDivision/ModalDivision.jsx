import { useEffect, useState, useMemo } from "react";
import { useDivisionStore } from "hooks/useDivisionStore";
import "./ModalDivision.scss";
import { useForm } from "react-hook-form";
import TextInput from "components/form/TextInput/TextInput";
import ModalHeader from "components/form/ModalHeader/ModalHeader";
import ModalFooter from "components/form/ModalFooter/ModalFooter";
import ModalSave from "components/form/ModalSave/ModalSave";

const divisionVacio = {
  id: "",
  category: "",
};

export const ModalDivision = () => {
  const { divisionActiva, guardarDivision, setDivisionActivo } =
    useDivisionStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const titulo = useMemo(
    () => (divisionActiva === null ? "Nuevo division" : "Editar division"),
    [divisionActiva]
  );
  const onSubmit = async (data) => {
    await guardarDivision(data);
  };
  const onClose = () => {
    setDivisionActivo(null);
    reset({ ...divisionVacio });
  };

  useEffect(() => {
    if (divisionActiva !== null) {
      reset({ ...divisionActiva });
    } else {
      reset({ ...divisionVacio });
    }
  }, [divisionActiva]);

  return (
    <div id="modalDivision" className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <ModalHeader titulo={titulo} onClose={onClose} />
          <form className="modal-body" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" {...register("id")} />

            <TextInput
              label="Categoria"
              placeholder="Sub-18"
              icon="fa-solid fa-user"
              register={register}
              errors={errors}
              name="category"
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
