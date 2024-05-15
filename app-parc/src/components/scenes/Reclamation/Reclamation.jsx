import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../form/users.css"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'

function Reclamation() {
  const [data, setData] = useState([])
  const [userReclamation, setUserReclamation] = useState([])
  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
    axios.get('http://localhost:8081/Affichereclamations')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réclamations :', error);
      });
  }, []);

  useEffect(()=>{
    if(user && user.email){
      const filtredReclamation = data.filter(reclamation=> reclamation.emailUser === user.email)
      setUserReclamation(filtredReclamation)
    }
   
  },[data, user]) 


  return (
    <div>
      <Link to="/User/Reclamation/Envoyer" className="page-btnn">Envoyer une réclamation</Link>
      <h1>Liste des réclamations</h1>
      <table  className='user-table'>
        <thead>
          <tr>
            <th>Nom de l'employé</th>
            <th>Email de l'employé </th>
            <th>Numéro de l'employé </th>
            <th>Emplacement</th>
            <th>Nom de l'equipement</th>
            <th>Catégorie</th>
            <th>Titre du probléme</th>
            <th>Priorité</th>
            <th>Description du panne</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {userReclamation.map((reclamation, index) =>{
          const date = new Date(reclamation.date)
          const day=date.getDate();
          const month= date.getMonth()+1;
          const year= date.getFullYear()
          const formattedDate= `${day}-${month}-${year}`
          return <tr key={index}>
            <td>{reclamation.nameUser}</td>
            <td>{reclamation.emailUser}</td>
            <td>{reclamation.numUser}</td>
            <td>{reclamation.emplacement}</td>
            <td>{reclamation.nameEquipement}</td>
            <td>{reclamation.categorie}</td>
            <td>{reclamation.description}</td>
            <td>{reclamation.priorite}</td>
            <td>{reclamation.DescPanne}</td>
            <td>{formattedDate}</td>
            <td>
                
            </td>
          </tr>
             })}
        </tbody>
      </table>
    </div>
  );
}

export default Reclamation;
/*<div>{reclamation.id}</div>
            <div>{reclamation.nameUser}</div>
            <div>{reclamation.emailUser}</div>
            <div>{reclamation.numUser}</div>
            <div>{reclamation.emplacement}</div>
            <div>{reclamation.nameEquipement}</div>
            <div>{reclamation.categorie}</div>
            <div>{reclamation.description}</div>
            <div>{reclamation.priorite}</div>
            <div>{reclamation.DescPanne}</div>
            <div>{reclamation.Date}</div> */