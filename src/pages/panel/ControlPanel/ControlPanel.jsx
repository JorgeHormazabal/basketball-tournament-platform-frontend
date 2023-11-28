import { useParams } from "react-router";
import "./ControlPanel.scss";
import { useEffect, useRef, useState } from "react";
import { usePanelChronometer } from "hooks";
import { addPlayerPointsFull, ensureObjectAtIndex } from "helpers";
import Swal from "sweetalert2";
import {
  Team,
  ActivePlayers,
  ClockControl,
  PlayerList,
  ShortClockControl,
  PeriodControl,
  ActionControlPanel,
} from "pages/panel/components";
import { socket } from "api";

const emptyMatch = {
  activeAwayPlayers: [],
  activeHomePlayers: [],
  away: "",
  awayPlayers: [],
  awayPlayersFaults: {},
  awayPlayersPoints: {},
  awayPoints: 0,
  home: "",
  homePlayers: [],
  homePlayersFaults: {},
  homePlayersPoints: {},
  homePoints: 0,
  period: 0,
  isEmpty: true,
};
let internalState = emptyMatch;

export default function ControlPanel() {
  const params = useParams();
  const [matchInfo, setMatchInfo] = useState(emptyMatch);
  const buzzer = () => socket.emit("playBuzzer", {});
  const shortChronometer = usePanelChronometer(24, buzzer);
  const longChronometer = usePanelChronometer(600, buzzer);
  const [normalDirection, setNormalDirection] = useState(true);
  const playersPoints = useRef({});
  const matchId = params.matchId;

  const start = () => {
    const time = longChronometer.resume();
    socket.emit("startClock", { time });
  };

  const stop = () => {
    const time = longChronometer.stop();
    socket.emit("stopClock", { time });
  };

  const adjust = (correction) => {
    const time = longChronometer.adjust(correction);
    socket.emit("stopClock", { time });
  };

  const reset = (resetTime = 600) => {
    const time = longChronometer.reset(resetTime);
    socket.emit("resetClock", { time });
  };

  const startShort = (startTime) => {
    const time = shortChronometer.start(startTime);
    socket.emit("startShort", {
      shortTime: time,
    });
  };

  const toggle = () => {
    const { time, action } = shortChronometer.toggle();
    if (action === "stopped") {
      socket.emit("stopShort", {
        shortTime: time,
      });
    } else {
      socket.emit("startShort", {
        shortTime: time,
      });
    }
  };

  const updateAndEmit = (field, value) => {
    const index = value - 1;
    if (
      field === "period" &&
      (!matchInfo.homePlayersFaults[index] ||
        !matchInfo.awayPlayersFaults[index])
    ) {
      let updatedFoulsArr = [...matchInfo.homePlayersFaults];
      ensureObjectAtIndex(updatedFoulsArr, index);
      updateAndEmit("homePlayersFaults", updatedFoulsArr);
      updatedFoulsArr = [...matchInfo.awayPlayersFaults];
      ensureObjectAtIndex(updatedFoulsArr, index);
      updateAndEmit("awayPlayersFaults", updatedFoulsArr);
    }
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
  };

  const updateFoulHome = (id, incrementalValue) => {
    const updatedFouls = [...matchInfo.homePlayersFaults];
    updatedFouls[matchInfo.period - 1][id] += incrementalValue;
    updateAndEmit("homePlayersFaults", updatedFouls);
  };

  const updateFoulAway = (id, incrementalValue) => {
    const updatedFouls = [...matchInfo.awayPlayersFaults];
    updatedFouls[matchInfo.period - 1][id] += incrementalValue;
    updateAndEmit("awayPlayersFaults", updatedFouls);
  };

  const updatePointsHome = (id, incrementalValue) => {
    const position = Math.abs(incrementalValue) - 1;
    playersPoints.current.homePlayersPointsFull[id][position] +=
      incrementalValue > 0 ? 1 : -1;

    const updatedPoints = { ...matchInfo.homePlayersPoints };
    updatedPoints[id] += incrementalValue;
    updateAndEmit("homePlayersPoints", updatedPoints);
    updateAndEmit("homePoints", matchInfo.homePoints + incrementalValue);
  };

  const updatePointsAway = (id, incrementalValue) => {
    const position = Math.abs(incrementalValue) - 1;
    playersPoints.current.awayPlayersPointsFull[id][position] +=
      incrementalValue > 0 ? 1 : -1;

    const updatedPoints = { ...matchInfo.awayPlayersPoints };
    updatedPoints[id] += incrementalValue;
    updateAndEmit("awayPlayersPoints", updatedPoints);
    updateAndEmit("awayPoints", matchInfo.awayPoints + incrementalValue);
  };

  const saveMatch = () => {
    socket.emit("saveMatch", {
      matchId,
      awayPoints: matchInfo.awayPoints,
      awayPlayersFaults: matchInfo.awayPlayersFaults,
      awayPlayersPointsFull: playersPoints.current.awayPlayersPointsFull,
      homePoints: matchInfo.homePoints,
      homePlayersFaults: matchInfo.homePlayersFaults,
      homePlayersPointsFull: playersPoints.current.homePlayersPointsFull,
    });
  };

  const initMatchInfo = (info) => {
    playersPoints.current = addPlayerPointsFull(info);
    setMatchInfo(info);
    internalState = info;
  };

  useEffect(() => {
    socket.on("init-from-server", ({ matchInfo }) => initMatchInfo(matchInfo));
    socket.on("new-spectator", ({ id }) => {
      socket.emit("welcome", {
        id,
        state: { ...internalState },
      });
    });

    socket.on("saved", ({ success }) => {
      if (success) {
        Swal.fire({
          icon: "success",
          title: "Resultados guardados",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al guardar resultados",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    socket.connect();
    socket.emit("init", { matchId });

    return () => {
      socket.disconnect();
      socket.off("new-spectator");
      socket.off("init-from-server");
      socket.off("saved");
    };
  }, []);

  return (
    <div id="controlpanel">
      <div id="controlpanel__content">
        <Team
          elementId={
            normalDirection
              ? "controlpanel__team-home"
              : "controlpanel__team-away"
          }
          role="Local"
          name={matchInfo.home}
          points={matchInfo.homePoints}
        />
        <ActivePlayers
          elementId={
            normalDirection
              ? "controlpanel__home-active-players"
              : "controlpanel__away-active-players"
          }
          activePlayers={matchInfo.activeHomePlayers}
          players={matchInfo.homePlayers}
          update={updateAndEmit}
          updateFouls={updateFoulHome}
          updatePoints={updatePointsHome}
        />
        <PlayerList
          elementId={
            normalDirection
              ? "control__home-players-list"
              : "control__away-players-list"
          }
          players={matchInfo.homePlayers}
          points={matchInfo.homePlayersPoints}
          fouls={matchInfo.homePlayersFaults}
        />
        <ClockControl
          setNormalDirection={setNormalDirection}
          start={start}
          stop={stop}
          reset={reset}
          adjust={adjust}
          serverTime={longChronometer.displayTime}
        />
        <Team
          elementId={
            normalDirection
              ? "controlpanel__team-away"
              : "controlpanel__team-home"
          }
          role="Visita"
          name={matchInfo.away}
          points={matchInfo.awayPoints}
        />
        <ShortClockControl
          start={startShort}
          toggle={toggle}
          update={updateAndEmit}
          serverTime={shortChronometer.displayTime}
        />
        <PeriodControl period={matchInfo.period} update={updateAndEmit} />
        <ActionControlPanel buzzer={buzzer} saveMatch={saveMatch} />
        <ActivePlayers
          elementId={
            normalDirection
              ? "controlpanel__away-active-players"
              : "controlpanel__home-active-players"
          }
          activePlayers={matchInfo.activeAwayPlayers}
          players={matchInfo.awayPlayers}
          update={updateAndEmit}
          updateFouls={updateFoulAway}
          updatePoints={updatePointsAway}
        />
        <PlayerList
          elementId={
            normalDirection
              ? "control__away-players-list"
              : "control__home-players-list"
          }
          players={matchInfo.awayPlayers}
          points={matchInfo.awayPlayersPoints}
          fouls={matchInfo.awayPlayersFaults}
        />
      </div>
    </div>
  );
}
