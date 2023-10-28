import "./ShortClockControl.scss";

export const ShortClockControl = () => {
  return (
    <div id="control__short-clock">
      <span id="control__short-clock__title">Reloj de posesión</span>
      <div id="control_short-clock__timer">
        <button>{"<"}</button>
        <span id="control_short-clock__time">24</span>
        <button>{">"}</button>
      </div>
      <div id="control_short-clock__buttons">
        <button>Empezar</button>
        <button>Parar</button>
        <button>Reset</button>
      </div>
    </div>
  );
};
