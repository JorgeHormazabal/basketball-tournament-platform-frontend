import { msToMinutes, msToSeconds } from "helpers";
import { useState } from "react";
import "./ClockControl.scss";

export default function ClockControl({
  setNormalDirection,
  start,
  stop,
  reset,
  serverTime: time,
  adjust,
}) {
  const [newTime, setNewTime] = useState({
    minutes: 10,
    seconds: 0,
  });
  const onInputChanged = ({ target }) => {
    setNewTime({
      ...newTime,
      [target.name]: target.value,
    });
  };
  const onSubmit = () => {
    reset(Number(newTime.minutes) * 60 + Number(newTime.seconds));
    setNewTime({
      minutes: 10,
      seconds: 0,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <div id="controlpanel__clock" className="grid-item">
      <span id="controlpanel__clock__title">Reloj</span>
      <div id="controlpanel__clock__container">
        <button
          className="controlpanel__clock__second-control controlpanel__clock__second-control--add"
          onClick={() => adjust(+1)}
        >
          +1
        </button>
        <tt>
          <span>{msToMinutes(time)}</span>
          <span>:</span>
          <span>{msToSeconds(time)}</span>
        </tt>
        <button
          className="controlpanel__clock__second-control controlpanel__clock__second-control--remove"
          onClick={() => adjust(-1)}
        >
          -1
        </button>
      </div>
      <div id="controlpanel__clock__buttons">
        <button id="controlpanel__clock__start-button" onClick={start}>
          Empezar
        </button>
        <button id="controlpanel__clock__stop-button" onClick={stop}>
          Parar
        </button>
        <button id="controlpanel__clock__reset-button" onClick={() => reset()}>
          Reset
        </button>
      </div>
      <div id="controlpanel__clock__setter">
        <div>
          <label htmlFor="minutes">Minutos:</label>
          <input
            type="number"
            id="minutes"
            name="minutes"
            min="0"
            max="59"
            value={newTime.minutes}
            onChange={onInputChanged}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <label htmlFor="seconds">Segundos:</label>
          <input
            type="number"
            id="seconds"
            name="seconds"
            min="0"
            max="59"
            value={newTime.seconds}
            onChange={onInputChanged}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button id="startButton" onClick={onSubmit}>
          Establecer
        </button>
      </div>

      <button
        className="controlpanel__clock__direction"
        onClick={() => setNormalDirection((prev) => !prev)}
      >
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="32px"
          height="32px"
          viewBox="0 0 912.193 912.193"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M807.193,170.092v83.973c-6.033-10.458-12.529-20.674-19.512-30.606c-24.436-34.762-54.037-65.357-87.984-90.937
		c-34.352-25.885-72.34-46.014-112.908-59.827c-41.957-14.286-85.891-21.529-130.577-21.529c-46.663,0-92.432,7.883-136.03,23.431
		c-42.135,15.025-81.295,36.846-116.393,64.858c-34.751,27.735-64.539,60.747-88.534,98.119
		c-24.444,38.072-42.191,79.621-52.748,123.492c-6.783,28.19,10.57,56.542,38.761,63.325c4.128,0.993,8.259,1.469,12.325,1.469
		c23.705,0,45.21-16.167,51-40.229c15.47-64.292,52.651-122.573,104.694-164.109c26.001-20.751,54.989-36.909,86.16-48.024
		c32.249-11.5,66.151-17.331,100.765-17.331c65.672,0,128.018,20.822,180.297,60.214c35.375,26.656,64.541,61.161,85.139,100.095
		h-58.166c-28.994,0-52.5,23.505-52.5,52.5s23.506,52.5,52.5,52.5h196.211c28.996,0,52.5-23.505,52.5-52.5V170.092
		c0-28.995-23.504-52.5-52.5-52.5C830.699,117.592,807.193,141.097,807.193,170.092z"
            />
            <path
              d="M52.5,794.602c28.995,0,52.5-23.504,52.5-52.5v-84.326c31.275,54.438,74.821,100.955,127.654,135.994
		c66.246,43.936,143.417,67.186,223.196,67.254c0.044,0,0.087,0.004,0.13,0.004c0.035,0,0.071-0.002,0.106-0.002
		c0.041,0,0.083,0.002,0.124,0.002c0.056,0,0.109-0.004,0.166-0.004c46.524-0.045,92.157-7.924,135.633-23.428
		c42.135-15.025,81.295-36.846,116.393-64.857c34.752-27.734,64.539-60.748,88.535-98.119
		c24.443-38.072,42.191-79.621,52.748-123.492c6.783-28.189-10.57-56.541-38.762-63.324s-56.541,10.57-63.324,38.76
		c-15.471,64.293-52.652,122.574-104.695,164.109c-26,20.75-54.988,36.91-86.16,48.023c-32.217,11.488-66.082,17.318-100.657,17.33
		c-59.154-0.023-116.346-17.229-165.398-49.762c-42.3-28.053-76.562-66.006-100.007-110.545h58.028c28.996,0,52.5-23.506,52.5-52.5
		c0-28.996-23.505-52.5-52.5-52.5H52.5c-28.995,0-52.5,23.504-52.5,52.5v198.883C0,771.098,23.505,794.602,52.5,794.602z"
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
