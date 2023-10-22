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
} from "pages/administrador/";
import { PerfilClub, JugadoresClub, EquiposClub, LigasClub } from "pages/club/";
import { Estadisticas } from "pages/club/Estadisticas";
import { Clubes, Home, Ligas, Pasados, Proximos, Login } from "pages/invitado/";
import { PerfilOrganizador, LigasOrganizador } from "pages/organizador/";
import EditarLigaOrganizador from "pages/organizador/EditarLigaOrganizador";

const PublicLayout = () => {
  return (
    <>
      <div className="App">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

const ClubLayout = () => {
  return (
    <>
      <SidebarClub />
      <Outlet />
    </>
  );
};

const OrganizadorLayout = () => {
  return (
    <>
      <SidebarOrganizador />
      <Outlet />
    </>
  );
};

const AdminLayout = () => {
  return (
    <>
      <SidebarAdministrador />
      <Outlet />
    </>
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
