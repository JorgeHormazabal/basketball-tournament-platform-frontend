import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { SidebarData } from "./SidebarData";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <SideNav
      className="sidenav"
      onSelect={(selected) => {
        navigate(selected);
      }}
    >
      <SideNav.Toggle id="sidenav--toggle" />
      <SideNav.Nav defaultSelected="/">
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
