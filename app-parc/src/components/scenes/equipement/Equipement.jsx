import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { toast } from "react-toastify" ;
import { useNavigate } from "react-router-dom";
const Equipement = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { title, id } = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setErrors, setSubmitting }) => {
    //console.log("Form submitted with values: ", values);
    try {
      if (!values.NameEquipement || !values.NameFournisseur || !values.prix || !values.numSerie || !values.categorie) {
        setErrors({ form: 'All fields are required' });
        return;
      }
      const response = await axios.post("http://localhost:8081/equipement", values);
      console.log("Response from backend: ", response);
      if (response.status === 200) {
        if (response.data === "equipement added succesfully") {
          console.log("Equipement added successfully");
          setSubmitting(false);
          navigate(`/AppHome/Categorie/${title}/${id}`);
          toast.success('Équipement ajouté avec succès');
        } else {
          throw new Error("Unknown response from server");
        }
      } else if (response.status === 400 && response.data === "equipement already exists") {
        setErrors({ form: 'Equipement already exists' });
        toast.error('Équipement déjà existe');
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      if (error.response && error.response.status === 400 && error.response.data === "equipement already exists") {
        setErrors({ form: 'Equipement already exists' });
        toast.error('Équipement déjà existe');
      } else {
        setErrors({ form: 'Error in the form' });
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Ajouter un equipement" />
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
                sx={{ gridColumn: "span 4" }}
              >
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
                {isSubmitting ? "Submitting..." : "Créer Equipement"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  NameEquipement: yup.string().required("required"),
  prix: yup.string().required("required"),
  NameFournisseur: yup.string().required("required"),
  Disponibilite: yup.string().required(),
  garantie: yup.string().required(),
  categorie: yup.string().required(),
  numSerie: yup.string().required(),
});

const initialValues = {
  NameEquipement: "",
  NameFournisseur: "",
  prix: "",
  Disponibilite: "",
  garantie: "",
  categorie: "",
  numSerie: "",
};

export default Equipement;


