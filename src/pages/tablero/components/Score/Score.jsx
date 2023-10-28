import "./Score.scss";

export default function Score({ name, point, elementId }) {
  return (
    <div id={elementId}>
      <div className="scoreboard__name-info">
        <h3 className="scoreboard__role">
          {elementId === "scoreboard__home" ? "Local" : "Visitante"}
        </h3>
        <h2 className="scoreboard__name">{name}</h2>
      </div>
      <span className="scoreboard__points">{point}</span>
    </div>
  );
}
