import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import '../ReclamationPageEmploye/reclamation.css'
import { Pagination } from '@mui/material'

function ListeReservation() {
  const [data, setData] = useState([])
  const [userReservation, setUserReservation] = useState([])
  const [user, setUser] = useState("");
  const [reservationPerPage]= useState(5)
  const [currentPage, setCurrentPage]= useState(1)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
    axios.get('http://localhost:8081/AfficheReservation')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservation :', error);
      });
  }, []);

  useEffect(()=>{
    if(user && user.email){
      const filtredReservation = data.filter(reservation=> reservation.email === user.email)
      setUserReservation(filtredReservation)
      console.log(filtredReservation)
    }
    
  },[data, user]) 
  
  const handleToggleDetails = (index) => {
    setUserReservation(userReservation.map((reservation, i) => (
      i === index ? { ...reservation, showDetails: !reservation.showDetails } : reservation
    )));
    console.log(reservation)
    console.log(userReservation)
  };

  const handleDelete = ()=>{

  }



  const indexOfLastReservation= currentPage * reservationPerPage;
  const indexOfFirstReservation = indexOfLastReservation-reservationPerPage;
  const currentReservation= userReservation.slice(indexOfFirstReservation,indexOfLastReservation) 
  
  const paginate= (event,pageNumber) =>{
    setCurrentPage(pageNumber)
    resetShowDetails()
  }
  const resetShowDetails= ()=>{
    setUserReservation(userReservation.map(reservation => ({
      ...reservation, 
      showDetails: false
    })))
  }

  return (
    <div className="reclamation-container">
        <h1>Votre liste des réservations</h1>
        <div className="reclamation-list">
          {currentReservation.map((reservation, index) => {
            return (
            <div key={index} className="reclamation-item">
              <p  className={`reclamation-title ${reservation.isClicked ? 'clicked' : ''}`}
                onClick={() => handleToggleDetails(index)}>
                {reservation.nameUser}
              </p>
              {reservation.showDetails && (
                <div className="reclamation-details">
                  <p>Email: {reservation.email}</p>
                  <p>Numéro de série: {reservation.NumSerie}</p>
                  <p>Nom de l'équipement: {reservation.nameEquipement}</p>
                  <p>Catégorie: {reservation.categorie}</p>
                
                    
                      <Link to={`/User/Reclamation/Modifier/${reservation.id}`} className="edit-btn">
                        <Edit />
                      </Link>
                      <button onClick={() => handleDelete(reservation.id)} className="delete-btn">
                        <DeleteIcon />
                      </button> 
                    
                  
                </div>
              )}
            </div>
          );
        })}
      </div>
        <div className='paginationContainer'>
          <Pagination
           count={Math.ceil(userReservation.length / reservationPerPage)}
           page={currentPage}
           onChange={paginate}
           className="pagination-nav"
           />
        </div>
    </div>
  );
}


export default ListeReservation;
