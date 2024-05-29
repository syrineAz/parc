import { ColorModeContext, useMode } from './theme';
import React from 'react';
import RoutesLogin from './RoutesLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHome from './AppHome.jsx';
import User from './components/employe/User.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import Unauthorized from './Unauthorized.jsx';
function App() {
  const [theme, colorMode] = useMode();
  
  return (
    <div> 
      <Routes>
        <Route path="/*" element={<RoutesLogin />} />
        <Route path='/Unauthorized' element={<Unauthorized/>}/>

        <Route
            path="/AppHome/*"
            element={<ProtectedRoutes allowedRoles={['admin']} redirectTo="/Unauthorized" element={AppHome} />}
          />
          <Route
            path="/User/*"
            element={<ProtectedRoutes allowedRoles={['employer']} redirectTo="/Unauthorized" element={User} />}
          />
        
      </Routes>
      <ToastContainer/> 
    </div>  
  );
}

export default App
   