import "./ShortClockControl.scss";
import { useEffect, useState } from "react";
let mode = 0;
export const ShortClockControl = ({
  start,
  stop,
  reset,
  resume,
  serverTime: time,
}) => {
  const [direction, setDirection] = useState("");
  return (
    <div id="control__short-clock" className="grid-item">
      <span id="control__short-clock__title">Reloj de posesión</span>
      <div id="control__short-clock__body">
        <div className="control_short-clock__buttons">
          <div className="control_short-clock__buttons-column">
            <button
              className="control_short-clock__start24-button"
              onClick={() => {
                setDirection("home");
                start("home", 24);
                mode = 24;
              }}
            >
              Empezar-24
            </button>
            <button
              className="control_short-clock__start24-button"
              onClick={() => {
                setDirection("home");
                start("home", 14);
                mode = 14;
              }}
            >
              Empezar-14
            </button>
          </div>
          <div className="control_short-clock__buttons-column">
            <button
              className="control_short-clock__reset24-button"
              onClick={() => {
                setDirection("home");
                reset("home", 24);
                mode = 24;
              }}
            >
              Reset-24
            </button>
            <button
              className="control_short-clock__reset24-button"
              onClick={() => {
                setDirection("home");
                reset("home", 14);
                mode = 14;
              }}
            >
              Reset-14
            </button>
          </div>
        </div>
        <div id="control_short-clock__timer-body">
          <div id="control_short-clock__timer">
            <span
              className={`control_short-clock__selector-btn ${
                direction === "home"
                  ? "control_short-clock__selector-btn--active"
                  : ""
              }`}
            >
              {"<"}
            </span>
            <span id="control_short-clock__time">
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
            </span>
            <span
              className={`control_short-clock__selector-btn ${
                direction === "away"
                  ? "control_short-clock__selector-btn--active"
                  : ""
              }`}
            >
              {">"}
            </span>
          </div>
          <div id="control_short-clock__under-buttons">
            <button
              id="control_short-clock__under-buttons--resume"
              onClick={resume}
            >
              Reanudar
            </button>
            <button
              id="control_short-clock__under-buttons--stop"
              onClick={() => {
                stop(mode);
              }}
            >
              Parar
            </button>
          </div>
        </div>
        <div className="control_short-clock__buttons">
          <div className="control_short-clock__buttons-column">
            <button
              className="control_short-clock__start24-button"
              onClick={() => {
                setDirection("away");
                start("away", 24);
                mode = 24;
              }}
            >
              Empezar-24
            </button>
            <button
              className="control_short-clock__start24-button"
              onClick={() => {
                setDirection("away");
                start("away", 14);
                mode = 14;
              }}
            >
              Empezar-14
            </button>
          </div>
          <div className="control_short-clock__buttons-column">
            <button
              className="control_short-clock__reset24-button"
              onClick={() => {
                setDirection("away");
                reset("away", 24);
                mode = 24;
              }}
            >
              Reset-24
            </button>
            <button
              className="control_short-clock__reset24-button"
              onClick={() => {
                setDirection("away");
                reset("away", 14);
                mode = 14;
              }}
            >
              Reset-14
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
