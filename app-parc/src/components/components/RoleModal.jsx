import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
const RoleModal = ({ open, handleClose, id, email }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    setRole('');
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8081/updateRole', { id, role });
    //    console.log(response.data); // Handle response as needed
        handleClose();
      } catch (error) {
        console.error('Failed to update role:', error);
      }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust transparency here
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              border: '2px solid #fff',
              boxShadow: 5,
              padding: 3,
              width: 450,
              borderRadius: 1,
              outline: 'none',
            }}
          >
            <Typography variant="h6" id="transition-modal-title">Add Role</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="ID"
                fullWidth
                margin="normal"
                value={id}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Role"
                fullWidth
                margin="normal"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <Button type="submit"  variant="contained" color="primary" sx={{ mt: 2 , textAlign:'center'}}>
                Ajouter
              </Button>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RoleModal;
