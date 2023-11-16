import { useState, useRef } from "react";

export const useBoardChronometer = (defaultStartTime) => {
  const [displayTime, setDisplayTime] = useState(defaultStartTime * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(defaultStartTime * 1000);

  const updatedTime = () => {
    const elapsed = performance.now() - startTimeRef.current;
    return Math.max(accumulatedTimeRef.current - elapsed, 0);
  };

  const startClicking = () => {
    startTimeRef.current = performance.now();
    interval.current = setInterval(() => {
      const time = updatedTime();
      if (time <= 0) {
        stop(displayTime / 1000);
        setDisplayTime(0);
      } else {
        setDisplayTime(time);
      }
    }, 10);
  };

  const start = (time = defaultStartTime) => {
    const timeInMilliseconds = time;
    accumulatedTimeRef.current = timeInMilliseconds;
    setDisplayTime(timeInMilliseconds);
    setIsRunning(true);
    startClicking();
    return timeInMilliseconds;
  };

  const stop = (time = displayTime / 1000) => {
    const timeInMilliseconds = time;
    clearInterval(interval.current);
    interval.current = null;
    accumulatedTimeRef.current = timeInMilliseconds;
    setIsRunning(false);
    setDisplayTime(timeInMilliseconds);
    return timeInMilliseconds;
  };

  const reset = (time = defaultStartTime) => {
    const timeInMilliseconds = time;
    stop(time);
    accumulatedTimeRef.current = timeInMilliseconds;
    setDisplayTime(timeInMilliseconds);
    return timeInMilliseconds;
  };

  const resume = (time = displayTime / 1000) => {
    const timeInMilliseconds = time;
    accumulatedTimeRef.current = timeInMilliseconds;
    setDisplayTime(timeInMilliseconds);
    startClicking();
    setIsRunning(true);
    return timeInMilliseconds;
  };

  const adjust = (correction, time = displayTime / 1000) => {
    const timeInMilliseconds = time + correction;
    accumulatedTimeRef.current = timeInMilliseconds;
    setDisplayTime(timeInMilliseconds);
    return timeInMilliseconds;
  };

  return { displayTime, isRunning, start, stop, reset, resume, adjust };
};
