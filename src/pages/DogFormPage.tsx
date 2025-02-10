import { FormikProvider, useFormik } from "formik";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateDog } from "../store/dogsSlice";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { Dog } from "../models/Dog";

const findDogById = (): Dog | undefined => {
  const { dogs } = useSelector((state: RootState) => state.dogs);
  const { id } = useParams<{ id: string }>();
  return dogs.find((dog) => dog.id.toString() === id);
};

const DogFormPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const dog = findDogById();
  const navigate = useNavigate();
  const initialValues = {
    name: dog?.name || "",
    breed: dog?.breed || "",
    comment: dog?.comment || "",
    genre: dog?.genre || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Name must only contain letters")
        .max(30, "Name must be 30 characters or less")
        .required("Name is required"),
      breed: Yup.string().required("Es requerido"),
      comment: Yup.string().max(100, "Name must be 100 characters or less"),
    }),
    onSubmit: (values) => {
      const dognew: Dog = {
        ...values,
        id: dog?.id || "",
        url: dog?.url || "",
      };

      dispatch(updateDog(dognew));
      navigate("/");
    },
  });
  const { values, getFieldProps, errors, touched, handleChange } = formik;
  const handleChangeGenre = (event) => {
    const { value, checked } = event.target;
    formik.setFieldValue("genre", checked ? value : "");
  };
  return (
    <Container maxWidth="sm">
      <FormikProvider value={formik}>
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center" sx={{}}>
            Dog edit
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            {...getFieldProps("name")}
            fullWidth
            margin="normal"
          />
          <Stack direction="column">
            <FormControlLabel
              control={
                <Checkbox
                  {...formik.getFieldProps("genre")}
                  checked={formik.values.genre === "Hembra"}
                  value="Hembra"
                  onChange={handleChangeGenre}
                />
              }
              label="Hembra"
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...formik.getFieldProps("genre")}
                  checked={formik.values.genre === "Macho"}
                  value="Macho"
                  onChange={handleChangeGenre}
                />
              }
              label="Macho"
            />
          </Stack>
          <FormControl
            fullWidth
            margin="normal"
            error={touched.breed && Boolean(errors.breed)}
          >
            <InputLabel>Raza</InputLabel>
            <Select
              {...getFieldProps("breed")}
              label="Raza"
              value={values.breed}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="perro">Perro</MenuItem>
              <MenuItem value="gato">Gato</MenuItem>
              <MenuItem value="conejo">Conejo</MenuItem>
            </Select>
            {touched.breed && errors.breed && (
              <div style={{ color: "red" }}>{errors.breed}</div>
            )}
            <TextField
              label="Comentario"
              variant="outlined"
              multiline
              rows={4}
              {...getFieldProps("comment")}
              fullWidth
              margin="normal"
              error={touched.comment && Boolean(errors.comment)}
            />
            <Button
              onClick={() => {
                formik.handleSubmit();
              }}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </FormControl>
        </Stack>
      </FormikProvider>
    </Container>
  );
};

export default DogFormPage;
