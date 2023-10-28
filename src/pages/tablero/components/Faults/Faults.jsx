import "./Fouls.scss";
export default function Faults({ elementId, faults }) {
  return (
    <div id={elementId}>
      <span id="scoreboard__fouls__text">Faltas</span>
      <span id="scoreboard__fouls__number">{faults}</span>
    </div>
  );
}
