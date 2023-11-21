import useSound from "use-sound";
import buzzer from "assets/buzzer.mp3";
import {
  Clock,
  Faults,
  Period,
  Players,
  Score,
  ShortClock,
  SpeakerIcon,
} from "pages/tablero/components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { socket } from "socket";
import "./Scoreboard.scss";
import { useBoardChronometer } from "hooks";
import { Spinner2 } from "components/Spinner/Spinner2";
import { sumValuesAtIndex } from "helpers";
import { useRef } from "react";

export default function Scoreboard() {
  const params = useParams();
  const matchId = params.matchId;
  const [state, setState] = useState({
    home: "",
    homePoints: 0,
    activeHomePlayers: [],
    away: "",
    awayPoints: 0,
    activeAwayPlayers: [],
    homeFaults: [],
    awayFaults: [],
    period: 0,
    direction: "none",
  });
  const [shortTime, setShortTime] = useState(24000);
  const [isShortRunning, setIsShortRunning] = useState(false);
  const navigate = useNavigate();
  const navigateShortClock = (route) => navigate(route);
  const longClock = useBoardChronometer(600);
  const [hasReceivedState, setHasReceivedState] = useState(false);
  const [resetShort, setResetShort] = useState(false);
  const [playBuzzer] = useSound(buzzer);
  const soundBtnRef = useRef(null);

  useEffect(() => {
    socket.connect();

    const joinInterval = setInterval(() => {
      if (!hasReceivedState) {
        socket.emit("join", { matchId });
      }
    }, 3000);

    socket.on("state", ({ state }) => {
      clearInterval(joinInterval);
      setState(state);
      setHasReceivedState(true);
    });
    socket.on("stopClock", ({ time }) => {
      console.log("cluck");
      longClock.stop(time);
    });
    socket.on("startClock", ({ time }) => {
      console.log("clock", time);
      longClock.start(time);
    });
    socket.on("resetClock", ({ time }) => longClock.reset(time));
    //SHORT
    socket.on("startShort", ({ shortTime: time }) => {
      console.log("start", time);
      setShortTime(time);
      setIsShortRunning(true);
      setResetShort((previus) => !previus);
    });
    socket.on("stopShort", ({ shortTime: time }) => {
      console.log("stop", time);
      setIsShortRunning(false);
      setShortTime(time);
    });
    socket.on("resetShort", ({ shortTime: time }) => {
      console.log("reset", time);
      setIsShortRunning(false);
      setShortTime(time);
    });
    socket.on("buzzer", () => soundBtnRef.current.click());

    socket.on("update", ({ field, value }) => {
      setState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    });

    return () => {
      clearInterval(joinInterval);
      socket.disconnect();
      socket.off("state");
      socket.off("stopClock");
      socket.off("startClock");
      socket.off("resetClock");
      socket.off("startShort");
      socket.off("stopShort");
      socket.off("resetShort");
      socket.off("updateShort");
      socket.off("buzzer");
    };
  }, []);

  return (
    <div id="scoreboard">
      <SpeakerIcon />
      <button
        ref={soundBtnRef}
        className="invisibleButton"
        onClick={playBuzzer}
      ></button>
      {hasReceivedState ? (
        <div id="scoreboard__content">
          <Score
            elementId="scoreboard__home"
            name={state.home}
            point={state.homePoints}
          />
          <Players
            elementId="scoreboard__home-players"
            players={state.activeHomePlayers}
            faults={state.homePlayersFaults}
          />
          <Clock serverTime={longClock.displayTime} />
          <ShortClock
            isRunning={isShortRunning}
            serverTime={shortTime}
            navigateShortClock={navigateShortClock}
            direction={state.direction}
            reset={resetShort}
          />
          <Faults
            elementId="scoreboard__homeFaults"
            faults={sumValuesAtIndex(state.homePlayersFaults, state.period - 1)}
          />
          <Period period={state.period} />
          <Faults
            elementId="scoreboard__awayFaults"
            faults={sumValuesAtIndex(state.awayPlayersFaults, state.period - 1)}
          />

          <Score
            elementId="scoreboard__away"
            name={state.away}
            point={state.awayPoints}
          />
          <Players
            elementId="scoreboard__away-players"
            players={state.activeAwayPlayers}
            faults={state.awayPlayersFaults}
          />
        </div>
      ) : (
        <Spinner2 />
      )}
    </div>
  );
}
