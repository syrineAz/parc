import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import './reclamation.css';
import { Pagination, TextField } from '@mui/material';
import { toast } from 'react-toastify';

function Reclamation() {
  const [data, setData] = useState([]);
  const [userReclamation, setUserReclamation] = useState([]);
  const [user, setUser] = useState("");
  const [reclamationPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
    axios.get('http://localhost:8081/Affichereclamations')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réclamations :', error);
      });
  }, []);

  useEffect(() => {
    if (user && user.email) {
      const filtredReclamation = data.filter(reclamation => reclamation.emailUser === user.email);
      setUserReclamation(filtredReclamation);
    }
  }, [data, user]);

  const handleToggleDetails = (index) => {
    setUserReclamation(userReclamation.map((reclamation, i) => (
      i === index ? { ...reclamation, showDetails: !reclamation.showDetails } : reclamation
    )));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/deleteReclamation/${id}`);
      if (response.status === 200) {
        const updatedReclamations = userReclamation.filter(reclamation => reclamation.id !== id);
        setUserReclamation(updatedReclamations);
        toast.success('Réclamation supprimée avec succès');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastReclamation = currentPage * reclamationPerPage;
  const indexOfFirstReclamation = indexOfLastReclamation - reclamationPerPage;
  const currentReclamation = userReclamation.slice(indexOfFirstReclamation, indexOfLastReclamation);

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="reclamation-container">
      <Link to="/User/Reclamation/Envoyer" className="page-btnn">Envoyer une réclamation</Link>
      <h1>Votre liste des réclamations</h1>
    
      <div className="reclamation-list">
        {currentReclamation.map((reclamation, index) => {
          const date = new Date(reclamation.date);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          return (
            <div key={index} className="reclamation-item">
              <p className={`reclamation-title ${reclamation.showDetails ? 'clicked' : ''}`}
                onClick={() => handleToggleDetails(index + indexOfFirstReclamation)}>
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
                  <p>Résultat: {reclamation.etat}</p> <br />
                  {reclamation.etat === 'En attente' && (
                    <>
                      <Link to={`/User/Reclamation/Modifier/${reclamation.id}`} className="edit-btn">
                        <Edit />
                      </Link>
                      <button onClick={() => handleDelete(reclamation.id)} className="delete-btn">
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className='paginationContainer'>
        <Pagination
          count={Math.ceil(userReclamation.length / reclamationPerPage)}
          page={currentPage}
          onChange={paginate}
          className="pagination-nav"
        />
      </div>
    </div>
  );
}

export default Reclamation;
