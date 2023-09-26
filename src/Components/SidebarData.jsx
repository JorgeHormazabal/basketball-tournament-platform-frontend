import { FaPeopleGroup } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa6";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaTableList } from "react-icons/fa6";

export const SidebarData = [
  {
    title: "Organizadores",
    path: "/",
    icon: <FaHouseUser/>,
    cName: "nav-text",
  },
  {
    title: "Clubes ",
    path: "/clubes",
    icon: <FaPeopleRoof/>,
    cName: "nav-text",
  },
  {
    title: "Equipos",
    path: "/equipos",
    icon: <FaPeopleGroup />,
    cName: "nav-text",
  },
  {
    title: "Jugadoras",
    path: "/jugadoras",
    icon:  <FaPerson/>,
    cName: "nav-text",
  },
  {
    title: "Divisiones",
    path: "/divisiones",
    icon: <FaTableList/>,
    cName: "nav-text",
  },
];