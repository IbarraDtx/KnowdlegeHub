import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  IconButton, 
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Badge,
  Snackbar,
  Alert,
  CircularProgress,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Tag as TagIcon,
  Info as InfoIcon,
  Preview as PreviewIcon,
  InsertDriveFile as FileIcon,
  Add as AddIcon
} from '@mui/icons-material';

const Update = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const fileInputRef = useRef(null);

  // Estado para el recurso que se está editando
  const [formData, setFormData] = useState({
    title: 'Guía de Recursos Educativos',
    description: 'Colección de materiales didácticos para estudiantes de nivel secundario.',
    category: 'education',
    visibility: 'public'
  });

  // Estados adicionales
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState(['educación', 'recursos', 'didáctico']);
  const [suggestedTags, setSuggestedTags] = useState(['estudiantes', 'secundaria', 'materiales', 'aprendizaje', 'aula', 'digital']);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Simular carga de datos del recurso existente
  useEffect(() => {
    // Simulamos la carga del recurso con un timeout
    const timer = setTimeout(() => {
      // Aquí cargaríamos los datos reales del recurso
      setFiles([
        new File(["dummy content"], "documento1.pdf", { type: "application/pdf" }),
        new File(["dummy content"], "imagen.jpg", { type: "image/jpeg" })
      ]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Categorías disponibles
  const categories = [
    { value: 'education', label: 'Educación' },
    { value: 'technology', label: 'Tecnología' },
    { value: 'science', label: 'Ciencia' },
    { value: 'art', label: 'Arte' },
    { value: 'literature', label: 'Literatura' }
  ];

  // Manejadores de eventos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar error si el campo ahora tiene valor
    if (value.trim() !== '') {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleDeleteFile = (fileToDelete) => {
    setFiles(files.filter(file => file !== fileToDelete));
  };

  const handleDeleteAllFiles = () => {
    setFiles([]);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'El título es requerido';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'La descripción es requerida';
    }
    
    if (!formData.category) {
      errors.category = 'Seleccione una categoría';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      setIsLoading(true);
      
      // Simular actualización
      setTimeout(() => {
        setIsLoading(false);
        setSnackbar({
          open: true,
          message: 'Recurso actualizado correctamente',
          severity: 'success'
        });
        
        // Redirigir después de unos segundos
        setTimeout(() => navigate(-1), 2000);
      }, 1500);
    }
  };

  const handleDelete = () => {
    // Confirmar antes de eliminar
    if (window.confirm('¿Está seguro de eliminar este recurso? Esta acción no se puede deshacer.')) {
      setIsLoading(true);
      
      // Simular eliminación
      setTimeout(() => {
        setIsLoading(false);
        setSnackbar({
          open: true,
          message: 'Recurso eliminado correctamente',
          severity: 'info'
        });
        
        // Redirigir después de unos segundos
        setTimeout(() => navigate(-1), 2000);
      }, 1500);
    }
  };

  // Función para formatear el tamaño de archivos
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Vista previa del recurso
  const renderPreview = () => {
    if (!formData.title) {
      return (
        <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">
            Complete el formulario para ver la vista previa
          </Typography>
        </Box>
      );
    }
    
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom color="#2E3B55" fontWeight="bold">
          {formData.title}
        </Typography>
        
        <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip 
            size="small" 
            label={categories.find(cat => cat.value === formData.category)?.label || ''} 
            sx={{ bgcolor: '#4A90E2', color: 'white' }} 
          />
          <Chip 
            size="small" 
            icon={formData.visibility === 'public' ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
            label={formData.visibility === 'public' ? 'Público' : 'Privado'} 
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {formData.description}
        </Typography>
        
        {tags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Etiquetas:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    fontSize: '0.7rem',
                    height: 24,
                    bgcolor: '#F0F7FF',
                    color: '#4A90E2',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
        
        {files.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Archivos ({files.length}):
            </Typography>
            <List dense sx={{ bgcolor: 'white', borderRadius: 1, border: '1px solid #E0E0E0', mb: 0 }}>
              {files.slice(0, 3).map((file, index) => (
                <ListItem key={index} sx={{ py: 0.5, px: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <FileIcon sx={{ fontSize: 18, color: '#4A90E2' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="body2" noWrap>{file.name}</Typography>}
                    sx={{ m: 0 }}
                  />
                </ListItem>
              ))}
              {files.length > 3 && (
                <ListItem sx={{ py: 0.5, px: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    +{files.length - 3} archivos más
                  </Typography>
                </ListItem>
              )}
            </List>
          </Box>
        )}
      </Box>
    );
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
        pb: 4
      }}
    >
        
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Encabezado con botón de regreso */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton 
            onClick={() => navigate(-1)}
            sx={{ mr: 2, color: '#4A90E2' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" color="#2E3B55">
            Editar Recurso
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Fade>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: 'white',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                {/* Título */}
                <TextField
                  fullWidth
                  name="title"
                  label="Título"
                  placeholder="Ingrese el título del recurso"
                  variant="outlined"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={!!formErrors.title}
                  helperText={formErrors.title}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />

                {/* Descripción */}
                <TextField
                  fullWidth
                  name="description"
                  label="Descripción"
                  placeholder="Ingrese una descripción breve"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={formData.description}
                  onChange={handleInputChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />

                {/* Configuración adicional */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={6}>
                    {/* Categoría */}
                    <FormControl fullWidth error={!!formErrors.category}>
                      <InputLabel id="category-label" required>Categoría</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        label="Categoría"
                        sx={{
                          borderRadius: 2,
                        }}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formErrors.category && (
                        <Typography variant="caption" color="error">
                          {formErrors.category}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* Visibilidad */}
                    <FormControl fullWidth>
                      <InputLabel id="visibility-label">Visibilidad</InputLabel>
                      <Select
                        labelId="visibility-label"
                        id="visibility"
                        name="visibility"
                        value={formData.visibility}
                        onChange={handleInputChange}
                        label="Visibilidad"
                        sx={{
                          borderRadius: 2,
                        }}
                      >
                        <MenuItem value="public">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <VisibilityIcon sx={{ mr: 1, fontSize: 20 }} />
                            Público
                          </Box>
                        </MenuItem>
                        <MenuItem value="private">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <VisibilityOffIcon sx={{ mr: 1, fontSize: 20 }} />
                            Privado
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Etiquetas */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TagIcon sx={{ mr: 1, color: '#4A90E2' }} />
                    <Typography variant="h6" fontWeight="bold" color="#2E3B55">
                      Etiquetas
                    </Typography>
                    <Tooltip title="Las etiquetas ayudan a categorizar y encontrar tu recurso más fácilmente">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mb: 2,
                    flexDirection: isMobile ? 'column' : 'row'
                  }}>
                    <TextField
                      placeholder="Nueva etiqueta"
                      size="small"
                      fullWidth={isMobile}
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      InputProps={{
                        startAdornment: <TagIcon sx={{ mr: 1, color: '#4A90E2', fontSize: 20 }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddTag}
                      disabled={!newTag.trim()}
                      sx={{
                        bgcolor: '#4A90E2',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#357ABD'
                        },
                        '&.Mui-disabled': {
                          bgcolor: '#E0E0E0',
                          color: '#9E9E9E'
                        }
                      }}
                    >
                      Agregar
                    </Button>
                  </Box>
                  
                  {/* Etiquetas sugeridas */}
                  {suggestedTags.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Etiquetas sugeridas:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {suggestedTags.slice(0, 8).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            onClick={() => {
                              if (!tags.includes(tag)) {
                                setTags([...tags, tag]);
                              }
                            }}
                            sx={{
                              borderRadius: 1.5,
                              bgcolor: '#F8FAFF',
                              border: '1px solid #E1EFFF',
                              '&:hover': {
                                bgcolor: '#F0F7FF'
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {/* Etiquetas agregadas */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        sx={{
                          borderRadius: 1.5,
                          bgcolor: '#F0F7FF',
                          color: '#4A90E2',
                          '&:hover': {
                            bgcolor: '#E1EFFF'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Archivos */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CloudUploadIcon sx={{ mr: 1, color: '#4A90E2' }} />
                    <Typography variant="h6" fontWeight="bold" color="#2E3B55">
                      Archivos adjuntos
                    </Typography>
                    <Badge badgeContent={files.length} color="primary" sx={{ ml: 1 }}>
                      <Box />
                    </Badge>
                  </Box>
                  
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="file-upload-input"
                  />
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      backgroundColor: '#F8FAFF',
                      border: '2px dashed #4A90E2',
                      borderRadius: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: '#F0F7FF',
                        borderColor: '#357ABD'
                      }
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <CloudUploadIcon sx={{ fontSize: 48, color: '#4A90E2', mb: 2 }} />
                    <Typography variant="body1" gutterBottom color="#2E3B55">
                      Arrastre archivos aquí o
                    </Typography>
                    <Button
                      variant="contained"
                      component="span"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current.click();
                      }}
                      sx={{
                        mt: 1,
                        bgcolor: '#4A90E2',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#357ABD'
                        }
                      }}
                    >
                      Seleccionar archivos
                    </Button>
                  </Paper>
                  
                  {/* Lista de archivos */}
                  {files.length > 0 && (
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 2,
                        p: 2,
                        backgroundColor: '#F8FAFF',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {files.length} {files.length === 1 ? 'archivo' : 'archivos'} seleccionados
                        </Typography>
                        <Button 
                          size="small" 
                          variant="text" 
                          color="error" 
                          onClick={handleDeleteAllFiles}
                          startIcon={<DeleteIcon />}
                        >
                          Eliminar todos
                        </Button>
                      </Box>
                      
                      <List dense sx={{ 
                        maxHeight: isMobile ? '200px' : '300px', 
                        overflow: 'auto',
                        bgcolor: 'white',
                        borderRadius: 1,
                        border: '1px solid #E0E0E0'
                      }}>
                        {files.map((file, index) => (
                          <ListItem 
                            key={index} 
                            sx={{ 
                              borderBottom: index < files.length - 1 ? '1px solid #E0E0E0' : 'none',
                              p: 1
                            }}
                          >
                            <ListItemIcon>
                              <FileIcon sx={{ color: '#4A90E2' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={
                                <Typography noWrap variant="body2">{file.name}</Typography>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary">
                                  {formatFileSize(file.size)}
                                </Typography>
                              }
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            />
                            <ListItemSecondaryAction>
                              <Tooltip title="Eliminar archivo">
                                <IconButton 
                                  edge="end" 
                                  aria-label="delete"
                                  onClick={() => handleDeleteFile(file)}
                                  sx={{ color: '#FF6B6B' }}
                                  size="small"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Botones de acción */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  mt: 2
                }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    disabled={isLoading}
                    sx={{
                      borderRadius: 2,
                      borderColor: '#FF6B6B',
                      color: '#FF6B6B',
                      '&:hover': {
                        bgcolor: '#FFF0F0',
                        borderColor: '#FF5252'
                      },
                      order: isMobile ? 2 : 1,
                      width: isMobile ? '100%' : 'auto'
                    }}
                  >
                    Eliminar Recurso
                  </Button>
                  
                  <Box sx={{
                    display: 'flex',
                    gap: 2,
                    order: isMobile ? 1 : 2,
                    width: isMobile ? '100%' : 'auto'
                  }}>
                    <Button
                      variant="outlined"
                      fullWidth={isMobile}
                      startIcon={<CancelIcon />}
                      onClick={() => navigate(-1)}
                      sx={{
                        borderRadius: 2,
                        color: '#2E3B55',
                        borderColor: '#2E3B55',
                        '&:hover': {
                          bgcolor: '#F0F7FF'
                        }
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth={isMobile}
                      startIcon={isLoading ? null : <SaveIcon />}
                      onClick={handleUpdate}
                      disabled={isLoading}
                      sx={{
                        borderRadius: 2,
                        bgcolor: '#4A90E2',
                        '&:hover': {
                          bgcolor: '#357ABD'
                        }
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : 'Guardar Cambios'}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>

          {/* Panel de vista previa */}
          <Grid item xs={12} md={4}>
            <Fade>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: 'white',
                  position: isMobile ? 'relative' : 'sticky',
                  top: 24,
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  },
                  height: isMobile ? 'auto' : '550px',
                  overflow: 'auto'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PreviewIcon sx={{ mr: 1, color: '#4A90E2' }} />
                  <Typography variant="h6" fontWeight="bold" color="#2E3B55">
                    Vista previa
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{
                  height: isMobile ? 'auto' : '460px',
                  backgroundColor: '#F8FAFF',
                  borderRadius: 2,
                  overflow: 'auto'
                }}>
                  {renderPreview()}
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
      
      {/* Snackbar de notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Update;