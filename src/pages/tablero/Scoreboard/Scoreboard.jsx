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
import { useBoardChronometer } from "hooks";

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
  const [shortTime, setShortTime] = useState(24000);
  const [isShortRunning, setIsShortRunning] = useState(false);
  const [shortDirection, setShortDirection] = useState("");
  const navigate = useNavigate();
  const navigateShortClock = (route) => navigate(route);
  const longClock = useBoardChronometer(600);

  useEffect(() => {
    socket.connect();
    socket.on("state", ({ state }) => setState(state));
    socket.on("stopClock", ({ time }) => {
      console.log("cluck");
      longClock.stop(time);
    });
    socket.on("startClock", ({ time }) => {
      console.log("clock");
      longClock.start(time);
    });
    socket.on("resetClock", ({ time }) => longClock.reset(time));
    //SHORT
    socket.on("startShort", ({ shortTime: time, direction }) => {
      console.log(time, direction);
      if (direction) setShortDirection(direction);
      setShortTime(time);
      setIsShortRunning(true);
    });
    socket.on("stopShort", ({ shortTime: time }) => {
      setIsShortRunning(false);
      setShortTime(time);
    });
    socket.on("resetShort", ({ direction, shortTime: time }) => {
      setShortDirection(direction);
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
      socket.off("state");
      socket.off("stopClock");
      socket.off("startClock");
      socket.off("resetClock");
      socket.off("startShort");
      socket.off("stopShort");
      socket.off("resetShort");
      socket.off("updateShort");
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
        <Clock serverTime={longClock.displayTime} />
        <ShortClock
          isRunning={isShortRunning}
          serverTime={shortTime}
          navigateShortClock={navigateShortClock}
          direction={shortDirection}
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
