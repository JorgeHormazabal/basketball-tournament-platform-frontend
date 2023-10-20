import { FaBasketball, FaPeopleGroup, FaPowerOff } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaHouseChimney } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

export const SidebarData = [
  {
    title: "Club",
    path: "/club",
    icon: <FaHouseChimney style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Equipos",
    path: "/club/equipos",
    icon: <FaPeopleGroup style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Jugadoras",
    path: "/club/jugadores",
    icon: <FaPerson style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Ligas",
    path: "/club/ligas",
    icon: <FaBasketball style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Salir",
    path: "/",
    icon: <FiLogOut style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
];
