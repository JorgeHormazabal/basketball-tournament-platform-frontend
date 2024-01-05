import { useState, useRef } from "react";

export const usePanelChronometer = (defaultStartTime, buzzer) => {
  const [displayTime, setDisplayTime] = useState(defaultStartTime * 1000);
  const interval = useRef(null);
  const startTimeRef = useRef(null);
  const accumulatedTimeRef = useRef(defaultStartTime * 1000);

  const updatedTime = () => {
    const elapsed = performance.now() - startTimeRef.current;
    return Math.max(accumulatedTimeRef.current - elapsed, 0);
  };

  const updateDisplayTime = () => {
    const time = updatedTime();
    if (time <= 0) {
      buzzer();
      stop();
    } else {
      setDisplayTime(time);
    }
  };

  const start = (startTime = defaultStartTime) => {
    accumulatedTimeRef.current = startTime * 1000;
    startTimeRef.current = performance.now();
    if (interval.current !== null) {
      clearInterval(interval.current);
    }
    interval.current = setInterval(updateDisplayTime, 10);
    return accumulatedTimeRef.current;
  };

  const stop = () => {
    const time = updatedTime();
    if (interval.current !== null) {
      clearInterval(interval.current);
      interval.current = null;
      accumulatedTimeRef.current = time;
      setDisplayTime(time);
    }
    return time;
  };

  const reset = (startTime = defaultStartTime) => {
    stop();
    const resetTime = startTime * 1000;
    accumulatedTimeRef.current = resetTime;
    setDisplayTime(resetTime);
    return resetTime;
  };

  const resume = () => {
    startTimeRef.current =
      performance.now() - (accumulatedTimeRef.current - displayTime);
    if (interval.current === null) {
      interval.current = setInterval(updateDisplayTime, 10);
    }
    return displayTime;
  };

  const adjust = (correction) => {
    correction *= 1000;
    const newTime = Math.max(displayTime + correction, 0);
    accumulatedTimeRef.current = newTime;
    setDisplayTime(newTime);
    return newTime;
  };

  const toggle = () => {
    if (interval.current !== null) {
      const time = stop();
      return { time, action: "stopped" };
    } else {
      const time = resume();
      return { time, action: "resumed" };
    }
  };

  return { displayTime, start, stop, reset, resume, adjust, toggle, interval };
};
