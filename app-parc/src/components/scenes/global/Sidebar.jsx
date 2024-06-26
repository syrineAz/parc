import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useParams } from "react-router-dom";
import EventIcon from '@mui/icons-material/Event'; // Import de l'icône Event
import ReportIcon from '@mui/icons-material/Report'; // Import de l'icône Report
import BuildIcon from '@mui/icons-material/Build';

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

const Sidebar = ({ setIsSidebar , currentUser}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [showSubItems, setShowSubItems] = useState(false);
  const {reclamationId, reservationId} = useParams()

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
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0 0 0 0",
              color: colors.grey[100],
            }}
          >
            
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml=""
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  InfoParc Manager
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
                  alt="Logo"
                  width="210px"
                  height="190px"
                  src={`../../../public/info-parc.png`}
                  style={{ cursor: "pointer", borderRadius: "20%", }}

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
                <Typography variant="h3"  color={colors.greenAccent[500]}>
                  Welcome {currentUser.name} !
                </Typography>
              </Box>
            </Box>
          )}
          
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            
          
           
            {currentUser && currentUser.role=== 'admin' && (
            <>
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
           
            <SubMenu title="Equipement List" className="pro-menu-item"
            sx={{ m: "15px 0 5px 20px" }} 
            style={{
              color: colors.grey[300],
            }}
            icon={<ContactsOutlinedIcon />}>
              <Item
                title="Equipements"
                to="/AppHome/Categorie"
                selected={selected}
                setSelected={setSelected}
                className="pro-menu-item"
              />
              <Item
                title="Equipements Employés"
                to="/AppHome/EquipementEmployes"
                selected={selected}
                setSelected={setSelected}
                className="pro-menu-item"
              />
            </SubMenu>
            <Item
              title="Réparation"
              to="/AppHome/Reparation"
              icon={<BuildIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Réclamation"
              to="/AppHome/Reclamation"
              icon={<ReportIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Réservation"
              to="/AppHome/Reservation"
              icon={<EventIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Contacts Fournisseurs"
              to="/AppHome/contacts/Fournisseur"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Liste Des Employés"
              to="/AppHome/Form/Users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendrier"
              to="/AppHome/Calendrier"
              icon={<EventIcon/>}
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
            </>
            )}
            {currentUser && currentUser.role ==='employer' && (
              <>
              <Item
              title="Dashboard"
              to="/User"
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
            <SubMenu title="Equipement List" className="pro-menu-item"
            sx={{ m: "15px 0 5px 20px" }} 
            style={{
              color: colors.grey[300],
            }}
            icon={<ContactsOutlinedIcon />}>
              <Item
                title="Equipements"
                to="/User/Categorie"
                selected={selected}
                setSelected={setSelected}
                className="pro-menu-item"
              />
              <Item
                title="Equipements Employés"
                to="/User/EquipementEmployes"
                selected={selected}
                setSelected={setSelected}
                className="pro-menu-item"
              />
            </SubMenu>
            <Item
              title="Réparation"
              to="/User/Reparation"
              icon={<BuildIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Réclamation "
              to="/User/Reclamation"
              icon={<ReportIcon />}
              selected={selected}
              setSelected={setSelected}
             />

            <Item
              title="Réservation "
              to="/User/ListeReservation"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Calendrier"
              to="/User/Calendrier"
              icon={<EventIcon/>}
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
              to="/User/Bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
             />
             <Item
              title="Pie Chart"
              to="/User/Pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
             />
             <Item
              title="Line Chart"
              to="/User/Line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
             />
            </>
            )}
          </Box>
        </Menu>

      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

