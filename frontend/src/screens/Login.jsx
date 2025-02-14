import React from "react";
import { Container, Box, Paper, TextField, Button, Typography, useMediaQuery } from "@mui/material";
import { Zoom } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
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
        background: "#EFF5F0", 
        padding: 2,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Zoom>
        <Container maxWidth="xs">
          <Paper
            elevation={10}
            sx={{
              padding: 4,
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 20px rgba(156, 186, 157, 0.2)",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              gutterBottom
              sx={{ 
                fontWeight: "bold", 
                color: "#7CAB81" 
              }}
            >
              Iniciar Sesión
            </Typography>

            <TextField 
              label="Correo Electrónico" 
              fullWidth 
              margin="normal" 
              variant="outlined" 
              sx={{ 
                input: { color: '#526F55' },
                label: { color: '#98B99C' },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: '#CFE0D1' },
                  "&:hover fieldset": { borderColor: '#98B99C' },
                  "&.Mui-focused fieldset": { borderColor: '#7CAB81' },
                }
              }} 
            />
            <TextField 
              label="Contraseña" 
              type="password" 
              fullWidth 
              margin="normal" 
              variant="outlined" 
              sx={{ 
                input: { color: '#526F55' },
                label: { color: '#98B99C' },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: '#CFE0D1' },
                  "&:hover fieldset": { borderColor: '#98B99C' },
                  "&.Mui-focused fieldset": { borderColor: '#7CAB81' },
                }
              }} 
            />

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/home")}
              sx={{
                marginTop: 2,
                padding: 1.5,
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: 2,
                backgroundColor: "#7CAB81",
                color: "#fff",
                "&:hover": { 
                  backgroundColor: "#658869",
                  boxShadow: "0px 4px 15px rgba(124, 171, 129, 0.3)",
                },
              }}
            >
              Ingresar
            </Button>

            <Typography 
              variant="body2" 
              sx={{ 
                marginTop: 2, 
                color: "#526F55" 
              }}
            >
              ¿No tienes una cuenta?{" "}
              <span 
                style={{ 
                  color: "#7CAB81", 
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/register")}
              >
                Regístrate
              </span>
            </Typography>
          </Paper>
        </Container>
      </Zoom>
    </Box>
  );
};

export default Login;