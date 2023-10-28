import "./ClockControl.scss";

export default function ClockControl({ start, stop, reset }) {
  return (
    <div id="controlpanel__clock">
      <span id="controlpanel__clock__title">Reloj</span>
      <div id="controlpanel__clock__container">
        <span id="controlpanel__clock__time">00:00</span>
      </div>
      <div id="controlpanel__clock__buttons">
        <button onClick={start}>Empezar</button>
        <button onClick={stop}>Parar</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
