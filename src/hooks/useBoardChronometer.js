import { useState } from "react";
import { useRef } from "react";

export const useBoardChronometer = (startTime) => {
  const [displayTime, setDisplayTime] = useState(startTime * 1000);
  const [isRunning, setIsRunning] = useState(false);
  let interval = useRef();
  let initial = useRef(0);

  const start = (startTime) => {
    if (isRunning) return resume(startTime);
    initial.current = startTime;
    setDisplayTime(startTime);
    setIsRunning(true);
    startClicking();
    return startTime;
  };

  const reset = (startTime) => {
    setIsRunning(false);
    initial.current = startTime;
    setDisplayTime(startTime);
    clearInterval(interval.current);
    return startTime;
  };

  const resume = (time) => {
    setDisplayTime(time);
    startClicking();
    return displayTime;
  };

  const startClicking = () => {
    interval.current = setInterval(
      () =>
        setDisplayTime((prevTime) =>
          prevTime >= 10 ? prevTime - 10 : prevTime
        ),
      10
    );
    console.log(interval.current);
  };

  const adjust = (correction) => {
    correction *= 1000;
    setDisplayTime((previous) => previous + correction);
  };

  const stop = (time) => {
    clearInterval(interval.current);
    setIsRunning(true);
    console.log(time);
    setDisplayTime(time);
    return displayTime;
  };

  return { displayTime, isRunning, start, stop, reset, resume, adjust };
};
