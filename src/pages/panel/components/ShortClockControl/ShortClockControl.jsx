import "./ShortClockControl.scss";

export const ShortClockControl = ({
  start,
  stop,
  reset,
  resume,
  direction,
  update,
  serverTime: time,
}) => {
  const handleDirectionLeft = () => update("direction", "left");
  const handleDirectionRight = () => update("direction", "right");
  let mode = 0;

  const handleStart24 = () => {
    start(24);
    mode = 24;
  };

  const handleStart14 = () => {
    start(14);
    mode = 14;
  };

  const handleStop = () => stop(mode);

  const handleReset24 = () => {
    reset(24);
    mode = 24;
  };

  const handleReset14 = () => {
    reset(14);
    mode = 14;
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
          className="control_short-clock__start-btn"
          onClick={handleStart24}
        >
          Empezar-24
        </button>
        <button
          className="control_short-clock__start-btn"
          onClick={handleStart14}
        >
          Empezar-14
        </button>
        <button className="control_short-clock__resume-btn" onClick={resume}>
          Reanudar
        </button>
        <button className="control_short-clock__stop-btn" onClick={handleStop}>
          Parar
        </button>
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
      </div>
    </div>
  );
};
