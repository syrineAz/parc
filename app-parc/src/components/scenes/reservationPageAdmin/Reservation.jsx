import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import '../ReclamationPageEmploye/reclamation.css'
import { Pagination } from '@mui/material'

function Reservation() {
  const { ReservationId } = useParams()
  const [reservation, setReservation]= useState(null)
  console.log(ReservationId)
  useEffect (()=>{
    const fetchReclamationDetails = async() =>{
      try{
        const response= await axios.get(`http://localhost:8081/AfficheDetailsReservation/${ReservationId}`)
        console.log(response.data)
        setReservation(response.data)
      }catch(error){
        console.error(error)
      }
    }
    fetchReclamationDetails();
  },[ReservationId])
  if(!reservation){
    return <div>loading ....</div>
  }
  return (
    <div>
      <p>Email: {reservation.email}</p>
      <p>Numéro de série: {reservation.NumSerie}</p>
      <p>Nom de l'équipement: {reservation.nameEquipement}</p>
      <p>Catégorie: {reservation.categorie}</p>
    </div>
  );
}


export default Reservation;