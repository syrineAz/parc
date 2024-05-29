import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import { Pagination, TextField } from '@mui/material'

function Reparation() {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/AllReparation")
        setData(response.data)
        setFilteredData(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/DeleteReparation/${id}`)
      .then(res => {
        setFilteredData(filteredData.filter(reparation => reparation.id !== id));
      })
      .catch(err => console.log(err))
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    const filtered = data.filter(reparation =>
      reparation.nameEquipement.toLowerCase().includes(event.target.value.toLowerCase()) ||
      reparation.numSerie.toLowerCase().includes(event.target.value.toLowerCase()) ||
      reparation.categorie.toLowerCase().includes(event.target.value.toLowerCase()) ||
      reparation.nomEmploye.toLowerCase().includes(event.target.value.toLowerCase()) ||
      reparation.description.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredData(filtered)
  }

  const [ItemPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  
  const indexOfLastItem = currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem) 
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }
  
  const [user, setUser] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  }, [])

  return (
    <div>
      {user.role === 'admin' && (
        <Link to="/AppHome/Reparation/Add" className="page-btnn">Ajouter un équipement</Link>
      )}
      <h1>Liste des réparations</h1>
      <div style={{ display: 'flex', justifyContent: 'left',marginBottom: '10px' , padding:'12px'}}>
        <TextField
          variant="outlined"
          label="Rechercher"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '300px' , height: '30px'}}
          
        />
      </div>
      <div>      
        <table className='user-table'>
          <thead>
            <tr>
              <th>Nom de l'équipement</th>
              <th>Numéro de série</th>
              <th>Catégorie</th>
              <th>Nom de l'employé</th>
              <th>Description</th>
              <th>Date de début</th>
              <th>Date du fin</th>
              <th>Status</th>
              {user.role === 'admin' && (
                <th>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && currentItems.map((reparation, index) => {
              const formatDate = (dateString) => {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
              };
              const formattedStartDate = reparation.start_date ? formatDate(reparation.start_date) : 'N/A';
              const formattedEndDate = reparation.end_date ? formatDate(reparation.end_date) : 'N/A';
              return (
                <tr key={index}>
                  <td>{reparation.nameEquipement}</td>
                  <td>{reparation.numSerie}</td>
                  <td>{reparation.categorie}</td>
                  <td>{reparation.nomEmploye}</td>
                  <td>{reparation.description}</td>
                  <td>{formattedStartDate}</td>
                  <td>{formattedEndDate}</td>
                  <td>{reparation.status}</td>
                  {user.role === 'admin' && (
                    <td>
                      <Link to={`/AppHome/reparation/EditReparation/${reparation.id}`} className='link'>
                        <Edit />
                      </Link> 
                      <button onClick={() => handleDelete(reparation.id)} className='delete'>
                        <DeleteIcon />
                      </button>
                    </td>
                  )}
                </tr>
              )
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
    </div>
  )
}

export default Reparation
