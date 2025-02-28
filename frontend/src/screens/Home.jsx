import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Container, Grid, Paper, IconButton, InputBase, Avatar, Menu, MenuItem, Divider, Button, List, ListItem, ListItemAvatar, ListItemText, Collapse, CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Zoom, Fade } from "react-awesome-reveal";
import { useMediaQuery } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideShowIcon from '@mui/icons-material/Slideshow';
import TableChartIcon from '@mui/icons-material/TableChart';
import FolderIcon from '@mui/icons-material/Folder';

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // Estados para recursos recientes
  const [mostrarPreview, setMostrarPreview] = useState(true); // Cambiado a true por defecto
  const [recursos, setRecursos] = useState([]);
  const [cargando, setCargando] = useState(true); // Cambiado a true por defecto

  // Función para obtener recursos recientes (última hora)
  const obtenerRecursosRecientes = async () => {
    setCargando(true);
    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const ahora = new Date();
      const unaHoraAtras = new Date(ahora.getTime() - 60 * 60 * 1000);
      
      // Datos de ejemplo - reemplazar con llamada a API real
      const datosDeRecursos = [
        { 
          id: 1, 
          nombre: 'Presentación Trimestral Q1', 
          tipo: 'presentacion', 
          autor: 'María González', 
          fechaCreacion: new Date(ahora.getTime() - 15 * 60 * 1000)
        },
        { 
          id: 2, 
          nombre: 'Guía de Onboarding', 
          tipo: 'documento', 
          autor: 'Carlos Ramírez', 
          fechaCreacion: new Date(ahora.getTime() - 30 * 60 * 1000)
        },
        { 
          id: 3, 
          nombre: 'Reporte de Ventas Mensual', 
          tipo: 'hoja_calculo', 
          autor: 'Ana Martínez', 
          fechaCreacion: new Date(ahora.getTime() - 45 * 60 * 1000)
        }
      ];
      
      // Filtrar recursos de la última hora
      const recursosRecientes = datosDeRecursos.filter(
        recurso => recurso.fechaCreacion >= unaHoraAtras
      );
      
      setRecursos(recursosRecientes);
    } catch (error) {
      console.error('Error al obtener recursos recientes:', error);
    } finally {
      setCargando(false);
    }
  };

  // Cargar recursos automáticamente al montar el componente
  useEffect(() => {
    obtenerRecursosRecientes();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  // Manejar clic en el recuadro de recursos recientes
  const handleTogglePreview = () => {
    setMostrarPreview(!mostrarPreview);
  };

  // Función para formatear la hora (HH:MM)
  const formatearHora = (fecha) => {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener el icono correspondiente al tipo de recurso
  const obtenerIcono = (tipo) => {
    switch (tipo) {
      case 'documento':
        return <DescriptionIcon sx={{ color: '#4A90E2' }} />;
      case 'presentacion':
        return <SlideShowIcon sx={{ color: '#FADA7A' }} />;
      case 'hoja_calculo':
        return <TableChartIcon sx={{ color: '#55AD9B' }} />;
      default:
        return <FolderIcon sx={{ color: '#9C27B0' }} />;
    }
  };

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

          <Button
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            onClick={() => navigate("/dash")}
            sx={{ mr: 2 }}
          >
            Ir a
          </Button>
          
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
      
      <Container sx={{ flexGrow: 0, mt: 4, mb: 4 }}>
      </Container>

      <Container sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Zoom>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2, backgroundColor: '#4A90E2', color: 'white' }}>
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
                    component="button"
                    onClick={() => navigate('/resource')}
                    sx={{
                      p: 3,
                      mt: 1.5,
                      padding: 9.5,
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
                    component="button"
                    sx={{
                      p: 3,  
                      mt: 1.5,
                      padding: 9.5,
                      paddingLeft: 13,         
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
                  {/* Componente de Recursos Recientes modificado para carga automática */}
                  <Paper
                    sx={{   
                      p: 3, 
                      borderRadius: 2,
                      paddingRight: 5,
                      mt: 1.5,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                      } 
                    }}
                    onClick={handleTogglePreview}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Recursos Recientes
                      </Typography>
                      {mostrarPreview ? 
                        <ExpandLessIcon sx={{ color: '#4A90E2' }} /> : 
                        <ExpandMoreIcon sx={{ color: '#4A90E2' }} />
                      }
                    </Box>
                    
                    <Collapse in={mostrarPreview} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 2, maxHeight: '300px', overflowY: 'auto' }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                          Recursos agregados en la última hora:
                        </Typography>
                        
                        {cargando ? (
                          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <CircularProgress size={28} sx={{ color: '#4A90E2' }} />
                          </Box>
                        ) : recursos.length > 0 ? (
                          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {recursos.map((recurso) => (
                              <ListItem 
                                key={recurso.id} 
                                alignItems="flex-start" 
                                sx={{ 
                                  p: 1, 
                                  borderRadius: 1,
                                  '&:hover': { bgcolor: '#F5F7FF' } 
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: '#f5f5f5' }}>
                                    {obtenerIcono(recurso.tipo)}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={recurso.nombre}
                                  secondary={
                                    <React.Fragment>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ display: 'block', color: 'text.primary' }}
                                      >
                                        {recurso.autor}
                                      </Typography>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Agregado a las {formatearHora(recurso.fechaCreacion)}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                            No hay recursos agregados en la última hora
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                    
                    {!mostrarPreview && (
                      <Typography variant="body2" color="text.secondary">
                        {recursos.length > 0 
                          ? `${recursos.length} recursos agregados recientemente`
                          : "No hay recursos recientes para mostrar"}
                      </Typography>
                    )}
                  </Paper>
                  {/* Fin del componente de Recursos Recientes modificado */}
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