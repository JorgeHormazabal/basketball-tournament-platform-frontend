import React, { useState } from "react";
import "./SpeakerIcon.scss";

export default function SpeakerIcon() {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      {disabled && (
        <button id="speakerButton" onClick={() => setDisabled(false)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6 5L13 3V8M3 3L21 21M7 16H5C3.89543 16 3 15.1046 3 14V10C3 9.63571 3.09739 9.29417 3.26756 9M13 18V21L10 18.5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}
