import {
  Clock,
  Faults,
  Period,
  Players,
  Score,
  ShortClock,
} from "pages/tablero/components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "socket";
import "./Scoreboard.scss";

export default function Scoreboard() {
  const params = useParams();
  const matchId = params.matchId;
  const [state, setState] = useState({
    home: "a",
    homePoints: 0,
    activeHomePlayers: [],
    away: "a",
    awayPoints: 0,
    activeAwayPlayers: [],
    homeFaults: [],
    awayFaults: [],
    homeTotalFouls: 0,
    awayTotalFouls: 0,
    period: 0,
  });
  const [clockTime, setClockTime] = useState(0);
  const [shortTime, setShortTime] = useState(0);
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [isShortRunning, setIsShortRunning] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on("state", ({ state }) => setState(state));
    socket.on("stopClock", ({ time }) => {
      setIsClockRunning(false);
      setClockTime(time);
    });
    socket.on("startClock", ({ time }) => {
      setClockTime(time);
      setIsClockRunning(true);
    });
    socket.on("resetClock", ({ time }) => {
      setClockTime(time);
      setIsClockRunning(false);
    });
    //SHORT
    socket.on("startShort", () => setIsShortRunning(true));
    socket.on("stopShort", ({ shortTime: time }) => {
      setIsShortRunning(false);
      setShortTime(time);
    });
    socket.on("resumeShort", ({ shortTime: time }) => {
      setShortTime(time);
      setIsShortRunning(true);
    });

    socket.on("update", ({ field, value }) => {
      console.log("update", value);
      setState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    });
    socket.emit("join", { matchId });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="scoreboard">
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
        <Clock isRunning={isClockRunning} serverTime={clockTime} />
        <ShortClock isRunning={isShortRunning} serverTime={shortTime} />
        <Faults
          elementId="scoreboard__homeFaults"
          faults={state.homeTotalFouls}
        />
        <Period period={state.period} />
        <Faults
          elementId="scoreboard__awayFaults"
          faults={state.awayTotalFouls}
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
    </div>
  );
}
