import './App.css'
import SideBar from './Components/SideBar'
import Navbar from './Components/Navbar'
import PlaylistPage from './Pages/PlaylistPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import NoPage from './Pages/NoPage'
import HomePage from './Pages/HomePage'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="playlist" element={<PlaylistPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
