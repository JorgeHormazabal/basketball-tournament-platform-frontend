import { socket } from "api";
import { addPlayerPointsFull, ensureObjectAtIndex } from "helpers";
import { usePanelChronometer } from "hooks";
import {
  ActionControlPanel,
  ActivePlayers,
  ClockControl,
  PeriodControl,
  PlayerList,
  ShortClockControl,
  Team,
} from "pages/panel/components";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import InitialForm from "../InitialForm/InitialForm";
import BasketballMatch from "../ResultTable/ResultTable";
import "./ControlPanel.scss";

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
  const isFriendlyMatch = isNaN(Number(matchId));
  const [showForm, setShowForm] = useState(isFriendlyMatch);
  const [showTable, setShowTable] = useState(false);
  const [result, setResult] = useState({});
  const ready = useRef(false);

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
    if (value < 0) return;
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
    if (updatedFouls[matchInfo.period - 1][id] + incrementalValue < 0) return;
    updatedFouls[matchInfo.period - 1][id] += incrementalValue;
    updateAndEmit("homePlayersFaults", updatedFouls);
  };

  const updateFoulAway = (id, incrementalValue) => {
    const updatedFouls = [...matchInfo.awayPlayersFaults];
    if (updatedFouls[matchInfo.period - 1][id] + incrementalValue < 0) return;
    updatedFouls[matchInfo.period - 1][id] += incrementalValue;
    updateAndEmit("awayPlayersFaults", updatedFouls);
  };

  const updatePointsHome = (id, incrementalValue) => {
    const position = Math.abs(incrementalValue) - 1;
    if (
      playersPoints.current.homePlayersPointsFull[id][position] +
        (incrementalValue > 0 ? 1 : -1) <
      0
    )
      return;
    playersPoints.current.homePlayersPointsFull[id][position] +=
      incrementalValue > 0 ? 1 : -1;

    const updatedPoints = { ...matchInfo.homePlayersPoints };
    updatedPoints[id] += incrementalValue;
    updateAndEmit("homePlayersPoints", updatedPoints);
    updateAndEmit("homePoints", matchInfo.homePoints + incrementalValue);
  };

  const updatePointsAway = (id, incrementalValue) => {
    const position = Math.abs(incrementalValue) - 1;
    if (
      playersPoints.current.awayPlayersPointsFull[id][position] +
        (incrementalValue > 0 ? 1 : -1) <
      0
    )
      return;
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
      awayPoints: internalState.awayPoints,
      awayPlayersFaults: internalState.awayPlayersFaults,
      awayPlayersPointsFull: playersPoints.current.awayPlayersPointsFull,
      homePoints: internalState.homePoints,
      homePlayersFaults: internalState.homePlayersFaults,
      homePlayersPointsFull: playersPoints.current.homePlayersPointsFull,
    });
  };

  const initMatchInfo = (info) => {
    playersPoints.current = addPlayerPointsFull(info);
    setMatchInfo(info);
    internalState = info;
    if (showForm) setShowForm(false);
    ready.current = true;
  };

  useEffect(() => {
    socket.on("new-spectator", ({ id }) => {
      if (ready.current) {
        socket.emit("welcome", {
          id,
          state: { ...internalState },
        });
      }
    });

    socket.on("saved", ({ success }) => {
      if (success) {
        const matchDetails = {
          matchId,
          homePlayers: internalState.homePlayers,
          awayPlayers: internalState.awayPlayers,
          awayPoints: internalState.awayPoints,
          awayPlayersFaults: internalState.awayPlayersFaults,
          awayPlayersPointsFull: playersPoints.current.awayPlayersPointsFull,
          homePoints: internalState.homePoints,
          homePlayersFaults: internalState.homePlayersFaults,
          homePlayersPointsFull: playersPoints.current.homePlayersPointsFull,
        };
        setResult({ matchDetails, fullMatchInfo: success });
        setShowTable(true);
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
    if (!isFriendlyMatch) {
      socket.on("init-from-server", ({ matchInfo }) =>
        initMatchInfo(matchInfo)
      );
      socket.emit("init", { matchId });
    } else {
      socket.emit("join", { matchId });
    }

    return () => {
      socket.disconnect();
      socket.off("new-spectator");
      socket.off("init-from-server");
      socket.off("saved");
    };
  }, []);

  return (
    <div id="controlpanel">
      {showForm ? (
        <InitialForm initMatchInfo={initMatchInfo} />
      ) : (
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
            normalDirection={normalDirection}
            serverTime={shortChronometer.displayTime}
          />
          <PeriodControl period={matchInfo.period} update={updateAndEmit} />
          <ActionControlPanel
            buzzer={buzzer}
            saveMatch={saveMatch}
            isFriendlyMatch={isFriendlyMatch}
          />
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
      )}
      {showTable && (
        <BasketballMatch
          matchDetails={result.matchDetails}
          fullMatchInfo={result.fullMatchInfo}
          setShowTable={setShowTable}
        />
      )}
    </div>
  );
}
