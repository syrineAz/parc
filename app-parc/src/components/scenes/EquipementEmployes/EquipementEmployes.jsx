import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Pagination, TextField } from '@mui/material';
import DetailsEquipementEmploye from './DetailsEquipementEmploye';

function EquipementEmployes() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (user.role === 'admin') {
          response = await axios.get("http://localhost:8081/AfficherAll");
        } else {
          response = await axios.get(`http://localhost:8081/AfficherEmploye/${user.id}`);
          console.log(user.id);
        }
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then(res => {
        const updatedData = data.filter(equipement => equipement.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
      })
      .catch(err => console.log(err));
  };

  const openModal = (equipement) => {
    setSelectedItem(equipement);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSave = (fields) => {
    const updatedData = data.map(equipement => {
      if (equipement.id === selectedItem.idEmploye) {
        return { ...equipement, customFields: fields };
      }
      return equipement;
    });
    setData(updatedData);
  };

  const [ItemPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    const filtered = data.filter(equipement => {
      return (
        (typeof equipement.nomEmploye === 'string' && equipement.nomEmploye.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof equipement.emailEmploye === 'string' && equipement.emailEmploye.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof equipement.equipementName === 'string' && equipement.equipementName.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof equipement.numSerie === 'string' && equipement.numSerie.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof equipement.categorie === 'string' && equipement.categorie.toLowerCase().includes(event.target.value.toLowerCase()))
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page whenever a new search is made
  };

  return (
    <div>
      {user.role === "admin" && (
        <Link to='/AppHome/EquipementEmployes/Ajouter' className="page-btnn">Affecter équipement</Link>
      )}

      {user.role === 'admin' && (
        <h1>Liste des équipements des employés</h1>
      )}

      {user.role === 'employer' && (
        <h1>Votre Liste des équipements</h1>
      )}

      <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '10px', padding: '12px' }}>
        <TextField
          variant="outlined"
          label="Rechercher"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '300px', height: '30px' }}
        />
      </div>

      <div>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Nom de l'employé</th>
              <th>Email de l'employé</th>
              <th>Nom de l'équipement</th>
              <th>Numéro de série</th>
              <th>Catégorie</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && currentItems.map((equipement, index) => {
              const date = new Date(equipement.date);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              const formattedDate = `${day}-${month}-${year}`;
              return (
                <tr key={index}>
                  <td>{equipement.nomEmploye}</td>
                  <td>{equipement.emailEmploye}</td>
                  <td>{equipement.equipementName}</td>
                  <td>{equipement.numSerie}</td>
                  <td>{equipement.categorie}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <Link onClick={() => openModal(equipement)} className='link'>Voir Plus</Link>

                    {user.role === "admin" && (
                      <>
                        <Link to={`/AppHome/EquipementEmployes/Modifier/${equipement.id}`} className='link'>
                          <Edit />
                        </Link>
                        <button onClick={() => handleDelete(equipement.id)} className='delete'>
                          <DeleteIcon />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="paginationContainer">
        <Pagination
          count={Math.ceil(filteredData.length / ItemPerPage)}
          page={currentPage}
          onChange={handlePageChange}
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
  );
}

export default EquipementEmployes;
