import { FaPeopleGroup } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Organizadores",
    path: "/",
    icon: <FaHouseUser style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Clubes ",
    path: "/clubes",
    icon: <FaPeopleRoof style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Equipos",
    path: "equipos",
    icon: <FaPeopleGroup style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Jugadoras",
    path: "/jugadoras",
    icon: <FaPerson style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Divisiones",
    path: "/divisiones",
    icon: <FaTableList style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/login",
    icon: <FaUserCircle style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
];