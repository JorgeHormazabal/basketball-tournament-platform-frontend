import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./app.css";
import {
  Navbar,
  Footer,
  SidebarAdministrador,
  SidebarClub,
  SidebarOrganizador,
} from "components/";
import {
  PerfilAdmin,
  Equipos,
  Jugadores,
  Divisiones,
  Club,
  Organizador,
  LigasAdministrador,
  EditarLigaAdministrador,
} from "pages/administrador/";
import {
  PerfilClub,
  JugadoresClub,
  EquiposClub,
  LigasClub,
  EstadisticaPartido,
  Estadisticas,
} from "pages/club/";
import { Clubes, Home, Ligas, Pasados, Proximos, Login } from "pages/invitado/";
import {
  PerfilOrganizador,
  LigasOrganizador,
  EditarLigaOrganizador,
} from "pages/organizador/";
import Scoreboard from "pages/tablero/Scoreboard/Scoreboard";
import ControlPanel from "pages/panel/ControlPanel/ControlPanel";
import ShortClockContainer from "pages/relojPosesion/ShortClockContainer/ShortClockContainer";

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
              path: "estadisticas",
              element: <Estadisticas />,
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
          ],
        },
        { path: "tablero/:matchId", element: <Scoreboard /> },
        { path: "panel/:matchId", element: <ControlPanel /> },
        { path: "tablero/:matchId/reloj", element: <ShortClockContainer /> },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.DEV
      ? "/"
      : "/basketball-tournament-platform-frontend/",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
