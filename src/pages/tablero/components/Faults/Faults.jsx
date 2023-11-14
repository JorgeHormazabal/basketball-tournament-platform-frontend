import "./Fouls.scss";
export default function Faults({ elementId, faults }) {
  return (
    <div id={elementId}>
      <span className="scoreboard__fouls__text">Faltas</span>
      <div id="scoreboard__fouls__box">
        <span
          id="scoreboard__fouls__number"
          className={faults >= 5 ? "scoreboard__fouls__number--red" : undefined}
        >
          {Math.min(5, faults)}
        </span>
      </div>
    </div>
  );
}
