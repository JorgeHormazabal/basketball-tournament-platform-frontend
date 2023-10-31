import "./Clock.scss";

export default function Clock({ serverTime: time }) {
  return (
    <div id="scoreboard__clock" className="timer">
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
      <span>:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  );
}
