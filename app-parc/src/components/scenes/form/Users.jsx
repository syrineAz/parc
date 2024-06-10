/*import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./users.css"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { Edit } from '@mui/icons-material'
import { Pagination, TextField } from '@mui/material'

function Users() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const { userid } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/users")
        setData(response.data)
        setFilteredData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = (userid) => {
    axios.delete(`http://localhost:8081/delete/${userid}`)
      .then(res => {
        const updatedData = data.filter(user => user.id !== userid)
        setData(updatedData)
        setFilteredData(updatedData)
      })
      .catch(err => console.log(err))
  }

  const [ItemPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * ItemPerPage
  const indexOfFirstItem = indexOfLastItem - ItemPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    const filtered = data.filter(user => {
      return (
        (typeof user.name === 'string' && user.name.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof user.email === 'string' && user.email.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof user.num === 'string' && user.num.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof user.cin === 'string' && user.cin.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof user.type === 'string' && user.type.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (typeof user.service === 'string' && user.service.toLowerCase().includes(event.target.value.toLowerCase()))
      )
    })
    setFilteredData(filtered)
    setCurrentPage(1) // Reset to the first page whenever a new search is made
  }

  return (
    <div>
      <Link to="/AppHome/form" className="page-btnn">Ajouter un Employé</Link>
      <h1>Liste des Employés</h1>
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
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Cin</th>
              <th>Type</th>
              <th>Service</th>
              <th>Bureau</th>
              <th>Actif</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && currentItems.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.num}</td>
                <td>{user.cin}</td>
                <td>{user.type}</td>
                <td>{user.service}</td>
                <td>{user.bureau}</td>
                <td>{user.actif}</td>
                <td>
                  <Link to={`/AppHome/Form/Users/edit/${user.id}`} className='link'>
                    <Edit />
                  </Link> 
                  <button onClick={() => handleDelete(user.id)} className='delete'>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
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

export default Users*/

import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { Pagination } from "@mui/material";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockDataContacts, setMockDataContacts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ItemPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/users");
        setMockDataContacts(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (userid) => {
    axios
      .delete(`http://localhost:8081/delete/${userid}`)
      .then((res) => {
        const updatedData = mockDataContacts.filter((user) => user.id !== userid);
        setMockDataContacts(updatedData);
        setFilteredData(updatedData);
      })
      .catch((err) => console.log(err));
  };

  

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "num", headerName: "Contact", flex: 1 },
    { field: "cin", headerName: "Cin", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "bureau", headerName: "Bureau", flex: 1 },
    { field: "actif", headerName: "Actif", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        
        <div>
          
          <Link to={`/AppHome/Form/Users/edit/${params.row.id}`} style={{ textDecoration: 'none', marginRight: '1px' }}>
            <Edit />
          </Link>
          <button onClick={() => handleDelete(params.row.id)}
           style={{
            backgroundColor: '#e99592',
            color: '#fff',
            border: 'none',
            padding: '4px 2px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const indexOfLastItem = currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box m="20px">
      <Link to="/AppHome/form" className="page-btnn">Ajouter un Employé</Link>
      <Header title="Liste des employés" subtitle="" />
      
      <Box
        m="40px 0 0 0"
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
        }}
      >
        {/*<TextField
          variant="outlined"
          label="Rechercher"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "300px", height: "30px", marginBottom: "10px" }}
      />*/}
        <DataGrid
          rows={currentItems}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pagination
          pageSize={ItemPerPage}
          rowCount={filteredData.length}
          rowsPerPageOptions={[ItemPerPage]}
          paginationMode="server"
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Users;
