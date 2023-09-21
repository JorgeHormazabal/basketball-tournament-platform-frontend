import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import { Clubes } from './Pages/Clubes'
import { Home } from './Pages/Home'
import { Home2 } from './Pages/Home2'
import { Navbar } from './Components/Navbar'

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
        element: <Home />,
      },
      {
        path: "clubes",
        element: <Clubes />,
      },
      {
        path: "home2",
        element: <Home2 />,
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
