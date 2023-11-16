import { useState } from "react";
import "./ActionControlPanel.scss";
import Swal from "sweetalert2";

export default function ActionControlPanel({ buzzer, saveMatch }) {
  const [pressed, setPressed] = useState(false);

  const handleSave = () => {
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Guardando!", "", "info");
        setPressed(true);
        saveMatch();
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  };

  return (
    <div id="controlpanel__actionControlPanel" className="grid-item">
      <button
        id="controlpanel__actionControlPanel__buzzer-btn"
        onClick={buzzer}
      >
        Alarma
      </button>
      <button
        id="controlpanel__actionControlPanel__save-btn"
        className={
          pressed
            ? "controlpanel__actionControlPanel__save-btn--pressed"
            : undefined
        }
        disabled={pressed}
        onClick={handleSave}
      >
        Guardar
      </button>
    </div>
  );
}
