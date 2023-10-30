import { useParams } from "react-router";
import "./ControlPanel.scss";
import { socket } from "socket";
import { useEffect } from "react";
import Team from "../components/Team/Team";
import ActivePlayers from "../components/ActivePlayers/ActivePlayers";
import ClockControl from "../components/ClockControl/ClockControl";
import { PlayerList } from "../components/PlayerList/PlayerList";
import { ShortClockControl } from "../components/ShortClockControl/ShortClockControl";
import PeriodControl from "../components/PeriodControl/PeriodControl";
import Alarm from "../components/Alarm/Alarm";
import { useState } from "react";

const emptyMatch = {
  activeAwayPlayers: [],
  activeHomePlayers: [],
  away: "",
  awayPlayers: [],
  awayPlayersFaults: {},
  awayPlayersPoints: {},
  awayPoints: 0,
  awayTotalFouls: 0,
  home: "",
  homePlayers: [],
  homePlayersFaults: {},
  homePlayersPoints: {},
  homePoints: 0,
  homeTotalFouls: 0,
  period: 0,
  isEmpty: true,
};
let internalState = emptyMatch;
let internalTimeStamp;
let timeElapsed = 0;
let shortTime = 0;
let internalShortTimeStamp;

export default function ControlPanel() {
  const params = useParams();
  const matchId = params.matchId;
  const [matchInfo, setMatchInfo] = useState(emptyMatch);
  const [isRunning, setIsRunning] = useState(false);
  const [isShortRunning, setIsShortRunning] = useState(false);
  const [time, setTime] = useState(600000);
  const [short, setShortTime] = useState(24000);

  const start = () => {
    internalTimeStamp = performance.now();
    setIsRunning(true);
    socket.emit("startClock", { time: 600000 - timeElapsed });
  };

  const stop = () => {
    const temp = performance.now();
    timeElapsed = temp - internalTimeStamp + timeElapsed;
    setTime(600000 - timeElapsed);
    setIsRunning(false);
    socket.emit("stopClock", { time: 600000 - timeElapsed });
  };

  const reset = () => {
    internalTimeStamp = performance.now();
    timeElapsed = 0;
    setTime(600000 - timeElapsed);
    setIsRunning(false);
    socket.emit("resetClock", { time: 600000 - timeElapsed });
  };

  const startShort = (role) => {
    internalShortTimeStamp = performance.now();
    setIsShortRunning(true);
    socket.emit("startShort", {
      shortTime: 24000 - shortTime,
      role,
    });
  };

  const stopShort = (role) => {
    const temp = performance.now();
    shortTime = temp - internalShortTimeStamp + shortTime;
    setShortTime(24000 - shortTime);
    setIsShortRunning(false);
    socket.emit("stopShort", {
      shortTime: 24000 - shortTime,
      role,
    });
  };

  const resetShort = (role) => {
    internalShortTimeStamp = performance.now();
    shortTime = 0;
    setShortTime(24000 - shortTime);
    setIsShortRunning(false);
    socket.emit("resetShort", {
      shortTime: 24000 - shortTime,
      role,
    });
  };

  const updateAndEmit = (field, value) => {
    socket.emit("update", {
      field,
      value,
    });

    setMatchInfo((prevInfo) => {
      return {
        ...prevInfo,
        [field]: value,
      };
    });
    internalState[field] = value;
    console.log(matchInfo);
  };

  const updateFoulHome = (id, incrementalValue) => {
    const updatedFouls = { ...matchInfo.homePlayersFaults };
    updatedFouls[id] += incrementalValue;
    updateAndEmit("homePlayersFaults", updatedFouls);
  };

  const updateFoulAway = (id, incrementalValue) => {
    const updatedFouls = { ...matchInfo.awayPlayersFaults };
    updatedFouls[id] += incrementalValue;
    updateAndEmit("awayPlayersFaults", updatedFouls);
  };

  const updatePointsHome = (id, incrementalValue) => {
    const updatedPoints = { ...matchInfo.homePlayersPoints };
    updatedPoints[id] += incrementalValue;
    updateAndEmit("homePlayersPoints", updatedPoints);
    updateAndEmit("homePoints", matchInfo.homePoints + incrementalValue);
  };

  const updatePointsAway = (id, incrementalValue) => {
    const updatedPoints = { ...matchInfo.awayPlayersPoints };
    updatedPoints[id] += incrementalValue;
    updateAndEmit("awayPlayersPoints", updatedPoints);
    updateAndEmit("awayPoints", matchInfo.awayPoints + incrementalValue);
  };

  const initMatchInfo = (info) => {
    setMatchInfo(info);
    internalState = info;
  };

  useEffect(() => {
    socket.on("new-spectator", ({ id }) => {
      socket.emit("welcome", {
        id,
        matchInfo,
        state: matchInfo,
      });
    });
    socket.on("init-from-server", ({ matchInfo }) => initMatchInfo(matchInfo));
    socket.on("new-spectator", ({ id }) => {
      socket.emit("welcome", {
        id,
        state: { ...internalState },
      });
    });

    socket.connect();
    socket.emit("init", { matchId });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="controlpanel">
      <div id="controlpanel__content">
        <Team
          elementId="controlpanel__team-home"
          role="Local"
          name={matchInfo.home}
        />
        <ActivePlayers
          elementId="controlpanel__home-active-players"
          activePlayers={matchInfo.activeHomePlayers}
          players={matchInfo.homePlayers}
          update={updateAndEmit}
          updateFouls={updateFoulHome}
          updatePoints={updatePointsHome}
        />
        <PlayerList
          elementId="control__home-players-list"
          players={matchInfo.homePlayers}
          points={matchInfo.homePlayersPoints}
          fouls={matchInfo.homePlayersFaults}
        />
        <ClockControl
          start={start}
          stop={stop}
          reset={reset}
          serverTime={time}
          isRunning={isRunning}
        />
        <Team
          elementId="controlpanel__team-away"
          role="Visita"
          name={matchInfo.away}
        />
        <ShortClockControl
          start={startShort}
          stop={stopShort}
          reset={resetShort}
          serverTime={short}
          isRunning={isShortRunning}
        />
        <PeriodControl period={matchInfo.period} update={updateAndEmit} />
        <Alarm />
        <ActivePlayers
          elementId="controlpanel__away-active-players"
          activePlayers={matchInfo.activeAwayPlayers}
          players={matchInfo.awayPlayers}
          update={updateAndEmit}
          updateFouls={updateFoulAway}
          updatePoints={updatePointsAway}
        />
        <PlayerList
          elementId="control__away-players-list"
          players={matchInfo.awayPlayers}
          points={matchInfo.awayPlayersPoints}
          fouls={matchInfo.awayPlayersFaults}
        />
      </div>
    </div>
  );
}
