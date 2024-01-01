import {
  Footer,
  Navbar,
  SidebarAdministrador,
  SidebarClub,
  SidebarOrganizador,
} from "components/";
import NotFound from "pages/NotFound";
import {
  Club,
  Divisiones,
  EditarLigaAdministrador,
  Equipos,
  Jugadores,
  LigasAdministrador,
  Organizador,
  PerfilAdmin,
} from "pages/administrador/";
import {
  EquiposClub,
  EstadisticaPartido,
  JugadoresClub,
  LigasClub,
  PerfilClub,
} from "pages/club/";
import {
  Clubes,
  Home,
  Ligas,
  Login,
  Organizadores,
  Pasados,
  Proximos,
} from "pages/invitado/";
import {
  EditarLigaOrganizador,
  LigasOrganizador,
  PerfilOrganizador,
} from "pages/organizador/";
import ControlPanel from "pages/panel/ControlPanel/ControlPanel";
import ShortClockContainer from "pages/relojPosesion/ShortClockContainer/ShortClockContainer";
import Scoreboard from "pages/tablero/Scoreboard/Scoreboard";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.css";

const PublicLayout = () => {
  return (
    <>
      <div className="App pages">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

const ClubLayout = () => {
  return (
    <div className="pages">
      <SidebarClub className="sidebar" />
      <Outlet className="outlet" />
    </div>
  );
};

const OrganizadorLayout = () => {
  return (
    <div className="pages">
      <SidebarOrganizador className="sidebar" />
      <Outlet className="outlet" />
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div className="pages">
      <SidebarAdministrador className="sidebar" />
      <Outlet className="outlet" />
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      children: [
        {
          path: "administrador",
          element: <AdminLayout />,
          children: [
            {
              path: "",
              element: <PerfilAdmin />,
            },
            {
              path: "organizadores",
              element: <Organizador />,
            },
            {
              path: "clubes",
              element: <Club />,
            },
            {
              path: "equipos",
              element: <Equipos />,
            },
            {
              path: "jugadoras",
              element: <Jugadores />,
            },
            {
              path: "divisiones",
              element: <Divisiones />,
            },
            {
              path: "ligas",
              element: <LigasAdministrador />,
            },
            {
              path: "liga",
              element: <EditarLigaAdministrador />,
            },
          ],
        },
        {
          path: "club",
          element: <ClubLayout />,
          children: [
            {
              path: "",
              element: <PerfilClub />,
            },
            {
              path: "equipos",
              element: <EquiposClub />,
            },
            {
              path: "jugadores",
              element: <JugadoresClub />,
            },
            {
              path: "ligas",
              element: <LigasClub />,
            },
            {
              path: "estadistica-partido/:equipoId/:partidoId",
              element: <EstadisticaPartido />,
            },
          ],
        },
        {
          path: "organizador",
          element: <OrganizadorLayout />,
          children: [
            { path: "", element: <PerfilOrganizador /> },
            { path: "ligas", element: <LigasOrganizador /> },
            { path: "liga", element: <EditarLigaOrganizador /> },
          ],
        },
        {
          path: "/",
          element: <PublicLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "pasados",
              element: <Pasados />,
            },
            {
              path: "proximos",
              element: <Proximos />,
            },
            {
              path: "ligas",
              element: <Ligas />,
            },
            {
              path: "clubes",
              element: <Clubes />,
            },
            {
              path: "organizadores",
              element: <Organizadores />,
            },
          ],
        },
        { path: "tablero/:matchId", element: <Scoreboard /> },
        { path: "panel/:matchId", element: <ControlPanel /> },
        { path: "tablero/:matchId/reloj", element: <ShortClockContainer /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: "/tromu/",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
