import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; 
import NavbarUsuarioComponent from "./NavbarUsuarioComponent";
import { TextField, Typography, Card, CardContent, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Box, IconButton, Menu, MenuItem, Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { MoreVert, StarBorder as StarBorderIcon, ColorLens, FitnessCenter } from '@mui/icons-material';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import UsuarioService from '../services/UsuarioService';
import HealingIcon from '@mui/icons-material/Healing';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import GridViewIcon from '@mui/icons-material/GridView';
import theme from './styles/themeComponent';
import BloquesHoraListComponent from './BloqueHoraUsuarioPrincipalView/BloquesHoraListPrincipalComponent';


const styles = {
  container: { display: 'flex', height: '100vh' },
  content: { flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  welcomeMessage: { fontSize: '24px', fontWeight: 'bold', padding: '8px 10px' },
  searchBar: { display: 'flex', alignItems: 'center', border: '2px solid #ff436f  ', borderRadius: '40px', padding: '8px 16px', maxWidth: '600px', width: '100%' },
  searchInput: { marginLeft: '8px', width: '100%', border: 'none', outline: 'none' },
  mascotaListContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
  mascotaCard: { width: '100%', height: '350px', borderRadius: '15px' },
  doctorListContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
  doctorCard: { width: '750px', maxWidth: 750, borderRadius: '15px' },
  consultaCard: { backgroundColor: '#ff436f', color: 'white', padding: '20px', marginBottom: '20px', borderRadius: '10px', textAlign: 'center', width: '100%', maxWidth: '750px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
  subtitle: { fontSize: '14px' },
  title2: { fontSize: '18px', fontWeight: 'bold', padding: '4px 16px', textAlign: 'center' },
  subtitle2: { fontSize: '14px', color: '#C5C5C5', textAlign: 'center' },
  especialidadesContainer: { marginBottom: '20px', textAlign: 'center' },
  telemedicinaCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '10px', textAlign: 'center' },
  paper: { padding: '15px', textAlign: 'center', color: theme.palette.text.secondary, borderRadius: '16px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'},
  icon: {fontSize: '30px', color: theme.palette.primary.main},
  button2: {marginTop: '20px',textAlign: 'center'},
  header2: {fontWeight: 'bold', marginBottom: '0.5px'},
  subtitle3: {color: '#B9B9B9',marginTop: '-2px',marginBottom: '15px'},
  statText: {fontSize: '14px'},
  statValue: {fontSize: '15px', fontWeight: 'bold'},
  headerContainer: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2},
};


const HomeUsuarioComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error('Token inválido', e);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const fetchMascotas = async () => {
        try {
          const response = await UsuarioService.getMascotas(user.id);
          setMascotas(response.data);
        } catch (error) {
          console.error('Error al obtener las mascotas:', error);
        }
      };

      fetchMascotas();
    }
  }, [user]);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };


const confirmDelete = async () => {
  try {
      await UsuarioService.deleteMascota(selectedMascota.id);
      setMascotas(mascotas.filter(m => m.id !== selectedMascota.id));
  } catch (error) {
      console.error('Error al eliminar la mascota:', error);
  } finally {
      setOpenDialog(false);
  }
};

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const navigateToRegistrarMascota = () => {
    navigate('/registrar_mascota', { state: { user } });
  };

  const navigateToAgendarHora = () => {
    navigate('/agendar_hora', {state:{user}});
  }

  const navigateToFichaMascota = () => {
    navigate('/ficha_mascota', {state:{user}});
  }

  if (!user) {
    return <div>Cargando...</div>;
  }
  return (
    <div style={styles.container}>
      <NavbarUsuarioComponent />
      <div style={styles.content}>
        <div style={styles.header}>
          <div>
            <Typography style={styles.welcomeMessage}>Bienvenido, {user.nombre}</Typography>
            <Typography style={styles.subtitle2}>Hay 3 nuevas citas programadas para hoy</Typography>
          </div>
          <div style={styles.searchBar}>
            <SearchIcon color="action" />
            <TextField
              placeholder="Buscar hora veterinaria"
              variant="outlined"
              size="small"
              InputProps={{ disableUnderline: true }}
              style={styles.searchInput}
            />
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid container xs={8}>
            <Grid item xs={12}>
              <Card style={styles.consultaCard}>
                <Typography style={styles.title}>Consulta veterinaria fácil y rápida</Typography>
                <Typography style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
              </Card>
            </Grid>
            <Grid container spacing={2} style={styles.especialidadesContainer}>
              <Grid item xs={12}>
                <Typography style={styles.title2}>Encuentra un veterinario especialista</Typography>
                <Typography style={styles.subtitle2}>Elige una de las categorías según tus necesidades</Typography>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2.3}>
                  <Paper sx={styles.paper}>
                    <HealingIcon sx={styles.icon} />
                      <Typography variant="h6" sx={styles.statText}>Traumatología</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2.3}>
                  <Paper sx={styles.paper}>
                    <MonitorHeartIcon sx={styles.icon} />
                      <Typography variant="h6" sx={styles.statText}>Cirugía</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2.3}>
                  <Paper sx={styles.paper}>
                    <MedicalInformationIcon sx={styles.icon} />
                      <Typography variant="h6" sx={styles.statText}>Ecografía</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2.3}>
                  <Paper sx={styles.paper}>
                    <VaccinesIcon sx={styles.icon} />
                      <Typography variant="h6" sx={styles.statText}>General</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={2.3}>
                  <Paper sx={styles.paper}>
                    <GridViewIcon sx={styles.icon} />
                      <Typography variant="h6" sx={styles.statText}>Todo</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography style={styles.title2}>Próximas horas agendadas</Typography>
              <Typography style={styles.subtitle2}>Asegúrate que tu mascota esté saludable</Typography>
            </Grid>
            <Grid item xs={11}>
              <BloquesHoraListComponent></BloquesHoraListComponent>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid xs={12}>
              <Typography style={styles.title2}>Tus mascotas</Typography>
              <Typography style={styles.subtitle2}>Lista de mascotas registradas</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="contained" sx={{ width: '100%', backgroundColor: '#ff436f', borderRadius: '10px', '&:hover': { backgroundColor: '#FF80AB' } }} onClick={() => navigateToRegistrarMascota('/registrar_mascota')}>Añadir Mascota</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" sx={{ width: '100%',  backgroundColor: '#ff436f', borderRadius: '10px', '&:hover': { backgroundColor: '#FF80AB' } }} onClick={() => navigateToFichaMascota('/ficha_mascota')}>Lista de Mascotas</Button>
                </Grid>
              </Grid>
              <Grid item xs={12} mt={2}>
                <Card style={styles.mascotaCard}>
                  <CardContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      {mascotas.map((mascota, index) => (
                        <React.Fragment key={mascota.id}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt={mascota.nombre} src={mascota.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={mascota.nombre}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {mascota.especie}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <StarBorderIcon fontSize="small" sx={{ mr: 0.5, color: '#ff436f' }} />
                                    <Typography variant="body2">{mascota.estatura} cm</Typography>
                                    <ColorLens fontSize="small" sx={{ mx: 1, color: '#ff436f' }} />
                                    <Typography variant="body2">{mascota.color}</Typography>
                                    <FitnessCenter fontSize="small" sx={{ mx: 1, color: '#ff436f' }} />
                                    <Typography variant="body2">{mascota.peso} kg</Typography>
                                  </Box>
                                </React.Fragment>
                              }
                            />
                            
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && selectedIndex === index}
                              onClose={handleClose}
                            >
                            </Menu>
                          </ListItem>
                          {index < mascotas.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card> 
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                  <DialogTitle>Confirmar Eliminación</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro que deseas eliminar la mascota {selectedMascota?.nombre}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">No</Button>
                    <Button onClick={confirmDelete} color="primary">Sí</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Grid  mt={2}>
              <Card style={styles.telemedicinaCard}>
                <Typography style={styles.title2}>
                  <LocalHospitalRoundedIcon />
                  Telemedicina
                </Typography>
                <Typography style={styles.subtitle}>Aqui puedes agendar una cita con un veterinario</Typography>
                <Button variant="contained" sx={{ width: '100%', height: '50px', borderRadius: '30px', backgroundColor: '#ff436f', '&:hover': { backgroundColor: '#FF80AB' }}} onClick={() => navigateToAgendarHora('/agendar_hora')}>Consulta ahora</Button>
                <Typography style={styles.title2}>
                  <AccessAlarmsIcon />
                  Horarios
                </Typography>
                <Typography style={styles.subtitle}>hola</Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default HomeUsuarioComponent;
