import { useState } from "react";
import { createTeamStructure } from "../ControlPanel/CreateTeamStructure";
import "./InitialForm.scss";

export default function InitialForm({ initMatchInfo }) {
  const [localTeamPlayers, setLocalTeamPlayers] = useState([]);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
  const [numLocalPlayers, setNumLocalPlayers] = useState(0);
  const [numAwayPlayers, setNumAwayPlayers] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
      e.preventDefault();
    }
  };

  const handleLocalPlayersChange = (index, player) => {
    const newPlayers = [...localTeamPlayers];
    newPlayers[index] = player;
    setLocalTeamPlayers(newPlayers);
  };

  const handleAwayPlayersChange = (index, player) => {
    const newPlayers = [...awayTeamPlayers];
    newPlayers[index] = player;
    setAwayTeamPlayers(newPlayers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    initMatchInfo(
      createTeamStructure(
        localTeamPlayers.slice(0, numLocalPlayers),
        awayTeamPlayers.slice(0, numAwayPlayers)
      )
    );
  };

  const changePlayer = (team, value) => {
    if (value < 0) return;
    const emptyPlayer = { shirtNumber: value, name: `Jugador ${value}` };
    if (team === "local") {
      if (!localTeamPlayers[value - 1]) {
        handleLocalPlayersChange(value - 1, emptyPlayer);
      }
      setNumLocalPlayers(value);
    } else {
      if (!awayTeamPlayers[value - 1]) {
        handleAwayPlayersChange(value - 1, emptyPlayer);
      }
      setNumAwayPlayers(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="initialform">
      <h1 className="initialform__title">Partido amistoso</h1>
      <button className="initialform__save" type="submit">
        Guardar
      </button>
      <div className="initialform__teams">
        <div className="initialform__local">
          <label>
            Cantidad de jugadores locales:
            <input
              className="initialform__cantity-input"
              type="number"
              value={numLocalPlayers}
              onChange={(e) => changePlayer("local", Number(e.target.value))}
              onKeyDown={handleKeyDown}
            />
          </label>
          {Array.from({ length: numLocalPlayers }, (_, index) => (
            <div key={index}>
              <input
                className="initialform__shirt-input"
                type="number"
                placeholder="00"
                value={localTeamPlayers[index]?.shirtNumber || "0"}
                onChange={(e) =>
                  handleLocalPlayersChange(index, {
                    ...localTeamPlayers[index],
                    shirtNumber: e.target.value,
                  })
                }
              />
              <input
                className="initialform__name-input"
                type="text"
                placeholder="Nombre de jugador"
                value={localTeamPlayers[index]?.name || ""}
                onChange={(e) =>
                  handleLocalPlayersChange(index, {
                    ...localTeamPlayers[index],
                    name: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>

        <div className="initialform__away">
          <label>
            Cantidad de jugadores visitantes:
            <input
              className="initialform__cantity-input"
              type="number"
              value={numAwayPlayers}
              onChange={(e) => changePlayer("away", Number(e.target.value))}
              onKeyDown={handleKeyDown}
            />
          </label>
          {Array.from({ length: numAwayPlayers }, (_, index) => (
            <div key={index}>
              <input
                className="initialform__shirt-input"
                type="number"
                placeholder="00"
                value={awayTeamPlayers[index]?.shirtNumber || "0"}
                onChange={(e) =>
                  handleAwayPlayersChange(index, {
                    ...awayTeamPlayers[index],
                    shirtNumber: e.target.value,
                  })
                }
              />{" "}
              <input
                className="initialform__name-input"
                type="text"
                placeholder="Nombre Jugador"
                value={awayTeamPlayers[index]?.name || ""}
                onChange={(e) =>
                  handleAwayPlayersChange(index, {
                    ...awayTeamPlayers[index],
                    name: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
