import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import { Pagination, TextField, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../../theme';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';

function Reparation() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/AllReparation');
        const formattedData = response.data.map((reparation) => ({
          ...reparation,
          start_date: reparation.start_date ? formatDate(reparation.start_date) : 'N/A',
          end_date: reparation.end_date ? formatDate(reparation.end_date) : 'N/A',
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/DeleteReparation/${id}`)
      .then((res) => {
        setFilteredData(filteredData.filter((reparation) => reparation.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { field: 'nameEquipement', headerName: 'Nom de l\'équipement', flex: 1 },
    { field: 'numSerie', headerName: 'Numéro de série', flex: 1 },
    { field: 'categorie', headerName: 'Catégorie', flex: 1 },
    { field: 'nomEmploye', headerName: 'Nom de l\'employé', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'start_date', headerName: 'Date de début', flex: 1 },
    { field: 'end_date', headerName: 'Date du fin', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: (params) => (
        <Box>
          <Link to={`/AppHome/reparation/EditReparation/${params.row.id}`} style={{ textDecoration: 'none', marginRight: '8px' }}>
            <Edit />
          </Link>
          <button
            onClick={() => handleDelete(params.row.id)}
            style={{
              backgroundColor: '#e99592',
              color: '#fff',
              border: 'none',
              padding: '4px 2px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <DeleteIcon />
          </button>
        </Box>
      ),
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const user = JSON.parse(localStorage.getItem('userData'));

  return (
    <Box m="20px">
      {user.role === 'admin' && (
        <Link to="/AppHome/Reparation/Add" className="page-btnn">Ajouter un équipement</Link>
      )}
      <Header title="Liste des réparations" />

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
      </Box>

    </Box>
  );
}

export default Reparation;
