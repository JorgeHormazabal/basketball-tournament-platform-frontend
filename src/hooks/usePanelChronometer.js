import { useState } from "react";
import { useRef } from "react";

export const usePanelChronometer = (startTime) => {
  const [displayTime, setDisplayTime] = useState(startTime * 1000);
  const [isRunning, setIsRunning] = useState(false);
  let interval = useRef();
  let initial = useRef(0);

  const start = (startTime) => {
    clearInterval(interval.current);
    startTime *= 1000;
    initial.current = startTime;
    setDisplayTime(startTime);
    setIsRunning(true);
    startClicking();
    return startTime;
  };

  const reset = (startTime) => {
    clearInterval(interval.current);
    startTime *= 1000;
    setIsRunning(false);
    initial.current = startTime;
    setDisplayTime(startTime);
    return startTime;
  };

  const resume = () => {
    clearInterval(interval.current);
    startClicking();
    setIsRunning(true);
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
  };

  const adjust = (correction) => {
    console.log(correction);
    correction *= 1000;
    setDisplayTime((previos) => previos + correction);
    return displayTime + correction;
  };

  const stop = () => {
    clearInterval(interval.current);
    setIsRunning(false);
    return displayTime;
  };

  return { displayTime, isRunning, start, stop, reset, resume, adjust };
};
