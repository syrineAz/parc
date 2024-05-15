import React from 'react'
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

function Ajouter() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate()
  /*const handleFormSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
        if (!values.idEmploye || !values.nomEmploye || !values.emailEmploye || !values.equipementName || !values.numSerie ||!values.categorie) {
            setErrors({ form: 'All fields are required' });
            return;
        }

        const response = await axios.post("http://localhost:8081/Ajouter", values);
        console.log(response)
        if (response.status === 200) {
            if (response.data === "equipement added succesfully") {
              console.log(response.data);
              setSubmitting(false);
              navigate('/AppHome/EquipementEmployes');
              toast.success("équipement affecter a l'employé")
            } else {
                throw new Error("Unknown response from server");
            }
        } else if (response.status === 400 && response.data === "Equipment deja affecter") {
            setErrors({ form: 'Equipment deja affecter' });
            toast.error('equipement déjà affecter')
        } 
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === "Equipment deja affecter") {
          setErrors({ form: 'Equipment deja affecter' });
          toast.error('equipement déjà affecter')
        } else {
          setErrors({ form: 'Error in the form' });
      }
    }
  };*/

  const handleFormSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      if (!values.idEmploye || !values.nomEmploye || !values.emailEmploye || !values.equipementName || !values.numSerie || !values.categorie) {
        setErrors({ form: 'All fields are required' });
        return;
      }
  
      // Envoyer les données au backend pour vérification et ajout
      const response = await axios.post("http://localhost:8081/Ajouter", values);
  
      // Vérifier la réponse du serveur
      if (response.status === 200) {
        if (response.data === "equipement added successfully") {
          setSubmitting(false);
          navigate('/AppHome/EquipementEmployes');
          toast.success("Équipement affecté à l'employé");
        } else if (response.data === "Equipment already assigned") {
          setErrors({ form: 'Equipment already assigned' });
          toast.error('Équipement déjà affecté à un employé');
        } else if (response.data === "Equipment with this serial number does not exist in the database") {
          setErrors({ form: 'Equipment does not exist' });
          toast.error("L'équipement avec ce numéro de série n'existe pas dans la base de données");
        } else {
          throw new Error("Unknown response from server");
        }
      } else {
        throw new Error("Unknown response from server");
      }
    } catch (error) {
      console.error(error);
      setErrors({ form: 'Error in the form' });
    }
  };
  


   
  return (
    <Box m="20px"  >
      <Header title="Ajouter un equipement"  />
      <Box display="flex" style={{ display: 'flex', alignItems: 'center' }}>
        
      </Box>
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
                {isSubmitting ? "Submitting..." : "Create New Equipement"}
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
  idEmploye: yup
  .string()
  .required(),
});
const initialValues = {
equipementName: "",
  emailEmploye:"",
  categorie:"",
  numSerie:"",
  nomEmploye:"",
  idEmploye:''
};
export default Ajouter
