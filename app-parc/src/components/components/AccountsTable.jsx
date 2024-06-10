import React, { useState, useEffect } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from "@mui/material";
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TableChartIcon from '@mui/icons-material/TableChart';
import RoleModal from "./RoleModal";
import { Link } from "react-router-dom";

function AccountsTable() {
  const [accounts, setAccounts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({ id: '', email: '' });
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getAccounts');
        if (response.data && Array.isArray(response.data.accounts)) {
          setAccounts(response.data.accounts);
        //  console.log(response.data.accounts)
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);
  }, []);

  const handleOpen = (account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

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
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.role}</TableCell>
              <TableCell>
                {user.id === account.id && user.role === 'employer' && (
                  <Link to="/User/Ajouter">
                    <IconButton color="primary">
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <IconButton color="primary" onClick={() => handleOpen(account)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RoleModal open={modalOpen} handleClose={handleClose} id={selectedAccount.id} email={selectedAccount.email} />
    </Box>
  );
}

export default AccountsTable;
