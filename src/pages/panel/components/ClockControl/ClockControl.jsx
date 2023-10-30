import { useEffect } from "react";
import "./ClockControl.scss";
import { useState } from "react";

export default function ClockControl({
  start,
  stop,
  reset,
  serverTime,
  isRunning,
}) {
  const [time, setTime] = useState(serverTime);

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
    <div id="controlpanel__clock" className="grid-item">
      <span id="controlpanel__clock__title">Reloj</span>
      <div id="controlpanel__clock__container">
        <tt>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
          <span>:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </tt>
      </div>
      <div id="controlpanel__clock__buttons">
        <button id="controlpanel__clock__start-button" onClick={start}>
          Empezar
        </button>
        <button id="controlpanel__clock__stop-button" onClick={stop}>
          Parar
        </button>
        <button id="controlpanel__clock__reset-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
