import "./Fouls.scss";
export default function Faults({ elementId, faults }) {
  return (
    <div id={elementId}>
      <span id="scoreboard__fouls__text">Faltas</span>
      <div id="scoreboard__fouls__box">
        <span id="scoreboard__fouls__number">{faults}</span>
      </div>
    </div>
  );
}
