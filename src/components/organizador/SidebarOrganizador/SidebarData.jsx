import { FaBasketball, FaUserLarge } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

export const SidebarData = [
  {
    title: "Organizador",
    path: "/organizador",
    icon: <FaUserLarge style={{ fontSize: "1.75em" }} />,
    cName: "nav-text",
  },
  {
    title: "Ligas",
    path: "/organizador/ligas",
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
