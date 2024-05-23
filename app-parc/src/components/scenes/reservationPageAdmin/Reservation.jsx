import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import '../ReclamationPageEmploye/reclamation.css'
import { Pagination } from '@mui/material'
import { toast } from 'react-toastify'; 
import '../ReclamationPageEmploye/reclamation.css'

function Reservation() {
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationPerPage]= useState(5)
  const [currentPage, setCurrentPage]= useState(1)

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/AfficheReservation');
        setReservation(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservation :', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReclamations();
  }, []);

  const handleToggleDetails = (index) => {
    setReservation(prevReservation => prevReservation.map((res, i) => (
      i === index ? { ...res, showDetails: !res.showDetails } : res
    )));
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  const updateReservationStatus = (id, status) => {
    setReservation(reservation.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleAccept = async (id)=>{
    try{
      const response=  await axios.post('http://localhost:8081/AcceptReservation', { id, status: 'acceptée' })
      console.log(response.data)
      toast.success('Acceptation envoyer ')
      updateReservationStatus(id, 'acceptée');    }
    catch(error){
      console.error(error)
      toast.error("l'acceptation n'est pas envoyer ")
    }
  }

  const handleRefuse = async(id)=>{
    try{
      const response = await axios.post('http://localhost:8081/RefusReservation', { id, status: 'refusée' })
      toast.success('Réservation refusée')
      updateReservationStatus(id, 'refusée');
    }
    catch(error){
      console.error(error)
      toast.error("le refus n'est pas envoyer ")
    }
  }
  const indexOfLastReservation= currentPage * reservationPerPage;
  const indexOfFirstReservation = indexOfLastReservation-reservationPerPage;
  const currentReservation= reservation.slice(indexOfFirstReservation,indexOfLastReservation) 
  
  const paginate= (event,pageNumber) =>{
    setCurrentPage(pageNumber)
  }
 

  return (
    <div className="reclamation-container">
        <h1> liste des réservations</h1>
        <div className="reclamation-list">
          {currentReservation.map((reservation, index) => {
            //console.log(currentReservation)
            return (
            <div key={index} className="reclamation-item">
              <p  className={`reclamation-title ${reservation.isClicked ? 'clicked' : ''}`}
                onClick={() => handleToggleDetails(index)}>
                {reservation.nameUser}
              </p>
              {reservation.showDetails && (
                <div className="reclamation-details">
                  <p>Numéro de réservation: {reservation.id}</p>
                  <p>Email: {reservation.email}</p>
                  <p>Numéro de série: {reservation.NumSerie}</p>
                  <p>Nom de l'équipement: {reservation.nameEquipement}</p>
                  <p>Catégorie: {reservation.categorie}</p>
                  {reservation.etat === 'En attente' && (
                  <>
                    <button onClick={() => handleAccept(reservation.id)} className='etatAccepter'>Accepter</button>
                    <button onClick={() => handleRefuse(reservation.id)} className='etatRefuser'>Refuser</button>
                  </>
                  )}
                  {reservation.etat === 'acceptée' && <p>Statut: Acceptée</p>}
                  {reservation.etat === 'refusée' && <p>Statut: Refusée</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
        <div className='paginationContainer'>
          <Pagination
           count={Math.ceil(reservation.length / reservationPerPage)}
           page={currentPage}
           onChange={paginate}
           className="pagination-nav"
           />
        </div>
    </div>
  );
}


export default Reservation;


