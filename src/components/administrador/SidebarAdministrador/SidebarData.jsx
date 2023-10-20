import { FaPeopleGroup, FaPowerOff } from "react-icons/fa6";
import {
  FaHouseUser,
  FaPeopleRoof,
  FaPerson,
  FaTableList,
  FaUserLarge,
} from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

export const SidebarData = [
  {
    title: "Administrador",
    path: "/administrador",
    icon: <FaUserLarge style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Organizadores",
    path: "/administrador/organizadores",
    icon: <FaHouseUser style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Clubes ",
    path: "/administrador/clubes",
    icon: <FaPeopleRoof style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Equipos",
    path: "/administrador/equipos",
    icon: <FaPeopleGroup style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Jugadoras",
    path: "/administrador/jugadoras",
    icon: <FaPerson style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Divisiones",
    path: "/administrador/divisiones",
    icon: <FaTableList style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Salir",
    path: "/",
    icon: <FiLogOut style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
];
