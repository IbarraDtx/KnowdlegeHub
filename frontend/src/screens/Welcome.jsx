import React from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3A8DFF 40%, #6B6BFF 90%)",
        padding: 2,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
        ¡Bienvenido!
      </Typography>

      <Typography variant="h6" sx={{ color: "#E3F2FD", marginBottom: 4, textAlign: "center" }}>
        Elige una opción para continuar
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          width: "80%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={5}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/login")}
            sx={{
              padding: 2,
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: 2,
              backgroundColor: "#3A8DFF",
              "&:hover": { backgroundColor: "#357AE8" },
            }}
          >
            Ir a Login
          </Button>
        </Grid>

        <Grid item xs={5}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate("/register")}
            sx={{
              padding: 2,
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: 2,
              borderColor: "#fff",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
