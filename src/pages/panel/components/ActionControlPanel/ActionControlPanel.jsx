import { useState } from "react";
import "./ActionControlPanel.scss";

export default function ActionControlPanel({ buzzer, saveMatch }) {
  const [pressed, setPressed] = useState(false);
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
        onClick={() => {
          setPressed(true);
          saveMatch();
        }}
      >
        Guardar
      </button>
    </div>
  );
}
