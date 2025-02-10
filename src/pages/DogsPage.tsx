import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getDogsThunk } from "../store/dogsSlice";
import { Link } from "react-router";

const DogsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dogs } = useSelector((state: RootState) => state.dogs);

  useEffect(() => {
    if (dogs.length === 0) {
      dispatch(getDogsThunk());
    }
  }, []);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="column">
        <Typography variant="h4">Dogs</Typography>
        <Grid2 spacing={2} container size={{ xs: 12, sm: 6, md: 3 }}>
          {dogs.map((dog, index) => (
            <Card key={dog.id}>
              <CardMedia
                component="img"
                image={dog.url}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleToggle(dog.id)}
              />
              <Collapse in={expandedId === dog.id}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {dog.name}
                  </Typography>
                  <Typography variant="body2">{dog.breed}</Typography>
                  <Button variant="contained" sx={{ mt: 1 }}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/dogs/${dog.id}`}
                    >
                      editar
                    </Link>
                  </Button>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Grid2>
      </Stack>
    </Container>
  );
};

export default DogsPage;
// acabrera@deltax.la
// ksubieta@....
