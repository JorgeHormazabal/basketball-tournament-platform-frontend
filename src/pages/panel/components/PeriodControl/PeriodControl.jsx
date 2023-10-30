import "./PeriodControl.scss";

export default function PeriodControl({ period, update }) {
  const updatePeriod = (value) => update("period", value);
  return (
    <div id="controlpanel__period-control" className="grid-item">
      <div id="control__panel_period-control__text">
        <span>Periodo </span>
        <span>{period}</span>
      </div>
      <div id="controlpanel__period-control__buttons">
        <button
          id="controlpanel__period-control__remove-period"
          onClick={() => updatePeriod(period - 1)}
        >
          -
        </button>
        <button
          id="controlpanel__period-control__add-period"
          onClick={() => updatePeriod(period + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
