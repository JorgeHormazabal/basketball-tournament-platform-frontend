import "./Fouls.scss";
export default function Faults({ elementId, faults }) {
  return (
    <div id={elementId}>
      <span className="scoreboard__fouls__text">Faltas</span>
      <span className="scoreboard__fouls__text">
        {elementId === "scoreboard__homeFaults" ? "Local" : "Visitante"}
      </span>
      <div id="scoreboard__fouls__box">
        <span id="scoreboard__fouls__number">{faults}</span>
      </div>
    </div>
  );
}
