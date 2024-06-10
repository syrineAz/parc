/*import React, { useState, useEffect } from 'react';
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

export default EquipementEmployes;*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Pagination, TextField, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DetailsEquipementEmploye from './DetailsEquipementEmploye';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../components/Header';

function EquipementEmployes() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (user && user.role === 'admin') {
          response = await axios.get('http://localhost:8081/AfficherAll');
        } else if (user) {
          response = await axios.get(`http://localhost:8081/AfficherEmploye/${user.id}`);
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
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        const updatedData = data.filter((equipement) => equipement.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
      })
      .catch((err) => console.log(err));
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
    const updatedData = data.map((equipement) =>
      equipement.id === selectedItem.idEmploye ? { ...equipement, customFields: fields } : equipement
    );
    setData(updatedData);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 
  const columns = [
    { field: 'nomEmploye', headerName: "Nom de l'employé", flex: 1, headerClassName: 'MuiDataGrid-colHeaderCentered', cellClassName: 'MuiDataGrid-cellCentered' },
    { field: 'emailEmploye', headerName: "Email de l'employé", flex: 1, headerClassName: 'MuiDataGrid-colHeaderCentered', cellClassName: 'MuiDataGrid-cellCentered' },
    { field: 'equipementName', headerName: "Nom de l'équipement", flex: 1, headerClassName: 'MuiDataGrid-colHeaderCentered', cellClassName: 'MuiDataGrid-cellCentered' },
    { field: 'numSerie', headerName: "Numéro de série", flex: 1, headerClassName: 'MuiDataGrid-colHeaderCentered', cellClassName: 'MuiDataGrid-cellCentered' },
    { field: 'categorie', headerName: "Catégorie", flex: 1, headerClassName: 'MuiDataGrid-colHeaderCentered', cellClassName: 'MuiDataGrid-cellCentered' },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      headerClassName: 'MuiDataGrid-colHeaderCentered',
      cellClassName: 'MuiDataGrid-cellCentered',
      valueGetter: (params) => {
        const date = new Date(params.row.date);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'MuiDataGrid-colHeaderCentered',
      cellClassName: 'MuiDataGrid-cellCentered',
      renderCell: (params) => (
        <div>
          <Link onClick={() => openModal(params.row)} className='link'>Voir Plus</Link>
          {user && user.role === "admin" && (
            <>
              <Link to={`/AppHome/EquipementEmployes/Modifier/${params.row.id}`}style={{ textDecoration: 'none', marginRight: '2px' }}>
                <Edit />
              </Link>
              <button onClick={() => handleDelete(params.row.id)}  style={{
              backgroundColor: '#e99592',
              color: '#fff',
              border: 'none',
              padding: '4px px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      {user && user.role === "admin" && (
        <Link to='/AppHome/EquipementEmployes/Ajouter' className="page-btnn">Affecter équipement</Link>
      )}

      {user && (
        <h1>{user.role === 'admin' ? 'Liste des équipements des employés' : 'Votre Liste des équipements'}</h1>
      )}
      <Box m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}>
   

        <DataGrid
          rows={filteredData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pagination
          pageSize={itemsPerPage}
          rowCount={filteredData.length}
          onPageChange={handlePageChange}
        />

    
      {showModal && (
        <DetailsEquipementEmploye
          isOpen={showModal}
          closeModal={closeModal}
          selectedItem={selectedItem}
          onSave={handleSave}
        />
      )}
      </Box>
    </Box>
  );
}

export default EquipementEmployes;
