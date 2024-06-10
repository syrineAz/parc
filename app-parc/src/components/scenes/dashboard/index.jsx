import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../data/mockData";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportIcon from '@mui/icons-material/Report'; // Import de l'icône Report
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import EventIcon from '@mui/icons-material/Event'; // Import de l'icône Event
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import StorageIcon from '@mui/icons-material/Storage';
import PrintIcon from '@mui/icons-material/Print';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import LaptopIcon from '@mui/icons-material/Laptop';
import RouterIcon from '@mui/icons-material/Router';
import { useEffect, useState } from "react";
import axios from "axios";
import AccountsTable from "../../components/AccountsTable";
import EventList from "../../components/EventList";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employeCount, setEmployeCount] = useState(0)
  const [fournisseurCount, setFournisseurCount] = useState(0)
  const [ReclamationCount, setReclamationCount]= useState(0)
  const [ReservationCount, setReservationCount]= useState(0)
  const [OrdinateursCount, setOrdinateursCount]= useState(0)
  const [ReseauxCount, setReseauxCount]= useState(0)
  const [peripheriqueCount, sePeripheriqueCount]=useState(0)
  const [imprimanteCount, setImprimanteCount]= useState(0)
  const [EcransCount,setEcransCount]=useState(0)
  const [AccessoiresCount,setAccessoiresCount]= useState(0)
  const [AccesoiresCablageCount, setAccesoiresCablageCount]= useState(0)
  const [reparationCount, setReparationCount] = useState(0)
  const [affecterCount, setAffecterCount] = useState(0)
  useEffect(()=>{
    const fetchaffectation= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/affecterCount')
        setAffecterCount(response.data.affecterCount)
        //console.log(response.data.AccesoiresCablageCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombrees réparations ', error)
      }
    }
    fetchaffectation();
  },[])
  useEffect(()=>{
    const fetchReparation= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/reparationCount')
        setReparationCount(response.data.reparationCount)
      //  console.log(response.data.AccesoiresCablageCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombrees réparations ', error)
      }
    }
    fetchReparation();
  },[])
  useEffect(()=>{
    const fetchAccesoiresCablage= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/AccesoiresCablageCount')
        setAccesoiresCablageCount(response.data.AccesoiresCablageCount)
      //  console.log(response.data.AccesoiresCablageCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre d\'employe', error)
      }
    }
    fetchAccesoiresCablage();
  },[])
  useEffect(()=>{
    const fetchAccessoires= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/AccesoiresCount')
        setAccessoiresCount(response.data.AccessoiresCount)
      //  console.log(response.data.AccessoiresCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre d\'employe', error)
      }
    }
    fetchAccessoires();
  },[])
  useEffect(()=>{
    const fetchEcrans= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/EcransCount')
        setEcransCount(response.data.EcransCount)
      //  console.log(response.data.EcransCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre d\'employe', error)
      }
    }
    fetchEcrans();
  },[])

  useEffect(()=>{
    const fetchImprimante= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/ImprimanteCount')
        setImprimanteCount(response.data.imprimanteCount)
      //  console.log(response.data.imprimanteCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre d\'employe', error)
      }
    }
    fetchImprimante();
  },[])

  useEffect(()=>{
    const fetchPeripherique= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/PeripheriqueCount')
        sePeripheriqueCount(response.data.peripheriqueCount)
        //console.log(response.data.peripheriqueCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre d\'employe', error)
      }
    }
    fetchPeripherique();
  },[])
  useEffect(()=>{
    const fetchReseaux= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/ReseauxCommunicationCount')
        setReseauxCount(response.data.ReseauxCount)
      //  console.log(response.data.ReseauxCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre d\'employe', error)
      }
    }
    fetchReseaux();
  },[])
  useEffect(()=>{
    const fetchEmploye= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/EmployeCount')
        setEmployeCount(response.data.employeCount)
      //  console.log(response.data.employeCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre d\'employe', error)
      }
    }
    fetchEmploye();
  },[])

  useEffect(()=>{
    const fetchFournisseur= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/fournisseurCount')
        setFournisseurCount(response.data.fournisseurCount)
      //  console.log(response.data.fournisseurCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre des fournisseur', error)
      }
    }
    fetchFournisseur();
  },[])
  useEffect(()=>{
    const fetchReclamation= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/ReclamationCount')
        setReclamationCount(response.data.ReclamationCount)
       // console.log(response.data.ReclamationCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre des fournisseur', error)
      }
    }
    fetchReclamation();
  },[])
  useEffect(()=>{
    const fetchReservation= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/ReservationCount')
        setReservationCount(response.data.ReservationCount)
        //console.log(response.data.ReservationCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre des fournisseur', error)
      }
    }
    fetchReservation();
  },[])
  useEffect(()=>{
    const fetchOridnateurs= async()=>{
      try{
        const response = await axios.get('http://localhost:8081/OrdinateursCount')
        setOrdinateursCount(response.data.OrdinateursCount)
       // console.log(response.data.OrdinateursCount)
      }catch(error){
        console.error('erreurs lors de la recuperation du nombre des fournisseur', error)
      }
    }
    fetchOridnateurs();
  },[])
  
  

  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle="Bienvenue sur votre tableau de bord" />
        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={ReclamationCount !== null ? ReclamationCount.toString() : 'Loading...'}
            subtitle="Les Réclamations"
            progress={ReclamationCount !== null ? ReclamationCount / 100 : 0}
            increase=""
            icon={
              <ReportIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={ReservationCount !== null ? ReservationCount.toString() : 'Loading...'}
            subtitle="Les Réservations"
            progress={ReservationCount !== null ? ReservationCount / 100 : 0}
            increase=""
            icon={
              <EventIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          <StatBox
            title={employeCount !== null ? employeCount.toString() : 'Loading...'}
            subtitle="Les Employés"
            progress={employeCount !== null ? employeCount / 100 : 0}
            increase=""
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}

              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={fournisseurCount !== null ? fournisseurCount.toString() : 'Loading...'}
            subtitle="Les Fournisseurs"
            progress={fournisseurCount !== null ? fournisseurCount / 100 : 0}
            increase=""
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={OrdinateursCount !== null ? OrdinateursCount.toString() : 'Loading...'}
            subtitle="Les Ordinateurs"
            progress={OrdinateursCount !== null ? OrdinateursCount / 100 : 0}
            increase=""
            icon={
              <ContactsOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={ReseauxCount !== null ? ReseauxCount.toString() : 'Loading...'}
            subtitle="Réseaux et communication"
            progress={ReseauxCount !== null ? ReseauxCount / 100 : 0}
            increase=""
            icon={
              <NetworkWifiIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={peripheriqueCount !== null ? peripheriqueCount.toString() : 'Loading...'}
            subtitle="Périphériques de stockage"
            progress={peripheriqueCount !== null ? peripheriqueCount / 100 : 0}
            increase=""
            icon={
              <StorageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={imprimanteCount !== null ? imprimanteCount.toString() : 'Loading...'}
            subtitle="Imprimantes et scanners"
            progress={imprimanteCount !== null ? imprimanteCount / 100 : 0}
            increase=""
            icon={
              <PrintIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={EcransCount !== null ? EcransCount.toString() : 'Loading...'}
            subtitle="Écrans et moniteurs"
            progress={EcransCount !== null ? EcransCount / 100 : 0}
            increase=""
            icon={
              <DesktopWindowsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={AccessoiresCount !== null ? AccessoiresCount.toString() : 'Loading...'}
            subtitle="Accessoires informatiques"
            progress={AccessoiresCount !== null ? AccessoiresCount / 100 : 0}
            increase=""
            icon={
              <LaptopIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={AccesoiresCablageCount !== null ? AccesoiresCablageCount.toString() : 'Loading...'}
            subtitle="Accessoires de câblage et connectique"
            progress={AccesoiresCablageCount !== null ? AccesoiresCablageCount / 100 : 0}
            increase=""
            icon={
              <RouterIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
         
        </Box> 
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={reparationCount !== null ? reparationCount.toString() : 'Loading...'}
            subtitle="Les équipements en réparation"
            progress={reparationCount !== null ? reparationCount / 100 : 0}
            increase=""
            icon={
              <RouterIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={affecterCount !== null ? affecterCount.toString() : 'Loading...'}
            subtitle="Les équipements déjà affecter"
            progress={affecterCount !== null ? affecterCount / 100 : 0}
            increase=""
            icon={
              <CheckCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
          
        </Box>  
      </Box>
      <Box display="flex" gap="30px">
      <Box
        gridColumn="span 12"
        backgroundColor={colors.primary[400]}
        p="10px"
        mt={3}
        maxHeight="400px"
        overflow="auto"
        width="510px"  
      >
        <AccountsTable />
      </Box>
      <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={3}
          maxHeight="500px"
          overflow="auto"
          width="500px"  
    
        >
          <EventList />
        </Box>
      </Box>  
      <Box>

      </Box>
    </Box>
  );
};
export default Dashboard;