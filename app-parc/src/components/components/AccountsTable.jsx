import React, { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow ,IconButton,Typography} from "@mui/material";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import TableChartIcon from '@mui/icons-material/TableChart';

function AccountsTable() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getAccounts');
        if (response.data && Array.isArray(response.data.accounts)) {
          setAccounts(response.data.accounts);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);
  const [user, setUser] = useState("");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  }, [])
  return (
    <Box>
       <Typography variant="h5" display="flex" alignItems="center">
        <TableChartIcon sx={{ mr: 2 }} /> Créateurs de comptes
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            {user.role==='employer'&&(
            <TableCell>Action</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.role}</TableCell>
              <TableCell >
              {user.id=== account.id && user.role==='employer' && (
              <Link to="/User/Ajouter">
                <IconButton color="primary">
                  <AddCircleOutlineIcon />
                </IconButton>
              </Link>)}  
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default AccountsTable;
