import React from "react";
import { Grid, Paper, TextField, Button, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #3A8DFF 30%, #6B6BFF 90%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 5,
          width: { xs: "90%", sm: "400px" },
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Crear Cuenta
        </Typography>

        <TextField label="Nombre" fullWidth margin="normal" variant="outlined" />
        <TextField label="Correo Electrónico" fullWidth margin="normal" variant="outlined" />
        <TextField label="Contraseña" type="password" fullWidth margin="normal" variant="outlined" />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3, padding: 1.5, fontSize: "16px", fontWeight: "bold" }}
        >
          Registrarse
        </Button>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
          ¿Ya tienes una cuenta?{" "}
          <Link
            component="button"
            onClick={() => navigate("/login")}
            sx={{ color: "#3A8DFF", fontWeight: "bold" }}
          >
            Inicia sesión aquí
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
