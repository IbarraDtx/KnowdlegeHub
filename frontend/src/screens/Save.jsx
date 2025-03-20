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
  Chip,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Zoom, Fade } from "react-awesome-reveal";
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShareIcon from '@mui/icons-material/Share';
import SortIcon from '@mui/icons-material/Sort';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Edit } from "@mui/icons-material";

// Componente de Header/Navbar (reutilizable de Home)
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
            placeholder="Buscar en mis guardados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ 'aria-label': 'buscar guardados' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="buscar">
            <SearchIcon />
          </IconButton>
        </Paper>

        <Box sx={{ flexGrow: 1 }} />

       
        
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

// Componente para los filtros y opciones de ordenación
const FilterSortPanel = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [activeSort, setActiveSort] = useState("recientes");

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
    if (sortOpen) setSortOpen(false);
  };

  const toggleSort = () => {
    setSortOpen(!sortOpen);
    if (filterOpen) setFilterOpen(false);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSortChange = (sort) => {
    setActiveSort(sort);
  };

  return (
    <Paper sx={{ 
      p: 2, 
      mb: 3, 
      borderRadius: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            <BookmarkAddedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Mis Recursos Guardados
          </Typography>
          <Chip 
            label="89 recursos" 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<FilterListIcon />}
            onClick={toggleFilter}
            color={filterOpen ? "primary" : "inherit"}
            variant={filterOpen ? "contained" : "outlined"}
          >
            Filtrar
          </Button>
          
          <Button
            size="small"
            startIcon={<SortIcon />}
            onClick={toggleSort}
            color={sortOpen ? "primary" : "inherit"}
            variant={sortOpen ? "contained" : "outlined"}
          >
            Ordenar
          </Button>
        </Box>
      </Box>
      
      <Collapse in={filterOpen} timeout="auto">
        <Box sx={{ 
          mt: 2,
          p: 2, 
          borderRadius: 1, 
          bgcolor: '#f5f5f5',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Button 
            size="small" 
            variant={activeFilter === "todos" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("todos")}
          >
            Todos
          </Button>
          <Button 
            size="small" 
            variant={activeFilter === "documentos" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("documentos")}
            startIcon={<DescriptionIcon />}
          >
            Documentos
          </Button>
          <Button 
            size="small" 
            variant={activeFilter === "presentaciones" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("presentaciones")}
            startIcon={<SlideShowIcon />}
          >
            Presentaciones
          </Button>
          <Button 
            size="small" 
            variant={activeFilter === "hojas" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("hojas")}
            startIcon={<TableChartIcon />}
          >
            Hojas de cálculo
          </Button>
          <Button 
            size="small" 
            variant={activeFilter === "favoritos" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("favoritos")}
            startIcon={<FavoriteIcon />}
          >
            Favoritos
          </Button>
        </Box>
      </Collapse>
      
      <Collapse in={sortOpen} timeout="auto">
        <Box sx={{ 
          mt: 2,
          p: 2, 
          borderRadius: 1, 
          bgcolor: '#f5f5f5',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1
        }}>
          <Button 
            size="small" 
            variant={activeSort === "recientes" ? "contained" : "outlined"}
            onClick={() => handleSortChange("recientes")}
            startIcon={<AccessTimeIcon />}
          >
            Más recientes
          </Button>
          <Button 
            size="small" 
            variant={activeSort === "antiguos" ? "contained" : "outlined"}
            onClick={() => handleSortChange("antiguos")}
            startIcon={<CalendarTodayIcon />}
          >
            Más antiguos
          </Button>
          <Button 
            size="small" 
            variant={activeSort === "alfabetico" ? "contained" : "outlined"}
            onClick={() => handleSortChange("alfabetico")}
          >
            Alfabético (A-Z)
          </Button>
          <Button 
            size="small" 
            variant={activeSort === "alfabeticoDesc" ? "contained" : "outlined"}
            onClick={() => handleSortChange("alfabeticoDesc")}
          >
            Alfabético (Z-A)
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

// Componente para mostrar los recursos guardados en vista de tarjetas
const SavedResourcesGrid = () => {
  const [recursos, setRecursos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");

  // Simular carga de datos
  useEffect(() => {
    const cargarRecursosGuardados = async () => {
      setCargando(true);
      try {
        // Simular tiempo de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Datos de ejemplo
        const datosRecursos = [
          {
            id: 1,
            nombre: 'Guía de Onboarding para Nuevos Empleados',
            tipo: 'documento',
            autor: 'Recursos Humanos',
            fechaGuardado: new Date(2025, 2, 10),
            categoria: 'Recursos Humanos',
            favorito: true
          },
          {
            id: 2,
            nombre: 'Presentación Trimestral Q1 2025',
            tipo: 'presentacion',
            autor: 'María González',
            fechaGuardado: new Date(2025, 2, 8),
            categoria: 'Presentaciones',
            favorito: true
          },
          {
            id: 3,
            nombre: 'Reporte de Ventas Mensual - Febrero 2025',
            tipo: 'hoja_calculo',
            autor: 'Departamento de Ventas',
            fechaGuardado: new Date(2025, 2, 5),
            categoria: 'Reportes',
            favorito: false
          },
          {
            id: 4,
            nombre: 'Manual de Usuario - Plataforma KHub',
            tipo: 'documento',
            autor: 'Equipo Técnico',
            fechaGuardado: new Date(2025, 2, 1),
            categoria: 'Documentación',
            favorito: false
          },
          {
            id: 5,
            nombre: 'Plan Estratégico 2025-2026',
            tipo: 'documento',
            autor: 'Dirección Ejecutiva',
            fechaGuardado: new Date(2025, 1, 28),
            categoria: 'Estrategia',
            favorito: true
          },
          {
            id: 6,
            nombre: 'Análisis Competitivo del Mercado',
            tipo: 'presentacion',
            autor: 'Departamento de Marketing',
            fechaGuardado: new Date(2025, 1, 25),
            categoria: 'Marketing',
            favorito: false
          },
          {
            id: 7,
            nombre: 'Presupuesto Anual 2025',
            tipo: 'hoja_calculo',
            autor: 'Departamento Financiero',
            fechaGuardado: new Date(2025, 1, 20),
            categoria: 'Finanzas',
            favorito: false
          },
          {
            id: 8,
            nombre: 'Tutorial - Uso Avanzado de la API Interna',
            tipo: 'documento',
            autor: 'Departamento de Desarrollo',
            fechaGuardado: new Date(2025, 1, 15),
            categoria: 'Tutoriales',
            favorito: false
          }
        ];
        
        setRecursos(datosRecursos);
      } catch (error) {
        console.error('Error al cargar los recursos guardados:', error);
      } finally {
        setCargando(false);
      }
    };
    
    cargarRecursosGuardados();
  }, []);
  
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
  
  const formatearFecha = (fecha) => {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const toggleFavorito = (id) => {
    setRecursos(recursos.map(recurso => 
      recurso.id === id 
        ? { ...recurso, favorito: !recurso.favorito } 
        : recurso
    ));
  };
  
  const eliminarRecurso = (id) => {
    setRecursos(recursos.filter(recurso => recurso.id !== id));
  };
  
  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Grid container spacing={1}>
      {recursos.map((recurso) => (
        <Grid item xs={13} sm={7} md={5} lg={4} key={recurso.id}>
          <Zoom duration={300}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    variant="rounded" 
                    sx={{ 
                      bgcolor: '#f5f5f5',
                      width: 40,
                      height: 40
                    }}
                  >
                    {obtenerIcono(recurso.tipo)}
                  </Avatar>
                  <Box sx={{ ml: 1 }}>
                    <Chip 
                      label={recurso.categoria} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton 
                    size="small" 
                    onClick={() => toggleFavorito(recurso.id)}
                    color={recurso.favorito ? "error" : "default"}
                  >
                    <FavoriteIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="h6" component="div" sx={{ 
                  mb: 1,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.3',
                  height: '2.6em'
                }}>
                  {recurso.nombre}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Por {recurso.autor}
                </Typography>
                
                <Typography variant="caption" color="text.secondary" sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}>
                  <BookmarkIcon fontSize="inherit" />
                  Guardado el {formatearFecha(recurso.fechaGuardado)}
                </Typography>
              </CardContent>
              
              <CardActions sx={{ 
                borderTop: '1px solid #f0f0f0',
                justifyContent: 'space-between',
                px: 2,
                py: 1
              }}>
                <Button 
                  size="small" 
                  onClick={() => console.log('Abrir recurso', recurso.id)}
                >
                  Abrir
                </Button>
                <Button 
                  size="small"
                  color="success"
                  onClick={() => navigate("/Update")}
                  >
                  Editar
                </Button>
                
                <Box>
                  
                  <Tooltip title="Eliminar de guardados">
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => eliminarRecurso(recurso.id)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>
            </Card>
          </Zoom>
        </Grid>
      ))}
      
      {recursos.length === 0 && (
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2 
          }}>
            <BookmarkBorderIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No tienes recursos guardados
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Explora la plataforma y guarda los recursos que te parezcan útiles
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/home")}
            >
              Ir a explorar
            </Button>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

// Componente para las colecciones de recursos guardados
const SavedCollections = () => {
  const collections = [
    { id: 1, name: 'Onboarding', count: 5 },
    { id: 2, name: 'Mejores Prácticas', count: 8 },
    { id: 3, name: 'Tutoriales Técnicos', count: 12 },
    { id: 4, name: 'Reuniones Importantes', count: 3 }
  ];
  
  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: 2,
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }
    }}>
      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ 
        display: 'flex', 
        alignItems: 'center' 
      }}>
        <FolderIcon sx={{ mr: 1 }} />
        Mis Colecciones
      </Typography>
      
      {collections.length > 0 ? (
        <List>
          {collections.map((collection) => (
            <ListItem 
              key={collection.id}
              component={Button}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                textAlign: 'left',
                textTransform: 'none',
                px: 2,
                mb: 1,
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#F5F7FF',
                  transform: 'translateX(5px)'
                }
              }}
            >
              <Typography variant="body2">{collection.name}</Typography>
              <Chip 
                label={collection.count} 
                size="small" 
                color="primary"
                variant="outlined"
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ 
          textAlign: 'center',
          py: 3
        }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            No tienes colecciones creadas
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ mt: 1 }}
          >
            Crear colección
          </Button>
        </Box>
      )}
      
      <Divider sx={{ my: 2 }} />
      
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        sx={{ mt: 1 }}
      >
        Nueva colección
      </Button>
    </Paper>
  );
};

// Componente principal Save
const Save = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
              <ListItem button onClick={() => navigate('/home')}>
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
              <ListItem selected>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
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
            onClick={() => navigate('/home')}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { color: theme.palette.primary.main } 
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Inicio
          </Link>
          <Typography color="text.primary" sx={{ 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            <BookmarkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Mis Guardados
          </Typography>
        </Breadcrumbs>
      </Container>

      <Container sx={{ flexGrow: 1, mb: 4 }}>
        <FilterSortPanel />
        
        {isMobile && (
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
          >
            <Tab 
              label="Recursos" 
              icon={<BookmarkIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Colecciones" 
              icon={<FolderIcon />} 
              iconPosition="start"
            />
          </Tabs>
        )}
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} sx={{ 
            display: (!isMobile || (isMobile && tabValue === 0)) ? 'block' : 'none' 
          }}>
            <SavedResourcesGrid />
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ 
            display: (!isMobile || (isMobile && tabValue === 1)) ? 'block' : 'none' 
          }}>
            <SavedCollections />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Save;