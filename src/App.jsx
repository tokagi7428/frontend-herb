import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from './pages/Chatbots/Chatbot';
import Herbs from './pages/Herbs/Herbs';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import MapPage from './pages/MapPage';
import Register from './pages/Register/Register';
import Navbar from './components/navbar/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Admin from './admin/Admin';
import FarmEdit from './admin/Farms/FarmEdit';
import FarmAdmin from './admin/Farms/FarmAdmin';
import FarmAdd from './admin/Farms/FarmAdd';
import Farms from './pages/Farms/Farms';
import HerbAdd from './admin/Herbs/HerbAdd';
import HerbEdit from './admin/Herbs/HerbEdit';
import HerbId from './pages/Herbs/HerbId';
import Footer from './components/footer/Footer';
import Preloader from './components/preloader/Preloader';
import SendImage from './pages/SendImage';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  setTimeout(() => {
    setIsLoading(false)
  }, 3000)
  return (
    isLoading ? <Preloader /> :
      <div className="relative">
        <Router>
          <Navbar />
          <Chatbot />
          <ToastContainer limit={3} position="top-center" />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sendImage' element={<SendImage />} />
            <Route path='/map' element={<MapPage />} />
            <Route path='/herbs' element={<Herbs />} />
            <Route path='/herb/:id' element={<HerbId />} />
            <Route path='/farm/:id' element={<Farms />} />
            <Route path='/chatbot' element={<Chatbot />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/farm/add' element={<FarmAdd />} />
            <Route path='/admin/farm/edit/:id' element={<FarmEdit />} />
            <Route path='/admin/farmAdmin/:id' element={<FarmAdmin />} />
            <Route path='/admin/herb/add' element={<HerbAdd />} />
            <Route path='/admin/herb/edit/:id' element={<HerbEdit />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </div>
  )
}



export default App