import "./Period.scss";
export default function Period({ period }) {
  return (
    <div id="scoreboard__period">
      <span id="scoreboard__period__text">Periodo</span>
      <span id="scoreboard__period__number">{period}</span>
    </div>
  );
}
