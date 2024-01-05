import { msToSeconds } from "helpers";
import { useEffect, useRef, useState } from "react";
import "./ShortClock.scss";

export default function ShortClock({ isRunning, serverTime }) {
  const [time, setTime] = useState(serverTime);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(serverTime);

  const updateTimer = () => {
    const elapsed = performance.now() - startTimeRef.current;
    const updatedTime = Math.max(accumulatedTimeRef.current - elapsed, 0);
    setTime(updatedTime);
  };

  useEffect(() => {
    if (isRunning) {
      if (intervalRef.current === null) {
        startTimeRef.current = performance.now();
        intervalRef.current = setInterval(updateTimer, 10);
      }
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        accumulatedTimeRef.current = time;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    accumulatedTimeRef.current = serverTime;
    if (!isRunning) {
      setTime(serverTime);
    } else {
      // Restart the timer with the new server time while running
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      startTimeRef.current = performance.now();
      intervalRef.current = setInterval(updateTimer, 10);
    }
  }, [serverTime, isRunning]);

  return <span id="shortclock__seconds">{msToSeconds(time)}</span>;
}
