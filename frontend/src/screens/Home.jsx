import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Container, Grid, Paper, IconButton, InputBase, Avatar, Menu, MenuItem, Divider, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Zoom, Fade } from "react-awesome-reveal";
import { useMediaQuery } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "#F6F8FF",
        color: "#2E3B55",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 0, color: "#4A90E2", fontWeight: "bold", marginRight: 4 }}>
            KHub
          </Typography>
          
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mr: 2, borderRadius: "20px" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar recursos..."
            />
            <IconButton type="button" sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#4A90E2',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              OP
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> Perfil
            </MenuItem>
            <MenuItem>
              <AccountCircleIcon sx={{ mr: 1 }} /> Mi cuenta
            </MenuItem>
            <Divider />
            <MenuItem>
              <SettingsIcon sx={{ mr: 1 }} /> Configuración
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Cerrar sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Zoom>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, backgroundColor: '#55AD9B', color: 'white' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Panel de Conocimiento
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4">150</Typography>
                      <Typography variant="body2">Recursos Compartidos</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4">45</Typography>
                      <Typography variant="body2">Contribuidores</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4">89</Typography>
                      <Typography variant="body2">Recursos Guardados</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4">12</Typography>
                      <Typography variant="body2">Categorías</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={8}>
            <Fade>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                      }
                    }}
                  >
                    <CreateIcon sx={{ fontSize: 40, color: '#FADA7A', mb: 1 }} />
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Crear Recurso
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Comparte documentación, tutoriales o guías útiles
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                      }
                    }}
                  >
                    <BookmarkIcon sx={{ fontSize: 40, color: '#55AD9B', mb: 1 }} />
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Mis Guardados
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Accede a tus recursos guardados
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    sx={{   
                        p: 3, 
                        borderRadius: 2,
                        mt: 1.5,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        } 
                      }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Recursos Recientes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      No hay recursos recientes para mostrar
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade>
              <Paper
                sx={{   
                        p: 3, 
                        borderRadius: 2,
                        mt: 1.5,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        } 
                      }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Categorías Populares
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {['Tutoriales', 'Documentación', 'Guías', 'Mejores Prácticas'].map((category) => (
                    <Button
                      key={category}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        mb: 1,
                        textTransform: 'none',
                        color: '#2E3B55'
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
