import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit, WavingHand } from '@mui/icons-material'
import {BiBookAdd} from 'react-icons/bi'
import { Pagination } from '@mui/material'
import DetailsEquipementEmploye from './DetailsEquipementEmploye';
function EquipementEmployes() {

  const [data, setData] = useState([])
  const [user, setUser] = useState("");
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (user.role === 'admin') {
          response = await axios.get("http://localhost:8081/AfficherAll");
        } else {
          response = await axios.get(`http://localhost:8081/AfficherEmploye/${user.id}`);
          console.log(user.id)
        }
        setData(response.data);
     //   console.log("response.data : ",response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (user) {
      fetchData();
    }
  }, [user]);
  
  const handleDelete =  (id) => {
    console.log(id)
    axios.delete(`http://localhost:8081/delete/${id}`)
    .then(res => {
      setData(data.filter(equipement => equipement.id !== id));
      console.log(data)
      console.log(id)
    })
    .catch(err => console.log(err))
  };
  
  const openModal = (equipement) => {
    setSelectedItem(equipement);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null)
  };
  const handleSave = (fields) => {
    const updatedData = data.map(equipement => {
      if (equipement.id === selectedItem.id) {
        return { ...equipement, customFields: fields };
      }
      return item;
    });
    setData(updatedData);
  };


  const [ItemPerPage]= useState(5)
  const [currentPage, setCurrentPage]= useState(1)
  
  const indexOfLastItem= currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem-ItemPerPage;
  const currentItems= data.slice(indexOfFirstItem,indexOfLastItem) 
  const handlePageChagne = (event, value)=>{
    setCurrentPage(value)
  }
  return (
    <div>
      {user.role ==="admin" &&( 
        <Link to='/AppHome/EquipementEmployes/Ajouter' className="page-btnn">Affecter équipement</Link>
      )}
     
        {user.role==='admin' &&(
         <h1> Liste des équipements des employés </h1>)}
        
        {user.role==='employer' &&(
         <h1>Votre Liste des équipements</h1>)}
      <div>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Nom de l'employé</th>
              <th>Email de l'employé </th>
              <th>Nom de l'equipement</th>
              <th>Numéro de série</th>
              <th>Catégorie</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && currentItems.map((equipement , index)=>{
              return <tr key={index}>
                <td>{equipement.nomEmploye}</td>
                <td>{equipement.emailEmploye}</td>
                <td>{equipement.equipementName}</td>
                <td>{equipement.numSerie}</td>
                <td>{equipement.categorie}</td>
                <td>
                  <Link onClick={()=>openModal(equipement)} className='link'>Détails</Link>
                </td>
                {user.role ==="admin" && (
                    <td>
                      <Link to={`/AppHome/EquipementEmployes/Modifier/${equipement.id}`} className='link'>
                        <Edit />
                      </Link>
                      <button onClick={() => handleDelete(equipement.id)} className='delete'>
                        <DeleteIcon />
                      </button>
                    </td>
                  )}
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div className="paginationContainer">
        <Pagination
           count = {Math.ceil(data.length / ItemPerPage)}
           page={currentPage}
           onChange={handlePageChagne}
           className='pagination-nav'
        />
      </div>
      {showModal && (
      <DetailsEquipementEmploye 
        isOpen={showModal} 
        closeModal={closeModal}
        selectedItem={selectedItem}
        onSave={handleSave}
      />
      )}

    </div>
  )
}

export default EquipementEmployes
