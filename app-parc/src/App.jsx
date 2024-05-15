import { ColorModeContext, useMode } from './theme';
import React from 'react';
import RoutesLogin from './RoutesLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHome from './AppHome.jsx';
import User from './components/employe/User.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [theme, colorMode] = useMode();
 
  return (
    <div> 
      <Routes>
        <Route path="/*" element={<RoutesLogin />} />
        <Route path="/AppHome/*" element={<AppHome />} />    
        <Route path='/User/*' element={<User/>}/>
        
      </Routes>
      <ToastContainer/> 
    </div>  
  );
}

export default App
   