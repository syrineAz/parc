import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import "../form/users.css"
import {Link, useNavigate, useParams} from "react-router-dom"
import { useEffect } from "react";
import Equipement from "./Equipement";
import MenuItem from '@mui/material/MenuItem';
function EditEquipement() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const {id, title, item_idEquipement}= useParams()
    const [equipementData, setEquipementData]= useState(null)
    const navigate= useNavigate();

    useEffect(() => {
      const fetchEquipementData = async () => {
        try {
          // Ensure the endpoint is correct
          const response = await axios.get(`http://localhost:8081/AfficheEditEquipement/${title}`);
          console.log("Fetched equipment data:", response.data);
          
          // Check if response.data is an array
          if (Array.isArray(response.data)) {
            const equipement = response.data.find(e => e.idEquipement === parseInt(item_idEquipement));
            console.log("Filtered equipment data:", equipement);
            setEquipementData(equipement);
          } else {
            console.error("Unexpected data format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching equipment data:", error);
        }
      };
      fetchEquipementData();
    }, [item_idEquipement],[title]);

    if (!equipementData) {
      return <div>Loading...</div>;
    }
    const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post(`http://localhost:8081/EditEquipement/${item_idEquipement}`, values);
        setSubmitting(false);
        navigate(`/AppHome/Categorie/${title}/${id}`);
      } catch (error) {
        console.log(error);
        setErrors({ submit: "An error occurred while updating the equipment" });
        setSubmitting(false);
      }
    };


   
    return (
        <Box m="20px">
          <Header title="Modifier Equipement" subtitle=" " />
         
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={{
              NameEquipement: equipementData.NameEquipement || "",
              NameFournisseur: equipementData.NameFournisseur || "",
              prix: equipementData.prix || "",
              Disponibilite: equipementData.Disponibilite || "",
              garantie: equipementData.garantie || "",
              categorie: equipementData.categorie || "",
              numSerie:equipementData.numSerie || "",
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
                label="Nom de l'équipement"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.NameEquipement}
                name="NameEquipement"
                error={!!touched.NameEquipement && !!errors.NameEquipement}
                helperText={touched.NameEquipement && errors.NameEquipement}
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
                type="text"
                label="Nom de la Fournisseur"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.NameFournisseur}
                name="NameFournisseur"
                error={!!touched.NameFournisseur && !!errors.NameFournisseur}
                helperText={touched.NameFournisseur && errors.NameFournisseur}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prix"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.prix}
                name="prix"
                error={!!touched.prix && !!errors.prix}
                helperText={touched.prix && errors.prix}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Disponibilité "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Disponibilite}
                name="Disponibilite"
                error={!!touched.Disponibilite && !!errors.Disponibilite}
                helperText={touched.Disponibilite && errors.Disponibilite}
                sx={{ gridColumn: "span 4" }}
              />
             <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Garantie "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.garantie}
                name="garantie"
                error={!!touched.garantie && !!errors.garantie}
                helperText={touched.garantie && errors.garantie}
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
                    {isSubmitting ? "Submitting..." : "Update Equipement"}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        
      );
};
const checkoutSchema = yup.object().shape({
  NameEquipement: yup
    .string()
    .required("required"),
  prix: yup
    .string()
    .required("required"),
  NameFournisseur: yup
    .string()
    .required("required"),  
  Disponibilite: yup
    .string()
    .required(),
  garantie : yup
    .string()
    .required(),
  categorie: yup
    .string()
    .required(),
    numSerie: yup 
    .string()
    .required()
});


export default EditEquipement
