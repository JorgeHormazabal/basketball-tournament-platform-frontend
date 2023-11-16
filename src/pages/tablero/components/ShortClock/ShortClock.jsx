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
          id="scoreboard__short-clock__description"
          onClick={() => navigateShortClock("reloj/")}
        >
          Reloj de posesión
        </span>
      </div>
      <div id="scoreboard__short-clock__body">
        <span
          className={`scoreboard__short-clock__direction ${
            direction === "left" && "scoreboard__short-clock__direction--active"
          }`}
        >
          {"<"}
        </span>
        <div id="scoreboard__short-clock__box">
          <span id="scoreboard__short-clock__time">
            {("0" + Math.ceil((time / 1000) % 60)).slice(-2)}
          </span>
        </div>
        <span
          className={`scoreboard__short-clock__direction ${
            direction === "right" &&
            "scoreboard__short-clock__direction--active"
          }`}
        >
          {">"}
        </span>
      </div>
    </div>
  );
}
