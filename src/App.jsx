import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import { Club } from "./Pages/Club";
import { Organizador } from "./Pages/Organizador";
import { Equipo } from "./Pages/Equipo";
import { Jugadoras } from "./Pages/Jugadoras";
import { Divisiones } from "./Pages/Divisiones";
import { Login } from "./Login/Login";
import { Home } from "./Pages/invitado/Home"
import { Pasados } from "./Pages/invitado/Pasados"
import { Proximos } from "./Pages/invitado/Proximos"
import { Navbar } from "./Components/Navbar/Navbar"
import { Ligas } from "./Pages/invitado/Ligas"
import { Clubes } from "./Pages/invitado/Clubes"
//import Sidebar from "./Components/Sidebar/Sidebar";

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
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
          element: <Organizador />,
        },
        {
          path: "clubs",
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
