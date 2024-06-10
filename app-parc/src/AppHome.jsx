import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme.js';
import Topbar from './components/scenes/global/Topbar.jsx';
import Sidebar from './components/scenes/global/Sidebar.jsx';
import React from 'react';
import {   Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/scenes/dashboard/index';
import Contacts from './components/scenes/contacts/index.jsx';
import Form from './components/scenes/form/index.jsx';
import Bar from './components/scenes/bar/index.jsx';
import Pie from './components/scenes/pie/index.jsx';
import Line from './components/scenes/line/index.jsx';
import Geography from './components/scenes/geography/index.jsx';
import Users from './components/scenes/form/Users.jsx'
import Edit from './components/scenes/form/Edit.jsx';
import EditEquipement from './components/scenes/equipement/EditEquipement.jsx'
import { useState, useEffect  } from 'react';
import Categorie from './components/scenes/equipement/Categorie.jsx';
import Equipement from './components/scenes/equipement/Equipement.jsx';
import Fournisseur from './components/scenes/contacts/Fournisseur.jsx';
import EditFournisseur from './components/scenes/contacts/EditFournisseur.jsx';
import CardDetails from './components/scenes/equipement/CardDetails.jsx';
import EquipementEmployes from './components/scenes/EquipementEmployes/EquipementEmployes.jsx'
import Ajouter from './components/scenes/EquipementEmployes/Ajouter.jsx';
import Modifier from './components/scenes/EquipementEmployes/Modifier.jsx';
import Reclamation from './components/scenes/NotificationPageAdmin/Reclamation.jsx';
import Reservation from './components/scenes/reservationPageAdmin/Reservation.jsx';
import Calendrier from './components/scenes/Calendrien/Calendrier.jsx';
import Reparation from './components/scenes/reparation/Reparation.jsx'
import Add from './components/scenes/reparation/Add.jsx';
import EditReparation from './components/scenes/reparation/EditReparation.jsx';
function AppHome() {
  const [theme, colorMode ,toggleColorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState("");
 /* useEffect(() => {
    const storedMode = localStorage.getItem('colorMode');
    if (storedMode) {
      toggleColorMode();
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
    
  }, [toggleColorMode]);

 
  const navigate= useNavigate()
  if (!user || user.role !== 'admin') {
    navigate('/Unauthorized'); // Rediriger si l'utilisateur n'est pas admin
    return null; // Ou afficher un message d'erreur, etc.
  }*/
   const handleToggleSidebar = () => {
    setIsSidebar(!isSidebar);
  }; 
  const navigate = useNavigate();
  useEffect(() => {
    const storedMode = localStorage.getItem('colorMode');
    if (storedMode) {
      toggleColorMode();
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);

    // Vérifie si l'utilisateur est connecté et a le rôle d'admin
    if (!userData || userData.role !== 'admin') {
      navigate('/Unauthorized'); // Rediriger si l'utilisateur n'est pas admin
    }
  }, [toggleColorMode, navigate]);
  return (
  <div>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">          
            {user && <Sidebar isSidebar={isSidebar} currentUser={user} />}
            <main className="content">
              <Topbar setIsSidebar={handleToggleSidebar}  /> 
              <Routes>
                <Route path="/*" element={<Dashboard />} />
                <Route path='/Categorie' element={<Categorie/>} />
                <Route path="/Categorie/:title/:id" element={<CardDetails />} />
                <Route path='/Categorie/:title/:id/Equipement' element={<Equipement/>}/>          
                <Route path="/Fournisseur/*" element={<Contacts />} />
                <Route path="/Form/*" element={<Form />} />
                <Route path="/Bar/*" element={<Bar />} />
                <Route path="/Pie/*" element={<Pie />} />
                <Route path="/Line/*" element={<Line />} />
                <Route path="/Geography/*" element={<Geography />} /> 
                <Route path='/Form/Users/*' element={<Users/>}/>   
                <Route path='/Form/Users/Edit/:userid' element={<Edit/>}/>   
                <Route path="/Contacts/Fournisseur" element={<Fournisseur />} />
                <Route path='/Contacts/Fournisseur/EditFournisseur/:userid' element={<EditFournisseur/>}/>   
                <Route path='/Categorie/:title/:id/EditEquipement/:item_idEquipement' element={<EditEquipement/>} />
                <Route path="/EquipementEmployes/*" element={<EquipementEmployes />} />
                <Route path="/EquipementEmployes/Ajouter" element={<Ajouter />} />
                <Route path="/EquipementEmployes/Modifier/:id" element={<Modifier />} />
                <Route path="/Reclamation/*" element={<Reclamation />} />
                <Route path="/Reservation/*" element={<Reservation />} />
                <Route path="/Calendrier/*" element={<Calendrier />} />
                <Route path="/Reparation/*" element={<Reparation />} />
                <Route path="/Reparation/Add/*" element={<Add />} />
                <Route path="/Reparation/EditReparation/:id" element={<EditReparation />} />

              </Routes>
            </main>
          </div> 
      </ThemeProvider>
    </ColorModeContext.Provider>
  </div>  
);
}
export default AppHome

