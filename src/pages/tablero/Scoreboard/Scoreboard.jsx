import {
  Clock,
  Faults,
  Period,
  Players,
  Score,
  ShortClock,
} from "pages/tablero/components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { socket } from "socket";
import "./Scoreboard.scss";

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
    homeTotalFouls: 0,
    awayTotalFouls: 0,
    period: 0,
  });
  const [clockTime, setClockTime] = useState(600000);
  const [shortTime, setShortTime] = useState(24000);
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [isShortRunning, setIsShortRunning] = useState(false);
  const navigate = useNavigate();
  const navigateShortClock = (route) => {
    navigate(`${route}${matchId}`);
  };

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
      setIsClockRunning(false);
      setClockTime(time);
    });
    //SHORT
    socket.on("startShort", ({ shortTime: time }) => {
      setShortTime(time);
      setIsShortRunning(true);
    });
    socket.on("stopShort", ({ shortTime: time }) => {
      setIsShortRunning(false);
      setShortTime(time);
    });
    socket.on("resetShort", ({ shortTime: time }) => {
      setIsShortRunning(false);
      setShortTime(time);
    });

    socket.on("update", ({ field, value }) => {
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
        <ShortClock
          isRunning={isShortRunning}
          serverTime={shortTime}
          navigateShortClock={navigateShortClock}
        />
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
