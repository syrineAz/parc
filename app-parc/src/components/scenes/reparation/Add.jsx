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
import { toast } from 'react-toastify';

function Add() {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
        const response = await axios.post("http://localhost:8081/AddReparation", values);
        console.log(values)
        if (response.status === 200) {
            console.log(response.data);
            setSubmitting(false);
            navigate('/AppHome/Reparation');        
        } else {
            throw new Error("Unknown response from server");

        } 
    } catch (error) {
     console.log('error:', error)
    }
  };


  const navigate= useNavigate();
  return (
    <Box m="20px">
    <Header title="Ajouter équipement à la réparation" subtitle=" " />
  
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
              label="Id de l'équipement"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.idEquipement}
              name="idEquipement"
              error={!!touched.idEquipement && !!errors.idEquipement}
              helperText={touched.idEquipement && errors.idEquipement}
              sx={{ gridColumn: "span 1" }}
            />
           
            
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Nom de l'équipement"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nameEquipement}
              name="nameEquipement"
              error={!!touched.nameEquipement && !!errors.nameEquipement}
              helperText={touched.nameEquipement && errors.nameEquipement}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Numéro de série"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.numSerie}
              name="numSerie"
              error={!!touched.numSerie && !!errors.numSerie}
              helperText={touched.numSerie && errors.numSerie}
              sx={{ gridColumn: "span 1" }}
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
              label="Description"
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
              type="date"
              label="Date du début réparation "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.start_date}
              name="start_date"
              error={!!touched.start_date && !!errors.start_date}
              helperText={touched.start_date && errors.start_date}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Date du fin réparation "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.end_date}
              name="end_date"
              error={!!touched.end_date && !!errors.end_date}
              helperText={touched.end_date && errors.end_date}
              sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="Les Ordinateurs">Les Ordinateurs </MenuItem>
                <MenuItem value="Réseaux et communication">Réseaux et communication</MenuItem>
                <MenuItem value="Périphériques de stockage">Périphériques de stockage</MenuItem>
                <MenuItem value="Imprimantes et scanners">Imprimantes et scanners</MenuItem>
                <MenuItem value="Écrans et moniteurs">Écrans et moniteurs</MenuItem>
                <MenuItem value="Accessoires informatiques">Accessoires informatiques</MenuItem>
                <MenuItem value="Accessoires de câblage et connectique">Accessoires de câblage et connectique</MenuItem>
              </TextField>
            <TextField
              select 
              fullWidth
              variant="filled"
              type="text"
              label="Status "
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.status}
              name="status"
              error={!!touched.status && !!errors.status}
              helperText={touched.status && errors.status}
              sx={{ gridColumn: "span 2" }}>
              <MenuItem value="En attente">En attente</MenuItem>
              <MenuItem value="En cours">En cours</MenuItem>
              <MenuItem value="Terminer">Termier</MenuItem>

            </TextField>
            
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Créer réparation"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  
);
};


const checkoutSchema = yup.object().shape({
    idEquipement: yup.string().required("required"),
    description: yup.string().required("required"),
    start_date: yup.date().required("required"),
    end_date: yup.date().required("required"),  
    status: yup.string().required("required"),
    nameEquipement: yup.string().required("required"),
    numSerie:  yup.string().required("required"),
    categorie: yup.string().required("required"),
    nomEmploye: yup.string().required("required"),
});
const initialValues = {
    idEquipement: "",
    description: "",
    start_date: "",
    end_date: "",
    status:"",
    nameEquipement:"",
    numSerie:"",
    categorie:"",
    nomEmploye:""
};


export default Add
