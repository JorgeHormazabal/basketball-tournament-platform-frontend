import { useState } from "react";
import "./ShortClockControl.scss";

export const ShortClockControl = ({
  start,
  update,
  toggle,
  serverTime: time,
}) => {
  const handleDirectionLeft = () => update("direction", "left");
  const handleDirectionRight = () => update("direction", "right");
  const [status, setStatus] = useState(false);

  const handleStart24 = () => {
    setStatus(true);
    start(24);
  };

  const handleToggle = () => {
    setStatus((prev) => !prev);
    toggle();
  };

  const handleStart14 = () => {
    setStatus(true);
    start(14);
  };

  return (
    <div id="control__short-clock" className="grid-item">
      <div id="control__short-clock__header">
        <span id="control__short-clock__title">Reloj de posesión</span>
      </div>
      <div id="control__short-clock__body">
        <button
          className="control_short-clock__direction-btn"
          onClick={handleDirectionLeft}
        >
          {"<"}
        </button>
        <span id="control_short-clock__time">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
        <button
          className="control_short-clock__direction-btn"
          onClick={handleDirectionRight}
        >
          {">"}
        </button>
      </div>
      <div id="control__short-clock__footer">
        <button
          className="control_short-clock__run-btn"
          onClick={handleStart24}
        >
          Correr-24
        </button>
        <button
          className="control_short-clock__run-btn"
          onClick={handleStart14}
        >
          Correr-14
        </button>
        <button
          className={
            status
              ? "control_short-clock__stop-btn"
              : "control_short-clock__resume-btn"
          }
          onClick={handleToggle}
        >
          {status ? "Detener" : "Iniciar"}
        </button>
      </div>
    </div>
  );
};
/*
        <button
          className="control_short-clock__reset-btn"
          onClick={handleReset24}
        >
          Reset-24
        </button>
        <button
          className="control_short-clock__reset-btn"
          onClick={handleReset14}
        >
          Reset-14
        </button>
        <button className="control_short-clock__stop-btn" onClick={handleStop}>
          Parar
        </button>
        */

/*
  const handleStop = () => stop(mode);

  const handleReset24 = () => {
    reset(24);
    mode = 24;
  };

  const handleReset14 = () => {
    reset(14);
    mode = 14;
  };
  */
