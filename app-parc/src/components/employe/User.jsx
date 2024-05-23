import React, {useState ,useEffect} from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme.js';
import Topbar from '../scenes/global/Topbar.jsx';
import Sidebar from '../scenes/global/Sidebar.jsx';
import Dashboard from '../scenes/dashboard/index';
import {Routes ,Route} from 'react-router-dom';
import Categorie from '../scenes/equipement/Categorie.jsx';
import Reclamation from '../scenes/ReclamationPageEmploye/Reclamation.jsx';
import Bar from '../scenes/bar/index.jsx';
import Pie from '../scenes/pie/index.jsx';
import Line from '../scenes/line/index.jsx';
import CardDetails from '../scenes/equipement/CardDetails.jsx'
import EquipementEmployes from '../scenes/EquipementEmployes/EquipementEmployes.jsx'
import Envoyer from '../scenes/ReclamationPageEmploye/Envoyer.jsx';
import Reservation from '../scenes/equipement/Reservation.jsx';
import Modifier from '../scenes/ReclamationPageEmploye/Modifier.jsx';
import ListeReservation from '../scenes/equipement/ListeReservation.jsx';
import ModifierReservation from '../scenes/equipement/ModifierReservation.jsx';
function User() {
  const [theme, colorMode ,toggleColorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedMode = localStorage.getItem('colorMode');
    if (storedMode) {
      toggleColorMode();
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
    console.log(userData)
  }, [toggleColorMode]);
  const handleToggleSidebar = () => {
    setIsSidebar(!isSidebar);
  }; 
  return (
    <div>
       <ColorModeContext.Provider value={colorMode}>
       <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">          
          {user && <Sidebar isSidebar={isSidebar} currentUser={user} />}
            <main className="content">
              <Topbar setIsSidebar={handleToggleSidebar}/> 
              <Routes>
                <Route path="/*" element={<Dashboard />} />
                <Route path="/Reclamation/*" element={<Reclamation />} />
                <Route path="/Reclamation/Envoyer" element={<Envoyer />} />
                <Route path="/Reclamation/Modifier/:id" element={<Modifier />} />

                <Route path="/Bar/*" element={<Bar />} />
                <Route path="/Pie/*" element={<Pie />} />
                <Route path="/Line/*" element={<Line />} />   
                <Route path="/EquipementEmployes/*" element={<EquipementEmployes />} />   
                <Route path="/ListeReservation/*" element={<ListeReservation />} />   
                <Route path="/ListeReservation/ModifierReservation/:id" element={<ModifierReservation />} />   

                {user.role ==="employer"&&(       
                <>
                  <Route path='/Categorie/*' element={<Categorie/>}/>
                  <Route path="/Categorie/:title/:id" element={<CardDetails />} />
                  <Route path='/Categorie/:title/:id/Reservation' element={<Reservation/>}/>

                </>
                )} 
              </Routes>
            </main>
          </div> 
       </ThemeProvider>
    </ColorModeContext.Provider>
    </div>
  )
}

export default User
