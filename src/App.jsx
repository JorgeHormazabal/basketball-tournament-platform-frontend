import { Navbar } from "components/Navbar/Navbar";
import Sidebar from "components/Sidebar/Sidebar";
import { Club } from "pages/administrador/Club";
import { Divisiones } from "pages/administrador/Divisiones";
import { Equipo } from "pages/administrador/";
import { Jugadores } from "pages/administrador/Jugadores";
import { Organizador } from "pages/administrador/Organizador";
import { Clubes } from "pages/invitado/clubes/Clubes";
import { Home } from "pages/Home/Home";
import { Ligas } from "pages/invitado/Ligas/Ligas";
import { Pasados } from "pages/invitado/Pasados/Pasados";
import { Proximos } from "pages/invitado/Proximos/Proximos";
import { Login } from "pages/invitado/login/Login";
import { Footer } from "components/Footer/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./app.css"

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
              element: <Jugadores />,
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
