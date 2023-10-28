import { useEffect, useState } from "react";
import "./Clock.scss";

export default function Clock({ isRunning, serverTime }) {
  const [time, setTime] = useState(serverTime);

  useEffect(() => {
    setTime(serverTime);
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  return (
    <div id="scoreboard__clock" className="timer">
      <tt>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
        <span>:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </tt>
    </div>
  );
}
