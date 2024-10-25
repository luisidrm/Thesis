import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Mapa from './pages/Mapa.jsx'
import GeoComponent from './pages/Geo.jsx'
import './App.css'
import View from './pages/Mapa.jsx'
import AddSchool from './pages/AddSchool.jsx'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<View/>}/>
          <Route path='/geo' element = {<GeoComponent/>}/>
          <Route path='/escuela' element = {<AddSchool/>}/>
          </Routes>
      </BrowserRouter>


    </div>
    
  )
}

export default App
