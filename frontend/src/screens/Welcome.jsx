import React from "react";
import { Grid, Button, Typography, Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Zoom, Fade, Bounce } from "react-awesome-reveal";

const Welcome = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Zoom>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F6F8FF 0%, #EDF1FF 100%)",
          padding: 2,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Fade>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            gutterBottom
            sx={{ 
              color: "#2E3B55",
              fontWeight: "800",
              textAlign: "center",
              marginBottom: 3,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              letterSpacing: "0.5px"
            }}
          >
            Bienvenido a KHub
          </Typography>
        </Fade>

        <Box
          component="img"
          src="/khublogo.svg"
          alt="KHub Logo"
          sx={{
            width: isMobile ? "85%" : "45%",
            maxWidth: "380px",
            height: "auto",
            objectFit: "contain",
            margin: "2rem 0",
            borderRadius: "16px",
            boxShadow: "0px 10px 30px rgba(46, 59, 85, 0.15)",
            transform: "translateY(-10px)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-15px)",
            }
          }}
        />

        <Grid
          container
          spacing={3}
          sx={{
            width: "90%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "column",
            marginTop: 4,
          }}
        >
          <Grid item xs={12}>
            <Bounce>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/login")}
                sx={{
                  padding: 2,
                  fontSize: "17px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  backgroundColor: "#4A90E2",
                  color: "#FFFFFF",
                  boxShadow: "0px 4px 15px rgba(74, 144, 226, 0.3)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { 
                    backgroundColor: "#357ABD",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 6px 20px rgba(74, 144, 226, 0.4)",
                  }
                }}
              >
                Iniciar Sesión
              </Button>
            </Bounce>
          </Grid>

          <Grid item xs={12}>
            <Bounce>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/register")}
                sx={{
                  padding: 2,
                  fontSize: "17px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  borderColor: "#4A90E2",
                  borderWidth: "2px",
                  color: "#4A90E2",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { 
                    backgroundColor: "rgba(74, 144, 226, 0.05)",
                    borderColor: "#357ABD",
                    color: "#357ABD",
                    transform: "translateY(-2px)",
                  }
                }}
              >
                Registrarse
              </Button>
            </Bounce>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{
            marginTop: 4,
            color: "#6B7C93",
            textAlign: "center",
            fontSize: "0.9rem"
          }}
        >
          Tu plataforma de gestión de conocimiento
        </Typography>
      </Box>
    </Zoom>
  );
};

export default Welcome;