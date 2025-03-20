import React, { useState, useEffect, useMemo } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container, 
  Grid, 
  Paper, 
  IconButton, 
  InputBase, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider, 
  Button, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Collapse, 
  CircularProgress,
  Breadcrumbs,
  Link,
  Tooltip,
  Badge,
  Drawer,
  Skeleton,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Zoom, Fade } from "react-awesome-reveal";
import { useMediaQuery } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideShowIcon from '@mui/icons-material/Slideshow';
import TableChartIcon from '@mui/icons-material/TableChart';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import { Edit } from "@mui/icons-material";

// Componente de Header/Navbar
const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar la búsqueda real aquí
    console.log("Buscando:", searchTerm);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 1, color: "#4A90E2" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ flexGrow: 0, color: "#4A90E2", fontWeight: "bold", marginRight: 4 }}>
          KHub
        </Typography>
        
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{ 
            p: '2px 4px', 
            display: 'flex', 
            alignItems: 'center', 
            width: isMobile ? '100%' : 400, 
            mr: 2, 
            borderRadius: "20px" 
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar recursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ 'aria-label': 'buscar recursos' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="buscar">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Box sx={{ flexGrow: 1 }} />

        {!isMobile && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={() => navigate("/Update")}
            sx={{ mr: 2 }}
          >
            Editar recursos
          </Button>
        )}
        
        <Tooltip title="Notificaciones">
          <IconButton sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon color="action" />
            </Badge>
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Perfil">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
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
        </Tooltip>
        
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
  );
};

// Componente de Estadísticas 
const StatsPanel = () => {
  const stats = [
    { value: 150, label: "Recursos Compartidos" },
    { value: 45, label: "Contribuidores" },
    { value: 89, label: "Recursos Guardados" },
    { value: 12, label: "Categorías" }
  ];

  return (
    <Zoom>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          backgroundColor: '#4A90E2', 
          color: 'white',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Panel de Conocimiento
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 1,
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}>
                <Typography variant="h4">{stat.value}</Typography>
                <Typography variant="body2">{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Zoom>
  );
};

// Componente de Tarjetas de Acción
const ActionCards = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  
  const actions = [
    {
      title: "Crear Recurso",
      description: "Comparte documentación, tutoriales o guías útiles",
      icon: <CreateIcon sx={{ fontSize: 40, color: '#FADA7A', mb: 1 }} />,
      action: () => navigate('/resource')
    },
    {
      title: "Mis Guardados",
      description: "Accede a tus recursos guardados",
      icon: <BookmarkIcon sx={{ fontSize: 40, color: '#55AD9B', mb: 1 }} />,
      action: () => navigate('/save')
    }
  ];
  
  return (
    <Fade>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              component="button"
              onClick={action.action}
              sx={{
                p: isMobile ? 2 : 3,
                height: '100%',
                width: '100%',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }
              }}
            >
              {action.icon}
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {action.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {action.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Fade>
  );
};

// Componente de Recursos Recientes
const RecentResources = () => {
  const [mostrarPreview, setMostrarPreview] = useState(true);
  const [recursos, setRecursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const obtenerRecursosRecientes = async () => {
    setCargando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const ahora = new Date();
      const unaHoraAtras = new Date(ahora.getTime() - 60 * 60 * 1000);
      
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
        },
        { 
          id: 4, 
          nombre: 'Manual de Usuario', 
          tipo: 'documento', 
          autor: 'Juan Pérez', 
          fechaCreacion: new Date(ahora.getTime() - 55 * 60 * 1000)
        }
      ];
      
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

  useEffect(() => {
    obtenerRecursosRecientes();
  }, []);

  const handleTogglePreview = () => {
    setMostrarPreview(!mostrarPreview);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const formatearHora = (fecha) => {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  return (
    <Paper
      sx={{   
        p: 3, 
        borderRadius: 2,
        mt: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        } 
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 1
      }}>
        <Typography variant="h6" fontWeight="bold">
          Recursos Recientes
        </Typography>
        
        <Box>
          <Tooltip title="Filtrar recursos">
            <IconButton 
              size="small" 
              onClick={toggleFilter}
              sx={{ mr: 1 }}
            >
              <FilterListIcon color="primary" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={mostrarPreview ? "Ocultar detalles" : "Mostrar detalles"}>
            <IconButton 
              size="small" 
              onClick={handleTogglePreview}
              aria-expanded={mostrarPreview}
              aria-label="toggle resources preview"
            >
              {mostrarPreview ? 
                <ExpandLessIcon color="primary" /> : 
                <ExpandMoreIcon color="primary" />
              }
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Collapse in={filterOpen} timeout="auto">
        <Box sx={{ 
          p: 2, 
          mb: 2, 
          borderRadius: 1, 
          bgcolor: '#f5f5f5',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Button size="small" variant="outlined">Todos</Button>
          <Button size="small" variant="outlined">Documentos</Button>
          <Button size="small" variant="outlined">Presentaciones</Button>
          <Button size="small" variant="outlined">Hojas de cálculo</Button>
        </Box>
      </Collapse>
      
      <Collapse in={mostrarPreview} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2, maxHeight: '300px', overflowY: 'auto' }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Recursos agregados en la última hora:
          </Typography>
          
          {cargando ? (
            <Box sx={{ my: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                  <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                  <Box sx={{ width: '100%' }}>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="50%" height={20} />
                  </Box>
                </Box>
              ))}
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
                    mb: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: '#F5F7FF',
                      transform: 'translateX(5px)' 
                    } 
                  }}
                  button
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#f5f5f5' }}>
                      {obtenerIcono(recurso.tipo)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="medium">
                        {recurso.nombre}
                      </Typography>
                    }
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
            <Box 
              sx={{   
                textAlign: 'center', 
                py: 4, 
                bgcolor: '#f9f9f9', 
                borderRadius: 1 
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No hay recursos agregados en la última hora
              </Typography>
              <Button 
                variant="text" 
                color="primary" 
                sx={{ mt: 1 }}
                onClick={() => navigate('/resource')}
              >
                Crear un recurso
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
      
      {!mostrarPreview && (
        <Box sx={{ py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {recursos.length > 0 
              ? `${recursos.length} recursos agregados recientemente`
              : "No hay recursos recientes para mostrar"}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

// Componente de Categorías Populares
const PopularCategories = () => {
  const categories = [
    { name: 'Tutoriales', count: 24 },
    { name: 'Documentación', count: 18 },
    { name: 'Guías', count: 15 },
    { name: 'Mejores Prácticas', count: 12 },
    { name: 'Estudios de Caso', count: 9 }
  ];

  return (
    <Fade>
      <Paper
        sx={{   
          p: 3, 
          borderRadius: 2,
          height: '100%',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          } 
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Categorías
        </Typography>
        <Box sx={{ mt: 2 }}>
          {categories.map((category) => (
            <Button
              key={category.name}
              fullWidth
              sx={{
                justifyContent: 'space-between',
                mb: 1,
                py: 1,
                px: 2,
                textTransform: 'none',
                color: '#2E3B55',
                borderRadius: 1,
                textAlign: 'left',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#F5F7FF',
                  paddingLeft: '16px'
                }
              }}
            >
              <span>{category.name}</span>
              <Badge 
                badgeContent={category.count} 
                color="primary"
                sx={{ ml: 1 }}
              />
            </Button>
          ))}
          
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{
              mt: 2,
              textTransform: 'none'
            }}
          >
            Ver todas las categorías
          </Button>
          
        </Box>
      </Paper>
    </Fade>
  );
};

// Componente principal Home
const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
      <Header onMenuClick={toggleDrawer} />
      
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
          >
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Inicio" />
              </ListItem>
              <ListItem button onClick={() => navigate('/resource')}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                    <CreateIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Crear Recurso" />
              </ListItem>
              <ListItem button onClick={() => navigate('/save')}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                    <BookmarkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Mis Guardados" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
      
      <Container sx={{ mt: 3, mb: 1 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link 
            color="inherit" 
            href="" //HomeSweetHome
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              '&:hover': { color: theme.palette.primary.main } 
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Inicio
          </Link>
        </Breadcrumbs>
      </Container>

      <Container sx={{ flexGrow: 1, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StatsPanel />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ActionCards />
              </Grid>
              <Grid item xs={12}>
                <RecentResources />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <PopularCategories />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;