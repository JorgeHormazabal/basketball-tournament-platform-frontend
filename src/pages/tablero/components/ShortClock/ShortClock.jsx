import { useEffect, useState } from "react";
import "./ShortClock.scss";

export default function ShortClock({
  isRunning,
  serverTime,
  navigateShortClock,
  direction,
}) {
  const [time, setTime] = useState(serverTime);

  useEffect(() => {
    setTime(serverTime);
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (time < 10) return;
        setTime((prevTime) => {
          if (prevTime < 10) return prevTime;
          return prevTime - 10;
        });
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, serverTime]);
  return (
    <div className="timer" id="scoreboard__short-clock">
      <div id="scoreboard__short-clock__header">
        <span
          className={`scoreboard__short-clock__direction ${
            direction === "home" && "scoreboard__short-clock__direction--active"
          }`}
        >
          {"<"}
        </span>
        <span
          id="scoreboard__short-clock__description"
          onClick={() => navigateShortClock("reloj/")}
        >
          Reloj de posesión
        </span>
        <span
          className={`scoreboard__short-clock__direction ${
            direction === "away" && "scoreboard__short-clock__direction--active"
          }`}
        >
          {">"}
        </span>
      </div>
      <div id="scoreboard__short-clock__box">
        <span id="scoreboard__short-clock__time">
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
      </div>
    </div>
  );
}
