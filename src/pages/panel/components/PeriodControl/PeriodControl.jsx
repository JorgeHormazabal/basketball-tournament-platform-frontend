import "./PeriodControl.scss";

export default function PeriodControl() {
  return (
    <div id="controlpanel__period-control">
      <div id="control__panel_period-control__text">
        <span>Periodo </span>
        <span>{"4"}</span>
      </div>
      <div id="controlpanel__period-control__buttons">
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  );
}
