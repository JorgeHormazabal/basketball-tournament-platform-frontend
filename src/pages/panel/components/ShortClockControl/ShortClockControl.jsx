import "./ShortClockControl.scss";
import { useEffect, useState } from "react";

export const ShortClockControl = ({
  start,
  stop,
  reset,
  isRunning,
  serverTime,
}) => {
  const [time, setTime] = useState(serverTime);
  const [role, setRole] = useState("");

  useEffect(() => {
    setTime(serverTime);
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (time < 10) return;
        setTime((prevTime) => {
          if (prevTime < 10) return prevTime;
          return prevTime - 10;
        });
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, serverTime]);

  return (
    <div id="control__short-clock" className="grid-item">
      <span id="control__short-clock__title">Reloj de posesión</span>
      <div id="control_short-clock__timer">
        <button
          className={`control_short-clock__selector-btn ${
            role === "home" ? "control_short-clock__selector-btn--active" : ""
          }`}
          onClick={() => setRole("home")}
        >
          {"<"}
        </button>
        <span id="control_short-clock__time">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
        <button
          className={`control_short-clock__selector-btn ${
            role === "away" ? "control_short-clock__selector-btn--active" : ""
          }`}
          onClick={() => setRole("away")}
        >
          {">"}
        </button>
      </div>
      <div id="control_short-clock__buttons">
        <button
          id="control_short-clock__start-button"
          onClick={() => start(role)}
        >
          Empezar
        </button>
        <button
          id="control_short-clock__stop-button"
          onClick={() => stop(role)}
        >
          Parar
        </button>
        <button
          id="control_short-clock__reset-button"
          onClick={() => reset(role)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
