import "./Team.scss";
export default function Team({ elementId, role, name }) {
  return (
    <div id={elementId} className="controlpanel__team">
      <span className="controlpanel__team__role">{role}</span>
      <span className="controlpanel__team__name">{name}</span>
    </div>
  );
}
