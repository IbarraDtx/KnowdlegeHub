import React from "react";
import { Paper, TextField, Button, Typography, Box, Link, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

const Register = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#E8F3F5", // Fondo azul aqua muy suave
        padding: 2,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Zoom>
        <Paper
          elevation={6}
          sx={{
            padding: isMobile ? 3 : 5,
            width: isMobile ? "86%" : "400px",
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 20px rgba(128, 189, 204, 0.2)",
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom
            sx={{ 
              fontWeight: "bold", 
              color: "#3DA5B9" // Azul aqua medio
            }}
          >
            Crea tu cuenta
          </Typography>

          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              input: { color: "#2C7B8E" }, // Azul aqua oscuro para el texto
              label: { color: "#69A7B7" }, // Azul aqua medio para el label
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#B5D8E0" }, // Azul aqua claro para el borde
                "&:hover fieldset": { borderColor: "#69A7B7" },
                "&.Mui-focused fieldset": { borderColor: "#3DA5B9" },
              },
            }}
          />
          <TextField
            label="Correo Electrónico"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              input: { color: "#2C7B8E" },
              label: { color: "#69A7B7" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#B5D8E0" },
                "&:hover fieldset": { borderColor: "#69A7B7" },
                "&.Mui-focused fieldset": { borderColor: "#3DA5B9" },
              },
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              input: { color: "#2C7B8E" },
              label: { color: "#69A7B7" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#B5D8E0" },
                "&:hover fieldset": { borderColor: "#69A7B7" },
                "&.Mui-focused fieldset": { borderColor: "#3DA5B9" },
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: 3,
              padding: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: 2,
              backgroundColor: "#3DA5B9",
              color: "white",
              "&:hover": { 
                backgroundColor: "#2C7B8E",
                boxShadow: "0px 4px 15px rgba(61, 165, 185, 0.3)",
              },
            }}
          >
            Registrarse
          </Button>

          <Typography variant="body2" sx={{ marginTop: 2, color: "#2C7B8E" }}>
            ¿Ya tienes una cuenta?{" "}
            <Link
              component="button"
              onClick={() => navigate("/login")}
              sx={{ 
                color: "#3DA5B9", 
                fontWeight: "bold",
                "&:hover": {
                  color: "#2C7B8E",
                },
              }}
            >
              Inicia sesión aquí
            </Link>
          </Typography>
        </Paper>
      </Zoom>
    </Box>
  );
};

export default Register;