import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import { Navbar } from './Components/Navbar'
import { Club } from './Pages/Club'
import { Organizador } from './Pages/Organizador'
import { Equipo } from './Pages/Equipo'

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
        path: "club",
        element: <Club />,
      },
      {
        path: "equipo",
        element: <Equipo />,
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
