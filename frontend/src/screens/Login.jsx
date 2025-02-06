import React from "react";
import { Container, Box, Paper, TextField, Button, Typography, useMediaQuery } from "@mui/material";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3A8DFF 30%, #6B6BFF 90%)",
        padding: 2,
        boxSizing: "border-box", 
        overflow: "hidden", 
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 3,
            textAlign: "center",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            gutterBottom
            sx={{ fontWeight: "bold", color: "#3A8DFF" }}
          >
            Iniciar Sesión
          </Typography>

          <TextField label="Correo Electrónico" fullWidth margin="normal" variant="outlined" />
          <TextField label="Contraseña" type="password" fullWidth margin="normal" variant="outlined" />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: 2,
              padding: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: 2,
              backgroundColor: "#3A8DFF",
              "&:hover": { backgroundColor: "#357AE8" },
            }}
          >
            Ingresar
          </Button>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            ¿No tienes una cuenta? <span style={{ color: "#3A8DFF", cursor: "pointer" }}>Regístrate</span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
