import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import "./users.css"
import {Link, useNavigate, useParams} from "react-router-dom"
import { useEffect } from "react";
const Edit = () => {
  const {userid}= useParams()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userData, setUserData]= useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/users");
        const userData = response.data.find(user => user.id === parseInt(userid));
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userid]);
  const handleFormSubmit = async (values,{setSubmitting, setErrors} ) => {
    try{
      if (!values.name || !values.email || !values.num || !values.cin  || !values.type ||!values.bureau ||!values.service || !values.actif){
        setErrors({form :'All field are required'})
        return
      }
      const response= await axios.post(`http://localhost:8081/edit/${userid}`, values);
      if(response.data==="Success")
        console.log(response.data)
        setSubmitting(false)
        navigate('/AppHome/Form/Users')
      
    }catch (error) {
      console.log(error)
      setErrors({form :'error in the form'})
    }
  };
  const navigate= useNavigate();
  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <Box m="20px">
      <Header title="UPDATE USER" subtitle="" />
       
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{name: userData.name || '',
        email: userData.email || '',
        num: userData.num || '',
        cin: userData.cin || '',
        type: userData.type || '',
        bureau: userData.bureau || '',
        service: userData.service || '',
        actif: userData.actif || '',
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
                value={values.name}
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={values.email}
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.num}
                name="num"
                error={!!touched.num && !!errors.num}
                helperText={touched.num && errors.num}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cin "
                value={values.cin}
                onBlur={handleBlur}
                onChange={handleChange}
                name="cin"
                error={!!touched.cin && !!errors.cin}
                helperText={touched.cin && errors.cin}
                sx={{ gridColumn: "span 4" }}/>
                < TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Bureau "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bureau}
                name="bureau"
                error={!!touched.bureau && !!errors.bureau}
                helperText={touched.bureau && errors.bureau}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select 
                fullWidth
                variant="filled"
                type="text"
                label="Actif "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.actif}
                name="actif"
                error={!!touched.actif && !!errors.actif}
                helperText={touched.actif && errors.actif}
                sx={{ gridColumn: "span 4" }}>
                <MenuItem value="oui">Oui</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </TextField>
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Update User"}
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
  type: yup
    .string()
    .required("required"),  
  service: yup
    .string()
    .required("required"),
  bureau: yup
    .string()
    .required("required"),
  actif: yup
    .string()
    .required("required")
});
const initialValues = {
  name: "",
  email: "",
  num: "",
  cin: "",
  type: "",
  service:"",
  bureau:"",
  actif:"",
};

export default Edit;
