import { useParams } from "react-router";
import "./ShortClockContainer.scss";
import { useEffect, useState } from "react";
import ShortClock from "../ShortClock/ShortClock";
import { socket } from "api";

export default function ShortClockContainer() {
  const params = useParams();
  const matchId = params.matchId;
  const [shortTime, setShortTime] = useState(24000);
  const [isShortRunning, setIsShortRunning] = useState(false);

  useEffect(() => {
    socket.connect();
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
    socket.emit("joinShort", { matchId });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="shortclock">
      <ShortClock isRunning={isShortRunning} serverTime={shortTime} />
    </div>
  );
}
