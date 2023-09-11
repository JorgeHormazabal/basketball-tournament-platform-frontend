import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Clubes } from './Pages/Clubes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Clubes/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
