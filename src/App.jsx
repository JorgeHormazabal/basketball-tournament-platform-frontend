import { Navbar } from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";
import { Club } from "pages/administrador/Club";
import { Divisiones } from "pages/administrador/Divisiones";
import { Equipo } from "pages/administrador/";
import { Jugadoras } from "pages/administrador/Jugadoras";
import { Organizador } from "pages/administrador/Organizador";
import { Clubes } from "pages/invitado/Clubes";
import { Home } from "pages/invitado/Home";
import { Ligas } from "pages/invitado/Ligas";
import { Pasados } from "pages/invitado/Pasados";
import { Proximos } from "pages/invitado/Proximos";
import { Login } from "pages/invitado/login/Login";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

const PublicLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Outlet />
    </>
  );
};

const AdminLayout = () => {
  return (
    <>
      <Sidebar />
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
              path: "organizadores",
              element: <Organizador />,
            },
            {
              path: "clubes",
              element: <Club />,
            },
            {
              path: "equipos",
              element: <Equipo />,
            },
            {
              path: "jugadoras",
              element: <Jugadoras />,
            },
            {
              path: "divisiones",
              element: <Divisiones />,
            },
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
