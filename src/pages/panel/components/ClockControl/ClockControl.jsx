import "./ClockControl.scss";

export default function ClockControl({
  start,
  stop,
  reset,
  serverTime: time,
  adjust,
}) {
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
        <button id="controlpanel__clock__reset-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
