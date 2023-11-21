import { msToMinutes, msToSeconds } from "helpers";
import "./Clock.scss";

export default function Clock({ serverTime: time }) {
  return (
    <div id="scoreboard__clock" className="timer">
      <span>{msToMinutes(time)}</span>
      <span>:</span>
      <span>{msToSeconds(time)}</span>
    </div>
  );
}
