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
import ActionControlPanel from "../components/ActionControlPanel/ActionControlPanel";
import { useState } from "react";
import { usePanelChronometer } from "hooks";
import { ensureObjectAtIndex } from "helpers";
import Swal from "sweetalert2";

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
  const matchId = params.matchId;
  const [matchInfo, setMatchInfo] = useState(emptyMatch);
  const shortChronometer = usePanelChronometer(24);
  const longChronometer = usePanelChronometer(600);

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

  const reset = () => {
    const time = longChronometer.reset(600);
    socket.emit("resetClock", { time });
  };

  const startShort = (startTime) => {
    const time = shortChronometer.start(startTime);
    socket.emit("startShort", {
      shortTime: time,
    });
  };

  const resumeShort = () => {
    shortChronometer.resume();
    socket.emit("startShort", {
      shortTime: shortChronometer.displayTime,
    });
  };

  const stopShort = () => {
    const time = shortChronometer.stop();
    socket.emit("stopShort", {
      shortTime: time,
    });
  };

  const resetShort = (startTime) => {
    const time = shortChronometer.reset(startTime);
    socket.emit("resetShort", {
      shortTime: time,
    });
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

  const buzzer = () => socket.emit("playBuzzer", {});

  const saveMatch = () =>
    socket.emit("saveMatch", {
      matchId,
      awayPoints: matchInfo.awayPoints,
      awayPlayersFaults: matchInfo.awayPlayersFaults,
      awayPlayersPoints: matchInfo.awayPlayersPoints,
      homePoints: matchInfo.homePoints,
      homePlayersFaults: matchInfo.homePlayersFaults,
      homePlayersPoints: matchInfo.homePlayersPoints,
    });

  const initMatchInfo = (info) => {
    setMatchInfo(info);
    internalState = info;
  };

  var a = () => {
    console.log(matchInfo, matchId);
  };

  useEffect(() => {
    /*
    socket.on("new-spectator", ({ id }) => {
      socket.emit("welcome", {
        id,
        matchInfo,
        state: matchInfo,
      });
    });
    */
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
      <button onClick={a}>X</button>
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
          adjust={adjust}
          serverTime={longChronometer.displayTime}
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
          resume={resumeShort}
          update={updateAndEmit}
          direction={matchInfo.direction}
          serverTime={shortChronometer.displayTime}
        />
        <PeriodControl period={matchInfo.period} update={updateAndEmit} />
        <ActionControlPanel buzzer={buzzer} saveMatch={saveMatch} />
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
