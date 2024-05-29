import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pagination,TextField } from '@mui/material';
import { toast } from 'react-toastify';
import '../ReclamationPageEmploye/reclamation.css';

function Reservation() {
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/AfficheReservation');
        setReservation(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleToggleDetails = (index) => {
    setReservation(prevReservation => prevReservation.map((res, i) => (
      i === index ? { ...res, showDetails: !res.showDetails } : res
    )));
  };

  const updateReservationStatus = (id, status) => {
    setReservation(reservation.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post('http://localhost:8081/AcceptReservation', { id, status: 'acceptée' });
      console.log(response.data);
      toast.success('Acceptation envoyée');
      updateReservationStatus(id, 'acceptée');
    } catch (error) {
      console.error(error);
      toast.error("L'acceptation n'est pas envoyée");
    }
  };

  const handleRefuse = async (id) => {
    try {
      const response = await axios.post('http://localhost:8081/RefusReservation', { id, status: 'refusée' });
      toast.success('Réservation refusée');
      updateReservationStatus(id, 'refusée');
    } catch (error) {
      console.error(error);
      toast.error("Le refus n'est pas envoyé");
    }
  };

  const indexOfLastReservation = currentPage * reservationPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationPerPage;
  const currentReservation = reservation
    .filter(res => res.nameUser.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstReservation, indexOfLastReservation);

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div className="reclamation-container">
      <h1>Liste des réservations</h1>
      <div style={{ display: 'flex', justifyContent: 'left',marginBottom: '10px' , padding:'15px'}}>
        <TextField
          variant="outlined"
          label="Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' , height: '30px'}}  
        />
      </div>
      <div className="reclamation-list">
        {currentReservation.map((reservation, index) => (
          <div key={index} className="reclamation-item">
            <p
              className={`reclamation-title ${reservation.isClicked ? 'clicked' : ''}`}
              onClick={() => handleToggleDetails(index)}
            >
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
                    <button onClick={() => handleAccept(reservation.id)} className="etatAccepter">Accepter</button>
                    <button onClick={() => handleRefuse(reservation.id)} className="etatRefuser">Refuser</button>
                  </>
                )}
                {reservation.etat === 'acceptée' && <p>Statut: Acceptée</p>}
                {reservation.etat === 'refusée' && <p>Statut: Refusée</p>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="paginationContainer">
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


