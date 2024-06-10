import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import {Link, useNavigate} from "react-router-dom"
import "../form/users.css"
import { toast } from 'react-toastify';

const Contacts = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
        if (!values.name || !values.email || !values.num || !values.cin || !values.adresse  ||!values.service ) {
            setErrors({ form: 'All fields are required' });
            return;
        }

        const response = await axios.post("http://localhost:8081/AjoutFournisseur", values);
        console.log(values)
        if (response.status === 200) {
            if (response.data === "fournisseur added succesfully") {
                console.log(response.data);
                setSubmitting(false);
                navigate('/AppHome/contacts/Fournisseur');
            } else {
                throw new Error("Unknown response from server");
            }
        } else if (response.status === 400 && response.data === "fournisseur already exists") {
            setErrors({ form: 'fournisseur already exists' });
            toast.error('Fournisseur déjà existe')
        } 
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === "fournisseur already exists") {
          setErrors({ form: 'fournisseur already exists' });
          toast.error('Fournisseur déjà existe')      } else {
          setErrors({ form: 'Error in the form' });
      }
    }
  };
  const navigate= useNavigate();

  return(
  <Box m="20px">
      <Header title="Ajouter Fournisseurs" subtitle="Créer nouveau fournisseur" />
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
                label="Nom"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="numéros de téléphone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="num"
                error={!!touched.num && !!errors.num}
                helperText={touched.num && errors.num}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cin "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cin}
                name="cin"
                error={!!touched.cin && !!errors.cin}
                helperText={touched.cin && errors.cin}
                sx={{ gridColumn: "span 2" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Adresse "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adresse}
                name="adresse"
                error={!!touched.adresse && !!errors.adresse}
                helperText={touched.adresse && errors.adresse}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Service "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service}
                name="service"
                error={!!touched.service && !!errors.service}
                helperText={touched.service && errors.service}
                sx={{ gridColumn: "span 4" }}
              />
              
              
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
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
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  num: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid ")
    .required("required")
    .matches(num, "Doit être composé de 8 chiffres"),
  cin: yup
    .string()
    .required("required")
    .matches(cin,"CIN doit être commencer par 0 ou 1")
    .matches(num,"Doit être composé de 8 chiffres"),
    adresse: yup
    .string()
    .required("required"),  
  service: yup
    .string()
    .required("required"),
  
});
const initialValues = {
  name: "",
  email: "",
  num: "",
  cin: "",
  adresse: "",
  service:"",
  
};
export default Contacts;
