import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { SidebarData } from "./SidebarData";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { useAuthStore, useCleanStore } from "hooks";
import { imagePath } from "helpers";

export default function SidebarAdminitrador() {
  const navigate = useNavigate();
  const { startLogout, user } = useAuthStore();
  const { limpiarStores } = useCleanStore();
  return (
    <SideNav
      className="sidenav"
      onSelect={(selected) => {
        if (selected === "/") startLogout();
        limpiarStores();
        navigate(selected);
      }}
    >
      <SideNav.Toggle id="sidenav--toggle" />

      <SideNav.Nav defaultSelected="/administrador">
        <NavItem className="unclickeable">
          <NavIcon>
            <img
              className="sidenav--icon"
              src={
                user.image ? imagePath(user.image) : "img/default_player.png"
              }
            />
          </NavIcon>
          <NavText>
            <span className="sidenav--text fst-italic">{user.name}</span>
          </NavText>
        </NavItem>

        {SidebarData.map((item, index) => {
          return (
            <NavItem eventKey={item.path} key={index}>
              <NavIcon>
                <span className="sidenav--icon">{item.icon}</span>
              </NavIcon>
              <NavText>
                <span className="sidenav--text">{item.title}</span>
              </NavText>
            </NavItem>
          );
        })}
      </SideNav.Nav>
    </SideNav>
  );
}
