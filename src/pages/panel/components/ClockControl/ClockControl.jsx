import { useState } from "react";
import "./ClockControl.scss";

export default function ClockControl({
  start,
  stop,
  reset,
  serverTime: time,
  adjust,
}) {
  const [newTime, setNewTime] = useState({
    minutes: 10,
    seconds: 0,
  });
  const onInputChanged = ({ target }) => {
    setNewTime({
      ...newTime,
      [target.name]: target.value,
    });
  };
  const onSubmit = () => {
    reset(Number(newTime.minutes) * 60 + Number(newTime.seconds));
    setNewTime({
      minutes: 10,
      seconds: 0,
    });
  };

  return (
    <div id="controlpanel__clock" className="grid-item">
      <span id="controlpanel__clock__title">Reloj</span>
      <div id="controlpanel__clock__container">
        <button
          className="controlpanel__clock__second-control controlpanel__clock__second-control--add"
          onClick={() => adjust(+1)}
        >
          +1
        </button>
        <tt>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
          <span>:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </tt>
        <button
          className="controlpanel__clock__second-control controlpanel__clock__second-control--remove"
          onClick={() => adjust(-1)}
        >
          -1
        </button>
      </div>
      <div id="controlpanel__clock__buttons">
        <button id="controlpanel__clock__start-button" onClick={start}>
          Empezar
        </button>
        <button id="controlpanel__clock__stop-button" onClick={stop}>
          Parar
        </button>
        <button id="controlpanel__clock__reset-button" onClick={() => reset()}>
          Reset
        </button>
      </div>
      <div id="controlpanel__clock__setter">
        <div>
          <label htmlFor="minutes">Minutos:</label>
          <input
            type="number"
            id="minutes"
            name="minutes"
            min="0"
            max="59"
            value={newTime.minutes}
            onChange={onInputChanged}
          />
        </div>

        <div>
          <label htmlFor="seconds">Segundos:</label>
          <input
            type="number"
            id="seconds"
            name="seconds"
            min="0"
            max="59"
            value={newTime.seconds}
            onChange={onInputChanged}
          />
        </div>

        <button id="startButton" onClick={onSubmit}>
          Establecer
        </button>
      </div>
    </div>
  );
}
