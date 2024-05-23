import React, { useState } from 'react'
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import { ListItemIcon, Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
function Modifier() {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate()
    
    const [equipementData , setEquipementData] = useState(null);
    const {id}= useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/employe');
                const equipementData = response.data.find(equipement => equipement.id === parseInt(id));
                setEquipementData(equipementData);
                console.log(equipementData)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);
    if (!equipementData) {
        return <div>Loading...</div>;
    }
    
    const handleFormSubmit = async (values,{setSubmitting, setErrors} ) => {
        try{
          
          const response= await axios.post(`http://localhost:8081/EditEmploye/${id}`, values);
          console.log(response)
          if(response.data==="Success")
            console.log(response.data)
            setSubmitting(false)
            navigate('/AppHome/EquipementEmployes')
          
        }catch (error) {
          console.log(error)
          setErrors({form :'error in the form'})
        }
    };
  
  
    
  
  return (
    <Box m="20px"  >
      <Header title="Ajouter un equipement"  />
      <Box display="flex" style={{ display: 'flex', alignItems: 'center' }}>
        
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={ {equipementName: equipementData.equipementName || "",
        emailEmploye: equipementData.emailEmploye || "",
        categorie: equipementData.categorie || "",
        numSerie: equipementData.numSerie || "",
        nomEmploye: equipementData.nomEmploye || "",
        idEmploye: equipementData.idEmploye ||"",
        idEquipement:equipementData.idEquipement || "" ,
        date: equipementData.date || "" }}
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
                label="ID de l'équipement"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idEquipement}
                name="idEquipement"
                error={!!touched.idEquipement && !!errors.idEquipement}
                helperText={touched.idEquipement && errors.idEquipement}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID de l'employé"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idEmploye}
                name="idEmploye"
                error={!!touched.idEmploye && !!errors.idEmploye}
                helperText={touched.idEmploye && errors.idEmploye}
                sx={{ gridColumn: "span 4" }}
              />
             <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom de l'employé"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nomEmploye}
                name="nomEmploye"
                error={!!touched.nomEmploye && !!errors.nomEmploye}
                helperText={touched.nomEmploye && errors.nomEmploye}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.emailEmploye}
                name="emailEmploye"
                error={!!touched.emailEmploye && !!errors.emailEmploye}
                helperText={touched.emailEmploye && errors.emailEmploye}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nom de l'équipement"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.equipementName}
                name="equipementName"
                error={!!touched.equipementName && !!errors.equipementName}
                helperText={touched.equipementName && errors.equipementName}
                sx={{ gridColumn: "span 4" }}
              />
             <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro de Série"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numSerie}
                name="numSerie"
                error={!!touched.numSerie && !!errors.numSerie}
                helperText={touched.numSerie && errors.numSerie}
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date de l'assignement"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
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
                {isSubmitting ? "Submitting..." : "Modifier Equipement"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    
  )
}


const checkoutSchema = yup.object().shape({
    equipementName: yup.string().required("required"),
emailEmploye : yup
  .string()
  .required(),
categorie: yup
  .string()
  .required(),
  numSerie: yup
  .string()
  .required() ,
  nomEmploye: yup
  .string()
  .required(),
  idEquipement: yup
  .string()
  .required(),
  idEmploye: yup
  .string()
  .required(),
  date: yup
  .date()
  .required()
});


export default Modifier
