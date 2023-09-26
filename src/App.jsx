import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import { Navbar } from './Components/Navbar'
import { Club } from './Pages/Club'
import { Organizador } from './Pages/Organizador'
import { Equipo } from './Pages/Equipo'
import { Jugadoras } from './Pages/Jugadoras'
import { Divisiones } from './Pages/Divisiones'

const AppLayout = () => (
  <>
    <Navbar/>
    <Outlet/>
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
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
    ]
  }
], { basename: import.meta.env.DEV ? '/' : '/basketball-tournament-platform-frontend/' }); 

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
