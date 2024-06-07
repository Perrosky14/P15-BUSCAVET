import React from "react";
import NavbarUsuarioComponent from "./NavbarUsuarioComponent";
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Card, CardContent, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Box, IconButton, Menu, MenuItem, Button, Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { MoreVert, StarBorder as StarBorderIcon, ColorLens, FitnessCenter } from '@mui/icons-material';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';

const styles = {
  container: { display: 'flex', height: '100vh' },
  content: { flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  welcomeMessage: { fontSize: '24px', fontWeight: 'bold', padding: '8px 10px' },
  searchBar: { display: 'flex', alignItems: 'center', border: '2px solid #FF4081', borderRadius: '40px', padding: '8px 16px', maxWidth: '600px', width: '100%' },
  searchInput: { marginLeft: '8px', width: '100%', border: 'none', outline: 'none' },
  mascotaListContainer: { display: 'flex-left', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
  mascotaCard: { width: '409px', maxWidth: 600, margin: '10px', height: '350px', borderRadius: '15px' },
  doctorListContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
  doctorCard: { width: '750px', maxWidth: 750, borderRadius: '15px' },
  consultaCard: { backgroundColor: '#FF4081', color: 'white', padding: '20px', marginBottom: '20px', borderRadius: '10px', textAlign: 'center', width: '100%', maxWidth: '750px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
  subtitle: { fontSize: '14px' },
  title2: { fontSize: '18px', fontWeight: 'bold', padding: '4px 16px', textAlign: 'center' },
  subtitle2: { fontSize: '14px', color: '#C5C5C5', textAlign: 'center' },
  especialidadesContainer: { marginBottom: '20px', textAlign: 'center' },
  telemedicinaCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '10px', textAlign: 'center' },
};

const mascotaData = [
  {
    id: 1,
    nombre: 'Gaucho',
    especie: 'Gato',
    edad: '10 años',
    color: 'Color negro',
    peso: '5 kg',
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 2,
    nombre: 'Gaucho',
    especie: 'Gato',
    edad: '10 años',
    color: 'Color negro',
    peso: '5 kg',
    avatar: '/static/images/avatar/2.jpg',
  },
  {
    id: 3,
    nombre: 'Gaucho',
    especie: 'Gato',
    edad: '10 años',
    color: 'Color negro',
    peso: '5 kg',
    avatar: '/static/images/avatar/3.jpg',
  },
];

const doctorData = [
  {
    id: 1,
    nombre: 'Isabella Gabriella',
    especialidad: 'Veterinaria general',
    lugar: 'Domicilio',
    fecha: 'Hoy',
    hora: '12:30 PM',
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 2,
    nombre: 'Isabella Gabriella',
    especialidad: 'Veterinaria general',
    lugar: 'C. Vet',
    fecha: 'Hoy',
    hora: '12:30 PM',
    avatar: '/static/images/avatar/2.jpg',
  },
  {
    id: 3,
    nombre: 'Isabella Gabriella',
    especialidad: 'Veterinaria general',
    lugar: 'C. Vet',
    fecha: 'Hoy',
    hora: '12:30 PM',
    avatar: '/static/images/avatar/3.jpg',
  },
];

function HomeUsuarioComponent({ userName }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  return (
    <div style={styles.container}>
      <NavbarUsuarioComponent />
      <div style={styles.content}>
        <div style={styles.header}>
          <div>
            <Typography style={styles.welcomeMessage}>Buenos días</Typography>
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
          <Grid item xs={8}>
            <Card style={styles.consultaCard}>
              <Typography style={styles.title}>Consulta veterinaria fácil y rápida</Typography>
              <Typography style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
            </Card>
            <Grid container spacing={2} style={styles.especialidadesContainer}>
              <Grid item xs={10}>
                <Typography style={styles.title2}>Encuentra un veterinario especialista</Typography>
                <Typography style={styles.subtitle2}>Elige una de las categorías según tus necesidades</Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" startIcon={<GridViewIcon />} fullWidth sx={{ borderColor: '#FF4081', color: '#FF4081', '&:hover': { borderColor: '#FF4081', backgroundColor: 'rgba(255, 64, 129, 0.1)' } }}>Traumatología</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" fullWidth sx={{ borderColor: '#FF4081', color: '#FF4081', '&:hover': { borderColor: '#FF4081', backgroundColor: 'rgba(255, 64, 129, 0.1)' } }}>Cirugía</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" fullWidth sx={{ borderColor: '#FF4081', color: '#FF4081', '&:hover': { borderColor: '#FF4081', backgroundColor: 'rgba(255, 64, 129, 0.1)' } }}>Ecografía</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" fullWidth sx={{ borderColor: '#FF4081', color: '#FF4081', '&:hover': { borderColor: '#FF4081', backgroundColor: 'rgba(255, 64, 129, 0.1)' } }}>General</Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth sx={{ borderColor: '#FF4081', color: '#FF4081', '&:hover': { borderColor: '#FF4081', backgroundColor: 'rgba(255, 64, 129, 0.1)' } }}>All</Button>
              </Grid>
            </Grid>
            <Box style={styles.doctorListContainer}>
              <Typography style={styles.title2}>Próximas horas agendadas</Typography>
              <Typography style={styles.subtitle2}>Asegúrate que tu mascota esté saludable</Typography>
              <Grid item xs={10}>
                <Card style={styles.doctorCard}>
                  <CardContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      {doctorData.map((doctor, index) => (
                        <React.Fragment key={doctor.id}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt={doctor.nombre} src={doctor.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={doctor.nombre}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {doctor.especialidad}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <HomeIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }} />
                                    <Typography variant="body2">{doctor.lugar}</Typography>
                                    <CalendarMonthIcon fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                                    <Typography variant="body2">{doctor.fecha}</Typography>
                                    <AccessTimeIcon fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                                    <Typography variant="body2">{doctor.hora}</Typography>
                                  </Box>
                                </React.Fragment>
                              }
                            />
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(event) => handleClick(event, index)}
                              sx={{ color: '#FF4081' }}
                            >
                              <MoreVert />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && selectedIndex === index}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Ver</MenuItem>
                              <MenuItem onClick={handleClose}>Editar</MenuItem>
                              <MenuItem onClick={handleClose}>Eliminar</MenuItem>
                            </Menu>
                          </ListItem>
                          {index < doctorData.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box style={styles.mascotaListContainer}>
              <Typography style={styles.title2}>Tus mascotas</Typography>
              <Typography style={styles.subtitle2}>Lista de mascotas registradas</Typography>
              <Box sx={{ display: 'flex', gap: 1, marginBottom: '16px' }}>
                <Button variant="contained" sx={{ backgroundColor: '#FF4081', borderRadius: '10px', '&:hover': { backgroundColor: '#FF80AB' } }} onClick={() => navigate('/registrar_mascota')}>Añadir Mascota</Button>
                <Button variant="contained" sx={{ backgroundColor: '#FF4081', borderRadius: '10px', '&:hover': { backgroundColor: '#FF80AB' } }} onClick={() => navigate('/lista_mascota')}>Lista de Mascotas</Button>
              </Box>
              <Grid item xs={10}>
                <Card style={styles.mascotaCard}>
                  <CardContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      {mascotaData.map((mascota, index) => (
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
                                    <StarBorderIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }} />
                                    <Typography variant="body2">{mascota.edad}</Typography>
                                    <ColorLens fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                                    <Typography variant="body2">{mascota.color}</Typography>
                                    <FitnessCenter fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                                    <Typography variant="body2">{mascota.peso}</Typography>
                                  </Box>
                                </React.Fragment>
                              }
                            />
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(event) => handleClick(event, index)}
                              sx={{ color: '#FF4081' }}
                            >
                              <MoreVert />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && selectedIndex === index}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={() => navigate('/lista_mascota')}>Ver</MenuItem>
                              <MenuItem onClick={() => navigate('/registrar_mascota')}>Editar</MenuItem>
                              <MenuItem onClick={handleClose}>Eliminar</MenuItem>
                            </Menu>
                          </ListItem>
                          {index < mascotaData.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
            <Card style={styles.telemedicinaCard}>
              <Typography style={styles.title2}>
                <LocalHospitalRoundedIcon />
                Telemedicina
              </Typography>
              <Typography style={styles.subtitle}>hola</Typography>
              <Button variant="contained" sx={{ width: '100%', height: '50px', borderRadius: '30px', backgroundColor: '#FF4081', '&:hover': { backgroundColor: '#FF80AB' } }}>Consulta ahora</Button>
              <Typography style={styles.title2}>
                <AccessAlarmsIcon />
                Horarios
              </Typography>
              <Typography style={styles.subtitle}>hola</Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default HomeUsuarioComponent;
