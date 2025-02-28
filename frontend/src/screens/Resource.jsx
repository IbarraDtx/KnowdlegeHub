import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Chip,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Preview as PreviewIcon,
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
  InsertDriveFile as FileIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const Resource = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const fileInputRef = useRef(null);
  
  // Estado para manejar las etiquetas
  const [tags, setTags] = useState(['Ejemplo 1', 'Ejemplo 2', 'Ejemplo 3']);
  const [newTag, setNewTag] = useState('');

  // Estado para manejar los archivos
  const [files, setFiles] = useState([]);

  // Función para manejar la adición de etiquetas
  const handleAddTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag(''); // Limpiar el campo después de agregar
    }
  };

  // Función para manejar el evento de tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Función para eliminar etiquetas
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Función para manejar la carga de archivos
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    // Limpia el input para permitir cargar el mismo archivo múltiples veces
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Función para manejar la eliminación de archivos
  const handleDeleteFile = (fileToDelete) => {
    setFiles(files.filter(file => file !== fileToDelete));
  };

  // Función para manejar el arrastrar y soltar
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            Crear Nuevo Recurso
          </Typography>
        </Box>

        <Grid container spacing={4} >
          <Grid item xs={12} md={8}>
            <Fade>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: 'white',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >

                <TextField
                  fullWidth
                  label="Título"
                  placeholder="Ingrese el título del recurso"
                  variant="outlined"
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
                  label="Descripción"
                  placeholder="Ingrese una descripción breve"
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />

                {/* Categoría */}
                <TextField
                  fullWidth
                  select
                  label="Categoría"
                  defaultValue=""
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  <option value="" disabled></option>
                  <option value="educacion">Educación</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="ciencia">Ciencia</option>
                  <option value="arte">Arte</option>
                </TextField>

                {/* Etiquetas */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold" color="#2E3B55">
                    Etiquetas
                  </Typography>
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
                      sx={{
                        bgcolor: '#4A90E2',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#357ABD'
                        }
                      }}
                    >
                      Agregar
                    </Button>
                  </Box>
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
                  <Typography variant="h6" gutterBottom fontWeight="bold" color="#2E3B55">
                    Archivos adjuntos
                  </Typography>
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
                      <List dense>
                        {files.map((file, index) => (
                          <ListItem key={index} sx={{ borderBottom: index < files.length - 1 ? '1px solid #E0E0E0' : 'none' }}>
                            <ListItemIcon>
                              <FileIcon sx={{ color: '#4A90E2' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={file.name}
                              secondary={formatFileSize(file.size)}
                            />
                            <ListItemSecondaryAction>
                              <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={() => handleDeleteFile(file)}
                                sx={{ color: '#FF6B6B' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  )}
                </Box>

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
                    startIcon={<PreviewIcon />}
                    sx={{
                      borderRadius: 2,
                      borderColor: '#4A90E2',
                      color: '#4A90E2',
                      order: isMobile ? 2 : 1,
                      '&:hover': {
                        borderColor: '#357ABD',
                        bgcolor: '#F0F7FF'
                      }
                    }}
                  >
                    Vista previa
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
                      sx={{
                        borderRadius: 2,
                        bgcolor: '#4A90E2',
                        '&:hover': {
                          bgcolor: '#357ABD'
                        }
                      }}
                    >
                      Guardar
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
                  transition: 'transform 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="bold" color="#2E3B55">
                  Vista previa
                </Typography>
                <Box sx={{
                  height: isMobile ? '300px' : '500px',
                  backgroundColor: '#F8FAFF',
                  borderRadius: 2,
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <Typography color="text.secondary">
                    La vista previa se mostrará aquí
                  </Typography>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Resource;