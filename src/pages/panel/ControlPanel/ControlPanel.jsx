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

export default function ControlPanel() {
  const params = useParams();
  const matchId = params.matchId;
  const [matchInfo, setMatchInfo] = useState(emptyMatch);
  const [isLoading, setIsLoading] = useState(true);
  let internalState = emptyMatch;
  let internalTimeStamp;
  let time = 0;
  let shortTime = 0;
  let internalShortTimeStamp;

  const start = () => {
    internalTimeStamp = performance.now();
    socket.emit("startClock", { time });
  };

  const stop = () => {
    const temp = performance.now();
    time = temp - internalTimeStamp + time;
    socket.emit("stopClock", { time });
  };

  const reset = () => {
    internalTimeStamp = performance.now();
    time = 0;
    socket.emit("resetClock", { time });
  };

  useEffect(() => {
    socket.on("new-spectator", ({ id }) => {
      socket.emit("welcome", {
        id,
        matchInfo,
        state: matchInfo,
      });
    });
    socket.on("init-from-server", ({ matchInfo: serverMatchInfo }) => {
      setMatchInfo(serverMatchInfo);
      internalState = serverMatchInfo;
    });
    socket.on("new-spectator", ({ id }) => {
      socket.emit("welcome", {
        id,
        matchInfo,
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
        />
        <PlayerList
          elementId="control__home-players-list"
          players={matchInfo.homePlayers}
          points={matchInfo.homePlayersPoints}
          fouls={matchInfo.homePlayersFaults}
        />
        <ClockControl start={start} stop={stop} reset={reset} />
        <Team
          elementId="controlpanel__team-away"
          role="Visita"
          name={matchInfo.away}
        />
        <ShortClockControl />
        <PeriodControl />
        <Alarm />
        <ActivePlayers
          elementId="controlpanel__away-active-players"
          activePlayers={matchInfo.activeAwayPlayers}
          players={matchInfo.awayPlayers}
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
