import "./Team.scss";
export default function Team({ elementId, role, name, points }) {
  return (
    <div id={elementId} className="controlpanel__team">
      {elementId === "controlpanel__team-away" && (
        <span className="controlpanel__team__points">{points}</span>
      )}
      <div>
        <span className="controlpanel__team__role">{role}</span>
        <span className="controlpanel__team__name">{name}</span>
      </div>
      {elementId === "controlpanel__team-home" && (
        <span className="controlpanel__team__points">{points}</span>
      )}
    </div>
  );
}
