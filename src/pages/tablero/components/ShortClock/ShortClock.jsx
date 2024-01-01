import { msToSeconds } from "helpers";
import { useEffect, useRef, useState } from "react";
import "./ShortClock.scss";

export default function ShortClock({
  isRunning,
  serverTime,
  navigateShortClock,
  direction,
  reset,
}) {
  const [timeLeft, setTimeLeft] = useState(serverTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(serverTime);
  }, [serverTime, reset]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 10);
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

  return (
    <div className="timer" id="scoreboard__short-clock">
      <div id="scoreboard__short-clock__header">
        <span
          id="scoreboard__short-clock__description"
          onClick={() => navigateShortClock("reloj/")}
        >
          Reloj de posesion
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
            {msToSeconds(timeLeft)}
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
