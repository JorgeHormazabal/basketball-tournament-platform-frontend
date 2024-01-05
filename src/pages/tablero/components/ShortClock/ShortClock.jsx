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
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(serverTime);

  useEffect(() => {
    setTimeLeft(serverTime);
    accumulatedTimeRef.current = serverTime;
  }, [serverTime]);

  useEffect(() => {
    // Reset the clock when 'reset' changes
    if (reset) {
      startTimeRef.current = performance.now();
      accumulatedTimeRef.current = serverTime;
      setTimeLeft(serverTime);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const updateClock = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const newTime = Math.max(accumulatedTimeRef.current - elapsed, 0);
      if (newTime <= 0) {
        clearInterval(intervalRef.current);
        setTimeLeft(0);
      } else {
        setTimeLeft(newTime);
      }
    };

    if (isRunning) {
      startTimeRef.current = performance.now();
      intervalRef.current = setInterval(updateClock, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, reset]); // Added reset to the dependency array

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
