import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import { ListItemIcon, Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from "@mui/material";
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
import { toast } from 'react-toastify';
function Modifier() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [reclamation, setReclamation]= useState(null)
  const {id}= useParams()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/Affichereclamations");
        const reclamation = response.data.find(reclamation => reclamation.id === parseInt(id));
        setReclamation(reclamation);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);
  const handleFormSubmit = async (values,{setSubmitting, setErrors} ) => {
    try{
    
      const response= await axios.post(`http://localhost:8081/editReclamation/${id}`, values);
      if(response.data==="Success")
        console.log(response.data)
        setSubmitting(false)
        toast.success('Réclamation modifiée')
        navigate('/User/Reclamation')
      
    }catch (error) {
      console.log(error)
      setErrors({form :'error in the form'})
    }
  };
  const navigate= useNavigate();
  if (!reclamation) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return (
    <Box m="20px"  >
    <Header title="Modifier une Réclamation" subtitle="  " />
    <Box display="flex" style={{ display: 'flex', alignItems: 'center' }}>
      
    </Box>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{nameUser: reclamation.nameUser || '',
      emailUser: reclamation.emailUser || '',
      numUser: reclamation.numUser || '',
      emplacement: reclamation.emplacement || '',
      nameEquipement: reclamation.nameEquipement || '',
      categorie: reclamation.categorie || '',
      description: reclamation.description || '',
      priorite: reclamation.priorite || '',
      DescPanne: reclamation.DescPanne || '',
      date: formatDate(reclamation.date) || '',
    }}
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
            <Typography variant="h5" gutterBottom>
            </Typography>  
          <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nom de l'utilisateur "
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
              label="Email de l'utilisateur"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.emailUser}
              name="emailUser"
              error={!!touched.emailUser && !!errors.emailUser}
              helperText={touched.emailUser && errors.emailUser}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Numéro de l'utilisateur"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.numUser}
              name="numUser"
              error={!!touched.numUser && !!errors.numUser}
              helperText={touched.numUser && errors.numUser}
              sx={{ gridColumn: "span 4" }}
            />
            
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nom de l'équipement ou numéro de série  "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nameEquipement}
              name="nameEquipement"
              error={!!touched.nameEquipement && !!errors.nameEquipement}
              helperText={touched.nameEquipement && errors.nameEquipement}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
                select 
                fullWidth
                variant="filled"
                type="text"
                label="Catégorie de l'équipement"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categorie}
                name="categorie"
                error={!!touched.categorie && !!errors.categorie}
                helperText={touched.categorie && errors.categorie}
                sx={{ gridColumn: "span 4" }}>
                <MenuItem value="Les Ordinateurs">Les Ordinateurs</MenuItem>
                <MenuItem value="Réseaux et communication">Réseaux et communication</MenuItem>
                <MenuItem value="Périphériques de stockage">Périphériques de stockage</MenuItem>
                <MenuItem value="Imprimantes et scanners">Imprimantes et scanners</MenuItem>
                <MenuItem value="Écrans et moniteurs">Écrans et moniteurs</MenuItem>
                <MenuItem value="Accessoires informatiques">Accessoires informatiques</MenuItem>
                <MenuItem value="Accessoires de câblage et connectique">Accessoires de câblage et connectique</MenuItem>

              </TextField>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Description du problème "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />
             <TextField
              fullWidth
              variant="filled"
              type="Date"
              label="Date du Panne "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.date}
              name="date"
              error={!!touched.date && !!errors.date}
              helperText={touched.date && errors.date}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Emplacement de l'équipement "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.emplacement}
              name="emplacement"
              error={!!touched.emplacement && !!errors.emplacement}
              helperText={touched.emplacement && errors.emplacement}
              sx={{ gridColumn: "span 4" }}
            />
             <TextField
                select 
                fullWidth
                variant="filled"
                type="text"
                label="Priorité de la réclamation "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.priorite}
                name="priorite"
                error={!!touched.priorite && !!errors.priorite}
                helperText={touched.priorite && errors.priorite}
                sx={{ gridColumn: "span 4" }}>
                <MenuItem value="faible">faible</MenuItem>
                <MenuItem value="moyenne">moyenne</MenuItem>
                <MenuItem value="élevée">élevée</MenuItem>
                <MenuItem value="critique">critique</MenuItem>

            </TextField>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Description détaillée de la panne"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.DescPanne}
              name="DescPanne"
              error={!!touched.DescPanne && !!errors.DescPanne}
              helperText={touched.DescPanne && errors.DescPanne}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Envoyer Réclamation"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  
);
  
}


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
    emailUser: yup
    .string()
    .required("required"), 
    numUser: yup
    .string()
    .required("required"),
    emplacement : yup 
    .string()
    .required("required"),
    nameEquipement: yup
    .string()
    .required("required"),  
    categorie: yup
    .string()
    .required("required"),
    description : yup
    .string()
    .required("required"),
   
    priorite: yup
    .string()
    .required("required"),
    DescPanne: yup
    .string()
    .required("required"),
    date : yup
    .date(),
});


export default Modifier
