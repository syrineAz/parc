import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import '../ReclamationPageEmploye/reclamation.css'
import { Pagination } from '@mui/material'
import { toast } from 'react-toastify';

function Reclamation() {
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [reclamationPerPage]= useState(3)
  const [currentPage, setCurrentPage]= useState(1)
  
  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Affichereclamations');
        setReclamations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des réclamations :', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReclamations();
  }, []);
  
  const handleToggleDetails = (index) => {
    setReclamations(reclamations.map((reclamation, i) => (
      i === index ? { ...reclamation, showDetails: !reclamation.showDetails } : reclamation
    )));
    console.log(reclamations)
  };
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }


  
  const updateReclamationStatus = (id, status) => {
    setReclamations(reclamations.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleAccept = async (id)=>{
    try{
      const response=  await axios.post('http://localhost:8081/AcceptReclamation', { id, status: 'acceptée' })
      console.log(response.data)
      toast.success('Acceptation envoyer ')
      updateReclamationStatus(id, 'acceptée');    }
    catch(error){
      console.error(error)
      toast.error("l'acceptation n'est pas envoyer ")
    }
  }

  const handleRefuse = async(id)=>{
    try{
      const response = await axios.post('http://localhost:8081/RefusReclamation', { id, status: 'refusée' })
      toast.success('Le refus est envoyé')
      updateReclamationStatus(id, 'refusée');
    }
    catch(error){
      console.error(error)
      toast.error("le refus n'est pas envoyer ")
    }
  }
  const indexOfLastReclamation= currentPage * reclamationPerPage;
  const indexOfFirstReclamation = indexOfLastReclamation-reclamationPerPage;
  const currentReclamation= reclamations.slice(indexOfFirstReclamation,indexOfLastReclamation) 
  
  const paginate= (event,pageNumber) =>{
    setCurrentPage(pageNumber)
    resetShowDetails()
  }
  const resetShowDetails= ()=>{
    setReclamations(reclamations.map(reclamation => ({
      ...reclamation, 
      showDetails: false
    })))
  }
  const getReclamationClass = (etat) => {
    switch (etat) {
      case 'En attente':
        return 'en-attente';
      case 'Acceptée':
        return 'acceptee';
      case 'Refusée':
        return 'refusee';
      default:
        return '';
    }
  }
  return (
      <div className="reclamation-container">
      <h1>Votre liste des réclamations</h1>
      <div className="reclamation-list">
        {currentReclamation.map((reclamation, index) => {
          const date = new Date(reclamation.date);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          return (
            <div key={index} className={`reclamation-item ${getReclamationClass(reclamation.etat)}`}>
              <p  className={`reclamation-title ${reclamation.isClicked ? 'clicked' : ''}`}
                onClick={() => handleToggleDetails(index)}>
                {reclamation.nameUser}
              </p>
              {reclamation.showDetails && (
                <div className="reclamation-details">
                  <p>Numéro de la réclamation: {reclamation.id}</p>
                  <p>Email: {reclamation.emailUser}</p>
                  <p>Numéro de l'employé: {reclamation.numUser}</p>
                  <p>Emplacement: {reclamation.emplacement}</p>
                  <p>Nom de l'équipement: {reclamation.nameEquipement}</p>
                  <p>Catégorie: {reclamation.categorie}</p>
                  <p>Titre du problème: {reclamation.description}</p>
                  <p>Priorité: {reclamation.priorite}</p>
                  <p>Description de la panne: {reclamation.DescPanne}</p>
                  <p>Date: {formattedDate}</p>
                  {reclamation.etat === 'En attente' && (
                  <>
                    <button onClick={() => handleAccept(reclamation.id)}>Accepter</button>
                    <button onClick={() => handleRefuse(reclamation.id)}>Refuser</button>
                  </>
                  )}
                  {reclamation.etat === 'acceptée' && <p>Statut: Acceptée</p>}
                  {reclamation.etat === 'refusée' && <p>Statut: Refusée</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className='paginationContainer'>
      <Pagination
         count={Math.ceil(reclamations.length / reclamationPerPage)}
         page={currentPage}
         onChange={paginate}
         className="pagination-nav"
      />
      </div>
    </div>
  );
}


export default Reclamation;
