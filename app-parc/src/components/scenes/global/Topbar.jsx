import { Box, IconButton, useTheme , Menu, MenuItem} from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import {io} from 'socket.io-client'
import {Badge} from "@mui/material";
import { boolean } from "yup";
const socket = io('http://localhost:3000')

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate= useNavigate()
  const [anchorEl, setAnchorEl] = useState(null); 
  const [notificationAncorEl, setNotificationAncrolEl] = useState(null)
  const [notifications , setNotifications ] = useState([]);
  const {reclamationId, reservationId} = useParams()

  useEffect(()=>{

    
    socket.on('nouvelle_reclamation_admin',(notification)=>{
      console.log("nouvelle notification réçue",notification )
      setNotifications((prevNotifications)=> [...prevNotifications , {...notification , type:'reclamation'}])
      console.log(notification)
    })
    socket.on('nouvelle_reservation_admin',(reservation)=>{
      console.log("nouvelle réservation réçue",reservation)
      setNotifications((prevNotifications)=> [...prevNotifications , {...reservation, type:'reservation'}])
    })
    return ()=>{
      socket.off('nouvelle_reclamation_admin')
      socket.off('nouvelle_reservation_admin')
    }
  },[])


  const handleNotificationClick = ((e)=>{
    setNotificationAncrolEl(e.currentTarget)
  })
  const handleNotificationClose = (()=>{
    setNotificationAncrolEl(null)
  })
  const handleNotificationSelect = (notification)=>{
    if(notification.type ==='reclamation' ){
      navigate(`/AppHome/Reclamation/${reclamationId}`)
    }else if(notification.type === 'reservation'){
      navigate(`/AppHome/Reservation/${reservationId}`)
    }
    setNotificationAncrolEl(null)
  }
  const logout = async () => {
    try {
      const response= await axios ('/logout', {withCredentials: true})
      console.log(response)
      navigate('/');
      localStorage.removeItem('userData');
    } catch (err) {
      console.error(err); 
    }
  };
  const [user, setUser] = useState("");
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  },[])

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 10, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1.5 }}>
          <SearchIcon /> 
        </IconButton> 
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton color="inherit" onClick={colorMode.toggleColorMode}  sx={{ marginRight: 4 }}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>


        <>
        {user && user.role==='admin' && (
        <IconButton color="inherit" onClick={handleNotificationClick} sx={{ marginRight: 4 }}>
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsOutlinedIcon />
          </Badge> 
        </IconButton>)}
        <Menu anchorEl={notificationAncorEl} open={Boolean(notificationAncorEl)} onClose={handleNotificationClose}>
          {notifications.map((notification, index)=>(
            <MenuItem key={index} onClick={()=> handleNotificationSelect(notification)}>
              {notification.type ==='reclamation' ?
                `${notification.nameUser} a envoyé une réclamation`
                :`${notification.nameUser} a envoyé une réservation`
              }
            </MenuItem>
          ))}
          {notifications.length === 0 && <MenuItem disabled>Aucune notification</MenuItem> }
        </Menu>
       </>
        
        <IconButton  onClick={(event) => setAnchorEl(event.currentTarget)} color="inherit"  sx={{ marginRight: 3 }}>
          <SettingsOutlinedIcon/>         
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: {
              maxHeight: 200,
              width: '10ch',
            },
          }}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
       { /*<IconButton>
          <PersonOutlinedIcon />
        </IconButton>*/}
      </Box>
    </Box>
  );
};

export default Topbar;
