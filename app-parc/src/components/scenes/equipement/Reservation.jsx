import React from 'react'
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import {Link, useNavigate} from "react-router-dom"
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function Reservation() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const {id, title}= useParams()

    const handleFormSubmit = async (values, { setErrors, setSubmitting }) => {
      try{
        const response = await axios.post('http://localhost:8081/reservation', values)
        if(response.status===200){
          console.log(response.data);
          setSubmitting(false);
         // navigate('/User/Liste')
          toast.success('Résevation envoyée avec succès')
        }else {
          throw new Error("Unknown response from server");
        }
       socket.emit('nouvelle_reservation_admin', values)  
        console.log('values ',values)
      }catch(err){
        console.error(err)
        setErrors({ form: 'Error in the form' , err});
      }
    };
  
  
  
    const navigate= useNavigate();
  return (
    <Box m="20px">
      <Header title="Réserver équipement" />
    
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >

        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Votre nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nameUser}
                name="nameUser"
                error={!!touched.nameUser && !!errors.nameUser}
                helperText={touched.nameUser && errors.nameUser}
                sx={{ gridColumn: "span 4" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom de l'equipement"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nameEquipement}
                name="nameEquipement"
                error={!!touched.nameEquipement && !!errors.nameEquipement}
                helperText={touched.nameEquipement && errors.nameEquipement}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro de série de l'équipement"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.NumSerie}
                name="NumSerie"
                error={!!touched.NumSerie && !!errors.nuNumSeriem}
                helperText={touched.NumSerie && errors.NumSerie}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Votre Email "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select 
                fullWidth
                variant="filled"
                type="text"
                label="Catégorie de l'équipement "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categorie}
                name="categorie"
                error={!!touched.categorie && !!errors.categorie}
                helperText={touched.categorie && errors.categorie}
                sx={{ gridColumn: "span 4" }}> 
                <MenuItem value="Les Ordinateurs">Les Ordinateurs </MenuItem>
                <MenuItem value="Réseaux et communication">Réseaux et communication</MenuItem>
                <MenuItem value="Périphériques de stockage">Périphériques de stockage</MenuItem>
                <MenuItem value="Imprimantes et scanners">Imprimantes et scanners</MenuItem>
                <MenuItem value="Écrans et moniteurs">Écrans et moniteurs</MenuItem>
                <MenuItem value="Accessoires informatiques">Accessoires informatiques</MenuItem>
                <MenuItem value="Accessoires de câblage et connectique">Accessoires de câblage et connectique</MenuItem>
              </TextField>
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const cinRegExp = 
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const num=
  /^[0-9]{8}$/;
const cin =
  /^[01]/;
const checkoutSchema = yup.object().shape({
  nameUser: yup.string().required("required"),
  nameEquipement: yup.string().required("required"),
  NumSerie: yup
    .string()
    .required("required"),
    email: yup
    .string()
    .required("required"),
  categorie: yup
    .string()
    .required("required"),  
  
});
const initialValues = {
  nameUser: "",
  nameEquipement: "",
  NumSerie: "",
  email: "",
  categorie: "",
  
};

export default Reservation
