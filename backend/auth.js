function logout (req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //Pas de contenu
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie effacé' });
}


import {  useEffect, useState } from 'react'
import axios from '../../api/axios'
import './SideBar.css'
import Items from './Items'
import { useAuth } from '../../context/AuthProvider'
import {useNavigate } from 'react-router-dom'
import { UilHome, UilPackage,UilUsersAlt,UilSignOutAlt,UilUser} from '@iconscout/react-unicons'

export default function SideBar({handleSideBar,openSibeBar}) {
    
    const navigate=useNavigate()
    const auth=useAuth()
    const [selected,setSelected]=useState('home')
    
    useEffect(()=>{
        setSelected(localStorage.getItem("active") ?  localStorage.getItem("active") :'home')
    },[])
    
    const logout = async () => {
        auth.logout()
        try {
          const response = await axios('/logout', {
                withCredentials: true});
            navigate('/')
        } catch (err) {
            console.error(err);
        }}

    const handleActive=(key)=>{
        setSelected(key)
        localStorage.setItem('active',key)
        
    }
    
    if(auth.user?.role=="admin"){
        return (
        <aside  className='side-bar' id={openSibeBar? "sidebar-responsive": ""}>
            <div>
                <img  className="sidebar-logo"  src="../src/pages/images/logo.png" alt="err" />        
            </div>
            <div className='closeSide' onClick={()=>handleSideBar()}>
                X
            </div>
            <ul className='menu-items'>
                <Items link="dashboard" selected={selected} title="Dashboard" icon={<UilHome className="logo-sideBar"/>}  handleActive={handleActive}itemName="home" />
                <Items link="events" selected={selected} title="Events" icon={<UilPackage className="logo-sideBar" />}  handleActive={handleActive} itemName="event" />
                <Items link="users" selected={selected} title="Users" icon={<UilUsersAlt className="logo-sideBar" /> }  handleActive={handleActive} itemName="user" />
                <Items link="profile" selected={selected} title="Profile" icon={<UilUser className="logo-sideBar" />}  handleActive={handleActive} itemName="profile" />
            </ul>
            <button className='logout-button' onClick={logout}>
                <UilSignOutAlt className="logo-sideBar" /> 
                <h3>Logout</h3> 
            </button>
        </aside>
        )
    }else if(auth.user?.role=="manager"){

        return (
            <aside  className='side-bar' id={openSibeBar? "sidebar-responsive": ""}>
                <div>
                    <img  className="sidebar-logo"  src="../src/pages/images/logo.png" alt="err" />        
                </div>
                <div className='closeSide' onClick={()=>handleSideBar()}>
                    X
                </div>
                <ul className='menu-items'>
                    <Items link="dashboard" selected={selected} title="Dashboard" icon={<UilHome className="logo-sideBar"/>}  handleActive={handleActive} itemName="home" />
                    <Items link="events" selected={selected} title="Events" icon={<UilPackage className="logo-sideBar" />}  handleActive={handleActive} itemName="event" />
                    <Items link="profile" selected={selected} title="Profile" icon={<UilUser className="logo-sideBar" />}  handleActive={handleActive} itemName="profile" />
                </ul>
                <button className='logout-button' onClick={logout}>
                    <UilSignOutAlt className="logo-sideBar" /> 
                    <h3>Logout</h3> 
                </button>
            </aside>
            )
    }else if(auth.user?.role=="basic"){
        return (
            <aside  className='side-bar' id={openSibeBar? "sidebar-responsive": ""}>
                <div>
                    <img  className="sidebar-logo"  src="../src/pages/images/logo.png" alt="err" />        
                </div>
                <div className='closeSide' onClick={()=>handleSideBar()}>
                    X
                </div>
                <ul className='menu-items'>
                    <Items link="postevents" selected={selected} title="Events" icon={<UilPackage className="logo-sideBar" />}  handleActive={handleActive} itemName="event" />
                    <Items link="profile" selected={selected} title="Profile" icon={<UilUser className="logo-sideBar" />}  handleActive={handleActive} itemName="profile" />
                </ul>
                <button className='logout-button' onClick={logout}>
                    <UilSignOutAlt className="logo-sideBar" /> 
                    <h3>Logout</h3> 
                </button>
            </aside>
            )
    }
}

import React from 'react'
import { Link } from 'react-router-dom'
export default function Items({itemName,link,title,icon,selected,handleActive}) {

  return (
    <Link to={link} className='link'>
    <li 
        
        className={selected==itemName? "active" :""}
        onClick={()=>handleActive(itemName)}
    >
        {icon}
        <h3>{title}</h3>  
    </li>
</Link>
  )
}





// import { createContext, useEffect, useState } from "react";
// import axios from "../api/axios";

import { createContext,useState,useContext } from "react";

 export const AuthContext = createContext(null);

export  function AuthProvider({children}) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    

  const login =(user)=>{
    localStorage.setItem("user",JSON.stringify(user))
    setUser(user)
  }

  const logout=()=>{
    localStorage.setItem("user",null)
    setUser(null)
  }




    return (
    <AuthContext.Provider value={{ user,login , logout,setUser}}>
       {children}
    </AuthContext.Provider>
  )
}
export const useAuth=()=>{

  return useContext(AuthContext)
}







/*import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ setIsSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
 

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON }/*
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Icar Tech Hub
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="Logo icar"
                  width="100px"
                  height="100px"
                  src={`./logo.png`}
                  style={{ cursor: "pointer", borderRadius: "20%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >

                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                   Smart Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/AppHome"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title=" Equipements List"
              to="/AppHome/Categorie"
              icon={<FontAwesomeIcon icon={faHouseLaptop} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Fournisseurs"
              to="/AppHome/Contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reclamation"
              to="/AppHome/Invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

           
            <Item
              title="Profile Form"
              to="/AppHome/Form"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reclamation User"
              to="/AppHome/Calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/AppHome/Bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/AppHome/Pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/AppHome/Line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
            
          </Box>
        </Menu>

      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
*/


/*useEffect(() => {
        const fetchData = async () => {
            if (errors.email === "" && errors.password === "") {
                try {
                    const response = await axios.post("http://localhost:8081/login", values);
                    if (response.data === 'Success') {
                        navigate('/AppHome');
                        console.log('Succès');
                        console.log(response.data);
                    } else {
                        if (response.data === 'Identifiants incorrects') {
                            alert("Le mot de passe saisi est incorrect");
                        }
                    }
                } catch (err) {
                    console.log(err);
                    console.log('Une erreur s\'est produite lors de la connexion');
                }
            }
        };

        fetchData();
    }, [errors]);*/


